---
description: 'Describe what this custom agent does and when to use it.'
---
# UI assistant Instructions

## Project Scope
This repository is strictly focused on UI creation. Do NOT implement backend services, server-side logic, or real API integrations in this project. When a UI requires dynamic data or external APIs, provide mocked or stubbed responses in the frontend for demonstration only. Never add production API clients, credentials, or server code here.

## Project Overview
This is an **automated UI development framework** that enables rapid creation of web components from user specifications. The system supports:
- Text-based UI descriptions or visual screenshots as input
- Automated code generation for HTML, CSS, and JavaScript
- Local deployment via Python HTTP server on port 8000 (static preview only)
- Automated validation using Playwright MCP tools (UI-level checks)
- Intelligent bug detection and auto-fixing focused on HTML/CSS/JS
- Requirements verification and iterative refinement

Current implementation: Vanilla HTML, CSS, and JavaScript (no frameworks) for maximum simplicity and portability.

## Automated UI Development Workflow

### Complete Workflow (Requirements for AI Agents)

When a user provides a UI description or screenshot, follow this exact sequence:

1. **Parse Requirements**
   - Extract visual requirements (layout, colors, spacing, interactions)
   - Identify functional requirements that are relevant to the UI (form validation, state management, mocked data flows)
   - If the user mentions API integration or backend behavior, note it as a requirement to *mock* in the frontend — do NOT implement backend code
   - Note accessibility and responsive design needs

2. **Generate Code** (Vanilla HTML/CSS/JS pattern)
   - Create `index_[timestamp].html` with semantic markup, proper `id` and `class` naming
   - Create `styles_[timestamp].css` with CSS reset, flexbox/grid layouts, color scheme, hover/focus states
   - Create `script_[timestamp].js` with event listeners, validation, and localStorage management
   - Use consistent naming: kebab-case for classes, camelCase for JavaScript variables
   - Timestamp format: ISO 8601 (YYYY-MM-DD-HHmmss) for filename compatibility

3. **Deploy Locally**
   - Run `cd e:\workspace\test_github_copilot && python -m http.server 8000` in background terminal to serve static files
   - Verify server is running on `http://localhost:8000/index_[timestamp].html` (static preview)
   - Reference the timestamped file in browser navigation

4. **Validate with Playwright** (Critical Step)
   - Open page: `mcp_microsoft_pla_browser_run_code` with `await page.goto('http://localhost:8000/index_[timestamp].html')`
   - Take snapshot: `mcp_microsoft_pla_browser_snapshot` to inspect DOM structure
   - Check layout: Use `mcp_microsoft_pla_browser_evaluate` to verify element dimensions, positioning, centering
   - Test interactions: Click buttons, fill inputs, verify client-side validation and mocked flows
   - Compare against requirements: Ensure UI meets the user's specification; any external integrations should be mocked for demonstration

5. **Auto-Fix Bugs**
   - If layout issues detected: Update CSS (flexbox alignment, spacing, responsive breakpoints)
   - If functional issues detected: Update JavaScript (event listeners, validation logic)
   - If accessibility issues detected: Add ARIA labels, semantic HTML tags, keyboard navigation
   - Re-validate after each fix using Playwright snapshot and evaluation

6. **Iterative Refinement**
   - Continue validating until all requirements met
   - Document any assumptions made about unclear requirements
   - Report final status to user with validation results

### Architecture

### File Structure
- `index_[timestamp].html` - Main HTML markup with form structure and semantic elements
- `styles_[timestamp].css` - Centralized styling with gradient backgrounds, responsive design, and interactive states
- `script_[timestamp].js` - Form handling, validation logic, and localStorage management
- Each user request generates a new set of timestamped files for version tracking and history

### Key Components

#### Form Handling (`script.js`)
- **Form submission**: Uses `addEventListener` with event delegation pattern on the form itself
- **Validation rules**:
   - Email: Must match pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$` 
   - Password: Minimum 6 characters required
- **User preferences**: "Remember me" checkbox persists email via `localStorage.setItem('rememberedEmail', email)` (demo only)
- **Page load**: `DOMContentLoaded` event restores remembered email and checkbox state
- **Backend interactions**: Any mention of API calls should be implemented as mocked responses or clearly separated demo utilities; do NOT add real backend code or network clients here

#### Styling Conventions (`styles.css`)
- **Color scheme**: Purple gradient `#667eea` to `#764ba2` used for backgrounds and highlights
- **Responsive layout**: `.container` uses `max-width: 400px` with flexbox centering on full viewport
- **Interaction feedback**: 
  - Focus states: Border color changes to primary color with box-shadow
  - Hover states: Buttons use `transform: translateY(-2px)` for lift effect
  - All transitions are 0.2-0.3s for smooth UX

#### HTML Structure (`index_[timestamp].html`)

## Development Patterns

### JavaScript Patterns
1. **Event handling**: Direct element selection via `document.getElementById()` for form controls
2. **Data persistence**: Use `localStorage` only for non-sensitive UI demo preferences
3. **Input validation**: Perform client-side validation before any action; use regex for email
4. **Alerts for feedback**: Currently uses `alert()` - consider replacing with toast notifications for production; do NOT replace alerts with real API calls in this repo

### CSS Patterns
1. **CSS Reset**: Global `* { margin: 0; padding: 0; box-sizing: border-box; }`
2. **Flexbox for layout**: Container centering uses `display: flex; justify-content: center; align-items: center;`
3. **Focus management**: All interactive elements have visible focus states (border-color + box-shadow)
4. **Gradient theming**: Reuse primary gradient in multiple places (body, button) for consistency

