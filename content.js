// TrinetLayer - background.js (Service Worker - Manifest V3)
// Scope checking and per-tab icon management.

"use strict";

const ICON_GREEN = {
  16: "icons/icon-green16.png",
  32: "icons/icon-green32.png",
  48: "icons/icon-green48.png",
  128: "icons/icon-green128.png"
};

const ICON_GRAY = {
  16: "icons/icon-gray16.png",
  32: "icons/icon-gray32.png",
  48: "icons/icon-gray48.png",
  128: "icons/icon-gray128.png"
};

const ICON_DEFAULT = {
  16: "icons/icon16.png",
  32: "icons/icon32.png",
  48: "icons/icon48.png",
  128: "icons/icon128.png"
};

// Scope cache — invalidated by storage.onChanged
let scopeCache = null;

async function getScope() {
  if (scopeCache !== null) return scopeCache;
  const result = await chrome.storage.local.get("scopeDomains");
  scopeCache = result.scopeDomains || [];
  return scopeCache;
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.scopeDomains) {
    scopeCache = changes.scopeDomains.newValue || [];
  }
});

/**
 * Seed default storage on install.
 */
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason === "install") {
    const existing = await chrome.storage.local.get(["scopeDomains", "customPayloads"]);
    const seed = {};
    if (!Array.isArray(existing.scopeDomains))   seed.scopeDomains   = [];
    if (!Array.isArray(existing.customPayloads)) seed.customPayloads = [];
    if (Object.keys(seed).length > 0) {
      await chrome.storage.local.set(seed);
    }
  }
});

/**
 * Match a hostname against a scope entry (supports *.example.com)
 * Non-wildcard entries match the exact hostname AND its "www." variant
 * (e.g., saving "zomato.com" also matches "www.zomato.com" — standard behavior).
 * Wildcard entries (*.example.com) match subdomains AND the base domain.
 */
function matchesScope(hostname, scopeEntry) {
  const entry = scopeEntry.trim().toLowerCase();
  const host  = hostname.toLowerCase();
  if (!entry) return false;
  if (entry.startsWith("*.")) {
    const base = entry.slice(2);
    return host === base || host.endsWith("." + base);
  }
  // Exact match, or www. variant of the entry, or the entry is the www. variant of host
  if (host === entry) return true;
  if (host === "www." + entry) return true;
  if (entry === "www." + host) return true;
  return false;
}

/**
 * Resolve scope status for a URL against stored scope list.
 * Returns: true (in), false (out), null (no scope defined)
 */
async function isInScope(url) {
  if (!url || typeof url !== "string" || !url.startsWith("http")) return null;
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch {
    return null;
  }

  const scopeDomains = await getScope();
  if (scopeDomains.length === 0) return null;
  return scopeDomains.some(entry => matchesScope(hostname, entry));
}

/**
 * Set the extension icon for a tab based on scope status.
 */
async function updateIcon(tabId, url) {
  const inScope = await isInScope(url);
  const iconSet = inScope === true ? ICON_GREEN : inScope === false ? ICON_GRAY : ICON_DEFAULT;
  try {
    await chrome.action.setIcon({ tabId, path: iconSet });
  } catch {
    // Tab closed or inaccessible — ignore
  }
}

// ── Tab lifecycle listeners ───────────────────────────────────
// The "tabs" permission is required to read tab.url inside onUpdated/onActivated
// event callbacks; activeTab alone does NOT expose tab.url in background listeners.

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  const url = tab && tab.url;
  if (!url || !/^https?:/i.test(url)) return;
  const scope = await getScope();
  if (scope.length === 0) return;
  await updateIcon(tabId, url);
});

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const scope = await getScope();
  if (scope.length === 0) return;
  let tab;
  try {
    tab = await chrome.tabs.get(tabId);
  } catch {
    return;
  }
  const url = tab && tab.url;
  if (!url || !/^https?:/i.test(url)) return;
  await updateIcon(tabId, url);
});

// ── Message handler ───────────────────────────────────────────

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Defense-in-depth: reject anything not originating from our own extension.
  if (!sender || sender.id !== chrome.runtime.id) {
    return false;
  }
  if (!message || typeof message !== "object" || typeof message.type !== "string") {
    return false;
  }

  if (message.type === "GET_SCOPE_STATUS") {
    if (typeof message.url !== "string" || message.url.length > 2048) {
      sendResponse({ inScope: null });
      return false;
    }
    isInScope(message.url).then(result => sendResponse({ inScope: result }));
    return true;
  }

  if (message.type === "SCOPE_UPDATED") {
    // Only accept from the popup (no sender.tab).
    if (sender.tab) {
      sendResponse({ ok: false });
      return false;
    }
    // Invalidate cache and re-evaluate icons for all open tabs.
    scopeCache = null;
    chrome.tabs.query({}, (tabs) => {
      getScope().then(scope => {
        if (scope.length === 0) {
          // No scope defined — reset icons on all http/https tabs to default.
          tabs.forEach(t => {
            if (t.id && t.url && /^https?:/i.test(t.url)) {
              chrome.action.setIcon({ tabId: t.id, path: ICON_DEFAULT }).catch(() => {});
            }
          });
          return;
        }
        Promise.all(
          tabs
            .filter(t => t.id && t.url && /^https?:/i.test(t.url))
            .map(t => updateIcon(t.id, t.url))
        ).catch(() => {});
      });
    });
    sendResponse({ ok: true });
    return false;
  }

  return false;
});
