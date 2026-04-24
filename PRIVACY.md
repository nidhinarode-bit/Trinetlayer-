# Privacy Policy for TrinetLayer

**Last updated:** April 24, 2026

This Privacy Policy describes how the TrinetLayer Chrome extension ("the Extension," "we," "our") handles user information. By installing and using the Extension, you agree to the practices described in this policy.

## Summary

**TrinetLayer does not collect, store, transmit, sell, or share any personal data.** All information you create or save while using the Extension stays on your local device, inside your own browser. We do not operate any server that receives your data, and the Extension does not use analytics, telemetry, advertising, or third-party tracking of any kind.

## Information the Extension handles

The Extension processes the following information **locally on your device only**:

### 1. Your bug bounty scope list
You may enter a list of in-scope domains (for example, `example.com` or `*.example.com`) so the Extension can indicate when the active browser tab matches your saved scope. This list is stored locally using the browser's `chrome.storage.local` API.

### 2. Custom payloads you add
If you choose to add your own payload entries to the payload library, those entries are stored locally using `chrome.storage.local`. The Extension's built-in payload library is shipped as static reference data inside the Extension package.

### 3. Per-domain notes
Notes you write in the Notes tab are stored locally and scoped to the domain of the page you were viewing when you wrote them. Notes and their timestamped history are stored using `chrome.storage.local`.

### 4. The URL of your active tab
When you have a browser tab open, the Extension reads the tab's URL to compare it against your saved scope list and update the toolbar icon accordingly (green for in-scope, gray for out-of-scope). This URL is processed in memory, used only for scope matching, and is never stored, logged, or transmitted.

### 5. DOM information from pages you scan
When you explicitly click "Scan Current Page," the Extension injects a content script that reads DOM elements (forms, inputs, links, scripts, iframes, comments) and the page's response headers. This information is displayed only inside the Extension's popup for your immediate use. It is not stored, logged, or transmitted anywhere.

## What the Extension does NOT do

- We do not collect your browsing history.
- We do not track which sites you visit.
- We do not transmit any data to our servers (we do not operate any servers).
- We do not transmit any data to any third party.
- We do not sell, rent, or share user data with anyone.
- We do not use analytics, telemetry, crash reporting, or advertising SDKs.
- We do not use cookies.
- We do not request, access, or store account credentials, passwords, or personal identifiers.

## Network activity

The only network request the Extension makes is a single `HEAD` request to the URL of your currently active tab when you click "Scan Current Page." This request is used to read response headers (such as `Content-Security-Policy`, `Strict-Transport-Security`, and `X-Frame-Options`) so they can be displayed to you for security analysis. The request is sent to the same origin you are already visiting in your browser tab — no data is sent to any third party or to any server operated by us.

## Permissions explained

| Permission | Why it is requested |
|---|---|
| `tabs` | To read the URL of the active tab for scope matching and icon updates. |
| `activeTab` | To inject the page-info content script when you explicitly click "Scan Current Page." |
| `storage` | To save your scope list, custom payloads, and notes locally on your device. |
| `scripting` | To inject the on-demand content script when you trigger a scan. |

The Extension does not request host permissions. It does not run any code on any page until you explicitly trigger a scan.

## Data retention and deletion

All data you save (scope list, custom payloads, notes, notes history) remains on your device until:

- You manually clear it within the Extension (where applicable),
- You uninstall the Extension (which removes all `chrome.storage.local` data automatically), or
- You clear your browser's storage for extensions.

Because no data is ever transmitted off your device, there is no remote copy of your data to delete.

## Children's privacy

The Extension is intended for use by adult security researchers and professionals conducting authorized testing. It is not directed at children under 13, and we do not knowingly collect data from anyone of any age (since we do not collect data at all).

## Intended use

TrinetLayer is intended for use exclusively in **authorized security testing** contexts, such as bug bounty programs you are enrolled in, penetration tests you are contracted to perform, or research on systems you own or have explicit written permission to test. Using the Extension or its payload library against systems without authorization may violate computer-misuse laws in your jurisdiction, and is the sole responsibility of the user.

## Changes to this policy

If we make material changes to this Privacy Policy, we will update the "Last updated" date at the top of this document and update the version published in the Extension's source repository. Significant changes will also be reflected in the Extension's listing on the Chrome Web Store.

## Contact

For questions, concerns, or to report a privacy issue, please open an issue on the Extension's GitHub repository:

https://github.com/nidhinarode-bit/trinetlayer/issues

---

*Built by hunters, for hunters.*