### HTML Conventions
- Label-input pairs wrapped in `.form-group` divs
- All inputs have explicit `id` and `name` attributes
- Form action deferred to JavaScript (no server-side form posting currently)

## Testing Approach
- **Playwright validation**: Automated checks for layout (dimensions, centering, overflow), DOM structure, element visibility
- **Functional testing**: Form submissions, input validation, state persistence via localStorage
- **Responsive design**: Test on multiple viewport sizes using Playwright evaluate
- **Accessibility**: Verify semantic HTML, proper labels, keyboard navigation, ARIA attributes
- **Browser console**: Check for JavaScript errors via `mcp_microsoft_pla_browser_console_messages`
- **Network requests**: Verify no broken asset loading via `mcp_microsoft_pla_browser_network_requests`

### Automated Testing Commands

```javascript
// Check element dimensions and positioning
const rect = element.getBoundingClientRect();
return { width: rect.width, height: rect.height, isVisible: rect.width > 0 };

// Verify form validation
document.getElementById('formId').submit(); // Test validation triggers

// Check localStorage persistence
localStorage.getItem('key'); // Verify data saved correctly

// Validate CSS applied
window.getComputedStyle(element).backgroundColor; // Verify colors match design
```

## Common Tasks

### UI Component Creation Workflow

**Step 1: Parse User Input**
```
User provides: "Create a login form with email, password, remember me checkbox"
Extract: Layout type (centered modal), fields (email, password), features (remember me)
```

**Step 2: Generate Files**
- Always create `index_[timestamp].html`, `styles_[timestamp].css`, `script_[timestamp].js` (three-file structure with timestamps)
- Name form with `id="mainForm"` or descriptive name for JS targeting
- Use semantic HTML: `<form>`, `<label>`, `<input>`, `<button>`

**Step 3: Deploy & Validate**
```bash
# Terminal command (background)
cd e:\workspace\AIAssistant && python -m http.server 8000

# Playwright validation
await page.goto('http://localhost:8000/index_[timestamp].html');
const snapshot = await page.snapshot();
```

**Step 4: Compare & Fix**
- ✓ All required fields present?
- ✓ Colors match description?
- ✓ Layout centered/responsive?
- ✓ Form validation working?
- ✓ No console errors?

### Adding New Form Fields
1. Add `<input>` in `.form-group` wrapper in `index_[timestamp].html` with unique `id`
2. Add label with `for` attribute matching input `id`
3. Reference new field in `script_[timestamp].js` validation logic
4. Style via `.form-group input[type="..."]` selectors in `styles_[timestamp].css`

### Customizing Colors
- Primary color: `#667eea` (blue)
- Secondary color: `#764ba2` (purple)
- Text colors: `#333` (dark), `#555` (medium), `#666` (light)
- All used in both CSS gradient and focus states

### Replacing Alert Feedback
Current implementation uses `alert()`. For production:
- Replace with toast notification library (e.g., `notyf`, `toast-ui`)
- Create utility function to standardize feedback messaging
- Add error display near form fields instead of modal alerts

## Integration Points
- This project intentionally contains NO backend implementation. Any backend behavior in the UI must be stubbed or mocked for demonstration purposes.
- Do NOT add real API calls, server code, or secret management here. If the UI needs to show responses, implement a mock response generator in the frontend or provide a small JSON fixture.
- `localStorage` may be used for demo preferences only; never store sensitive data (passwords, API keys) in code or localStorage in production.

## Automated Workflow Command Reference

### Playwright MCP Commands for Validation

```javascript
// 1. Navigate to page
await page.goto('http://localhost:8000/index.html');

// 2. Take DOM snapshot for structure verification
const snapshot = await page.snapshot();

// 3. Check element positioning and visibility
const element = document.querySelector('.selector');
return {
  width: element.getBoundingClientRect().width,
  height: element.getBoundingClientRect().height,
  isVisible: element.getBoundingClientRect().width > 0
};

// 4. Test form interaction (use mocks/stubs for any external behavior)
await page.fill('#email', 'test@example.com');
await page.click('button[type="submit"]');

// 5. Check for validation errors
const errorMsg = document.querySelector('.error')?.textContent;
return errorMsg || 'No error';

// 6. Verify computed styles
return window.getComputedStyle(element).backgroundColor;

// 7. Check console errors
const messages = await page.evaluate(() => window.__errors__);
```

### Bug Detection Checklist

**Layout Issues:**
- [ ] Elements not centered when required
- [ ] Overflow or horizontal scroll present
- [ ] Text truncated or overlapping
- [ ] Responsive breakpoints not working
- [ ] Shadows/borders not visible

**Functional Issues:**
- [ ] Form doesn't submit
- [ ] Validation not triggering
- [ ] Event listeners not attached
- [ ] localStorage not persisting
- [ ] Links not clickable

**Accessibility Issues:**
- [ ] Missing labels for inputs
- [ ] No focus states visible
- [ ] Poor color contrast
- [ ] Missing ARIA attributes
- [ ] Not keyboard navigable

### Fix Strategy

**For each detected issue:**
1. Identify root cause (HTML structure, CSS, or JS)
2. Make minimal, targeted fix
3. Re-validate with Playwright
4. Document fix in comments
5. Report to user

Example: "Fixed button not clickable → Added `cursor: pointer` to `.btn-submit` in CSS and verified via Playwright click test"

## No External Dependencies
Project is intentionally dependency-free for simplicity. If scaling, consider:
- **Form validation**: Use a library like `validator.js` for comprehensive rules
- **Styling**: CSS stays vanilla; Tailwind not needed for single-page form
- **State management**: localStorage sufficient for now; upgrade to IndexedDB if more data needed
