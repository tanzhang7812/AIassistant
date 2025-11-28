---
name: GenerateCodeSubAgent
description: "Step 2 sub-agent to generate vanilla HTML/CSS/JS files from a structured spec, following project conventions."
---
# Generate Code Sub-Agent

## Mission
Produce runnable, timestamped UI files (HTML, CSS, JS) matching the parsed spec. Ensure accessibility, responsive design, and mock-only interactions.

## Inputs
- Structured spec from ParseRequirementsSubAgent (includes timestamp)

## Outputs
- `index_[timestamp].html` – Semantic markup, ids/classes
- `styles_[timestamp].css` – Reset, layout, gradient theme, focus/hover
- `script_[timestamp].js` – Event listeners, validation, localStorage demo

## Conventions
- Timestamp: ISO 8601 `YYYY-MM-DD-HHmmss`
- Naming: kebab-case for classes, camelCase for JS
- Accessibility: labels, `aria-*`, `aria-live` for status
- Responsive: mobile breakpoint at ~520px
- No backend code; mock flows only (e.g., alert on success)

## Implementation Steps
1. Map spec components to HTML elements with ids and names
2. Build responsive centered container with max-width from spec
3. Apply gradient `#667eea → #764ba2` to body and buttons
4. Add focus states with border color and box-shadow
5. Implement validation per spec (email regex, password length)
6. Implement localStorage persistence for non-sensitive demo prefs
7. Include status region with `aria-live="polite"`
8. Cross-check spec completeness; if missing, document assumptions

## Auto-Fix Patterns
- If gradient not detected: ensure `background: linear-gradient(...)` on body
- If centering off: verify flex container and dimensions
- If focus invisible: add `box-shadow` and remove default outline
- If labels missing: ensure `<label for="id">` pairs exist

## Example Scaffolding
- Generates files like:
  - `index_2025-11-28-113000.html`
  - `styles_2025-11-28-113000.css`
  - `script_2025-11-28-113000.js`

## Post-Generation Validation (Playwright MCP)
- Navigate to generated page and snapshot DOM
- Evaluate container centering and input presence
- Trigger submit to validate client-side rules
- Confirm no console errors
