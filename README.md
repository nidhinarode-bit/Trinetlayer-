<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TrinetLayer</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="logo">
      <span class="logo-icon"><img src="icons/trinetlayer_logo.jpeg" alt="TrinetLayer" class="logo-img"></span>
      <div class="logo-text">
        <span class="logo-name">TrinetLayer</span>
        <span class="logo-tagline">Built by hunters, for hunters.</span>
        <span class="logo-version">v1.0.0</span>
      </div>
    </div>
    <div class="scope-badge" id="scopeBadge">
      <span class="scope-dot" id="scopeDot"></span>
      <span id="scopeLabel">—</span>
    </div>
  </header>

  <!-- Tab Navigation -->
  <nav class="tab-nav">
    <button class="tab-btn active" data-tab="payloads">
      <span class="tab-icon">⚡</span> Payloads
    </button>
    <button class="tab-btn" data-tab="notes">
      <span class="tab-icon">📋</span> Notes
    </button>
    <button class="tab-btn" data-tab="info">
      <span class="tab-icon">🔍</span> Page Info
    </button>
    <button class="tab-btn" data-tab="utils">
      <span class="tab-icon">🔧</span> Utils
    </button>
    <button class="tab-btn" data-tab="scope">
      <span class="tab-icon">🎯</span> Scope
    </button>
  </nav>

  <!-- ══════════════ TAB: PAYLOADS ══════════════ -->
  <section class="tab-content active" id="tab-payloads">
    <div class="payload-controls">
      <div class="search-row">
        <input
          type="text"
          class="search-input"
          id="payloadSearch"
          placeholder="Search payloads…"
          autocomplete="off"
          spellcheck="false"
        >
        <button class="btn-icon" id="addPayloadBtn" title="Add Custom Payload">+</button>
      </div>
      <div class="filter-row" id="categoryFilters">
        <button class="filter-chip active" data-cat="ALL">ALL</button>
        <button class="filter-chip" data-cat="XSS">XSS</button>
        <button class="filter-chip" data-cat="SQLi">SQLi</button>
        <button class="filter-chip" data-cat="SSRF">SSRF</button>
        <button class="filter-chip" data-cat="XXE">XXE</button>
        <button class="filter-chip" data-cat="IDOR">IDOR</button>
        <button class="filter-chip" data-cat="Custom">Custom</button>
      </div>
      <div class="tag-filter-row">
        <select class="select-input" id="tagFilter">
          <option value="">All Tags</option>
        </select>
        <span class="payload-count" id="payloadCount">0 payloads</span>
      </div>
    </div>

    <div class="payload-list" id="payloadList">
      <!-- Payload cards rendered by JS -->
    </div>

    <!-- Add Custom Payload Panel -->
    <div class="modal-overlay hidden" id="addPayloadModal">
      <div class="modal">
        <div class="modal-header">
          <span>Add Custom Payload</span>
          <button class="modal-close" id="closeAddModal">✕</button>
        </div>
        <div class="modal-body">
          <label>Name</label>
          <input type="text" class="form-input" id="newPayloadName" placeholder="My Payload">
          <label>Category</label>
          <select class="select-input" id="newPayloadCategory">
            <option>XSS</option>
            <option>SQLi</option>
            <option>SSRF</option>
            <option>XXE</option>
            <option>IDOR</option>
            <option>Custom</option>
          </select>
          <label>Tags (comma-separated)</label>
          <input type="text" class="form-input" id="newPayloadTags" placeholder="Reflected, Basic">
          <label>Description</label>
          <input type="text" class="form-input" id="newPayloadDesc" placeholder="What does it do?">
          <label>Payload</label>
          <textarea class="form-textarea" id="newPayloadValue" placeholder="Paste payload here…" rows="4"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" id="cancelAddModal">Cancel</button>
          <button class="btn-primary" id="savePayloadBtn">Save Payload</button>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════ TAB: NOTES ══════════════ -->
  <section class="tab-content" id="tab-notes">
    <div class="notes-header">
      <div class="domain-pill" id="currentDomain">
        <span class="domain-icon">🌐</span>
        <span id="domainText">Detecting…</span>
      </div>
      <button class="btn-icon-sm" id="exportNotesBtn" title="Export as Markdown">↓ .md</button>
    </div>
    <textarea
      class="notes-area"
      id="notesArea"
      placeholder="Reconnaissance notes for this domain…&#10;&#10;## Findings&#10;- "
      spellcheck="false"
    ></textarea>
    <div class="notes-footer">
      <span class="notes-meta" id="notesMeta">No saves yet</span>
      <button class="btn-primary" id="saveNotesBtn">Quick Save</button>
    </div>
    <div class="notes-history" id="notesHistory">
      <!-- History entries rendered by JS -->
    </div>
  </section>

  <!-- ══════════════ TAB: PAGE INFO ══════════════ -->
  <section class="tab-content" id="tab-info">
    <div class="info-toolbar">
      <button class="btn-primary full-width" id="scanPageBtn">⚡ Scan Current Page</button>
    </div>

    <div id="infoResults" class="hidden">
      <!-- DOM Counts -->
      <div class="info-section">
        <h3 class="section-title">DOM Elements</h3>
        <div class="stat-grid">
          <div class="stat-card">
            <span class="stat-value" id="statForms">—</span>
            <span class="stat-label">Forms</span>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="statInputs">—</span>
            <span class="stat-label">Inputs</span>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="statLinks">—</span>
            <span class="stat-label">Links</span>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="statScripts">—</span>
            <span class="stat-label">Scripts</span>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="statIframes">—</span>
            <span class="stat-label">iFrames</span>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="statComments">—</span>
            <span class="stat-label">Comments</span>
          </div>
        </div>
      </div>

      <!-- Security Headers -->
      <div class="info-section">
        <h3 class="section-title">Security Headers</h3>
        <div class="header-list" id="headerList">
          <!-- Rendered by JS -->
        </div>
      </div>

      <!-- Forms Detail -->
      <div class="info-section" id="formDetailsSection">
        <h3 class="section-title">Form Details</h3>
        <div id="formDetailsList"></div>
      </div>

      <!-- Potential IDOR Links -->
      <div class="info-section" id="idorSection">
        <h3 class="section-title">Potential IDOR Links</h3>
        <div id="idorList"></div>
      </div>

      <!-- HTML Comments -->
      <div class="info-section" id="commentsSection">
        <h3 class="section-title">HTML Comments</h3>
        <div id="commentsList"></div>
      </div>
    </div>

    <div class="empty-state" id="infoEmpty">
      <span class="empty-icon">🔍</span>
      <p>Click "Scan Current Page" to analyze the DOM and headers.</p>
    </div>
  </section>

  <!-- ══════════════ TAB: UTILS ══════════════ -->
  <section class="tab-content" id="tab-utils">
    <!-- Base64 -->
    <div class="util-card">
      <div class="util-header">
        <span class="util-title">Base64</span>
        <div class="util-actions">
          <button class="btn-mini" id="b64EncodeBtn">Encode</button>
          <button class="btn-mini" id="b64DecodeBtn">Decode</button>
          <button class="btn-icon-sm" id="b64CopyBtn" title="Copy output">⧉</button>
          <button class="btn-icon-sm" id="b64ClearBtn" title="Clear">✕</button>
        </div>
      </div>
      <textarea class="util-input" id="b64Input" placeholder="Input…" rows="2" spellcheck="false"></textarea>
      <div class="util-output" id="b64Output"></div>
    </div>

    <!-- URL Encode -->
    <div class="util-card">
      <div class="util-header">
        <span class="util-title">URL Encode</span>
        <div class="util-actions">
          <button class="btn-mini" id="urlEncBtn">Encode</button>
          <button class="btn-mini" id="urlDecBtn">Decode</button>
          <button class="btn-icon-sm" id="urlCopyBtn" title="Copy output">⧉</button>
          <button class="btn-icon-sm" id="urlClearBtn" title="Clear">✕</button>
        </div>
      </div>
      <textarea class="util-input" id="urlInput" placeholder="Input…" rows="2" spellcheck="false"></textarea>
      <div class="util-output" id="urlOutput"></div>
    </div>

    <!-- JWT Decoder -->
    <div class="util-card">
      <div class="util-header">
        <span class="util-title">JWT Decoder</span>
        <div class="util-actions">
          <button class="btn-mini" id="jwtDecodeBtn">Decode</button>
          <button class="btn-icon-sm" id="jwtClearBtn" title="Clear">✕</button>
        </div>
      </div>
      <textarea class="util-input" id="jwtInput" placeholder="Paste JWT token…" rows="2" spellcheck="false"></textarea>
      <div class="jwt-output" id="jwtOutput">
        <div class="jwt-part" id="jwtHeader">
          <span class="jwt-label jwt-label-header">Header</span>
          <pre class="jwt-pre" id="jwtHeaderPre"></pre>
        </div>
        <div class="jwt-part" id="jwtPayloadPart">
          <span class="jwt-label jwt-label-payload">Payload</span>
          <pre class="jwt-pre" id="jwtPayloadPre"></pre>
        </div>
        <div class="jwt-sig">
          <span class="jwt-label jwt-label-sig">Signature</span>
          <div class="jwt-sig-note" id="jwtSigNote"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════ TAB: SCOPE ══════════════ -->
  <section class="tab-content" id="tab-scope">
    <div class="scope-intro">
      <p>Enter in-scope domains, one per line. Wildcards like <code>*.example.com</code> are supported.</p>
    </div>
    <textarea
      class="scope-area"
      id="scopeInput"
      placeholder="example.com&#10;*.example.com&#10;staging.target.io&#10;api.target.io"
      spellcheck="false"
      rows="10"
    ></textarea>
    <div class="scope-footer">
      <span class="scope-meta" id="scopeMeta">0 domains loaded</span>
      <button class="btn-primary" id="saveScopeBtn">Save Scope</button>
    </div>
    <div class="scope-test">
      <h3 class="section-title">Test a URL</h3>
      <div class="scope-test-row">
        <input type="text" class="form-input" id="scopeTestInput" placeholder="https://example.com/path">
        <button class="btn-mini" id="scopeTestBtn">Test</button>
      </div>
      <div class="scope-test-result hidden" id="scopeTestResult"></div>
    </div>
  </section>

  <!-- Toast notification -->
  <div class="toast hidden" id="toast"></div>

  <script src="popup.js"></script>
</body>
</html>
