---
name: DeployLocallySubAgent
description: "Step 3 sub-agent to start local HTTP server, open the page, and validate UI via Playwright MCP."
---
# Deploy Locally Sub-Agent

## Mission
Serve the generated static files locally on port 8000 and validate the UI against the spec via Playwright MCP tools.

## Inputs
- Timestamped filenames from GenerateCodeSubAgent

## Outputs
- Running server on `http://localhost:8000`
- Validation report with layout/interaction/accessibility checks

## Commands (Windows PowerShell)
```powershell
cd "c:\Users\ADMIN\Desktop\Desktop\hackathon\AIassistant"; python -m http.server 8000
```

## Validation Flow (Playwright MCP)
1. Navigate: `await page.goto('http://localhost:8000/index_[timestamp].html')`
2. Snapshot DOM: `mcp_microsoft_pla_browser_snapshot`
3. Evaluate layout: check centering and dimensions via `evaluate`
4. Interactions: fill inputs, toggle checkbox, submit form
5. Accessibility: verify labels, focus states, `aria-live` updates
6. Console/Network: ensure no errors or missing assets

## Troubleshooting
- 404 for assets: ensure correct timestamped filenames in HTML
- Port conflicts: choose another port if 8000 is occupied
- Python not found: install Python 3 and re-run command

## Success Criteria
- Page loads without errors
- Container centered, gradient visible
- Form fields present and focusable
- Validation triggers and mocked success flow executes
