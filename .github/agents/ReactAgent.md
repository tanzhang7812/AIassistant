# Vibe Coding - Copilot / AI Agent Instructions

## Project Overview
- **Domain**: Frontend Development
- **Stack**: React + Material UI + TypeScript + Vite
- **Goal**: Assist in high-quality frontend development with automated verification.

## 🤖 Workflow for AI Agents
Follow this strict process for every coding task:

1.  **Analyze & Decompose**
    - Read the user request and relevant files.
    - Break down the feature into smaller, implementable steps.
    - Identify necessary components and data flows.
    - Prefer reusing existing components reusdocumented in `docs/components/` before creating new ones.
        - Classification: Determine if the request is (a) Page development, (b) New reusable component, or (c) Minor tweak.
            - Page: A route-level screen under `src/pages/` or significant visual/layout work.
            - Component: Reusable UI element under `src/components/` not tied to a single route.
            - Minor Change: Small prop adjustment, text change, style fine-tune, or bug fix without new UI structure.
    - **Pre-check Reminder**: Before creating a new page, first review `docs/components` to see if existing components can be reused to avoid duplicate implementations and extra maintenance overhead。

2.  **Check Standards**
    - **CRITICAL**: Read `docs/standards/react-coding-standards.md` before writing code.
    - Ensure strict TypeScript usage, functional components, and MUI `sx` prop styling.
    - Follow placement rules: components in `src/components/`; pages in `src/pages/`; component docs in `docs/components/*.md`.
    - **CRITICAL**: Read `docs/components/ComponentUserGuideTemplate.md` to generate component documentation.
    - Documentation Language: All generated/updated component or page markdown in `docs/components/*.md` MUST be written in English (US). If source content is in another language, translate to English while preserving technical accuracy. Do not introduce bilingual mixed text; optionally create a separate localized file only if explicitly requested by the user.

3.  **Implement & Verify (Runtime)**
    - Generate the code.
        - Check if port 5173 is already active before starting the dev server:
            - PowerShell quick check: `Test-NetConnection -ComputerName localhost -Port 5173 | Select-Object -ExpandProperty TcpTestSucceeded`
            - Fallback: `netstat -ano | findstr :5173` (if a line shows LISTENING on 5173, it's running)
            - If active, skip starting the server and proceed to validation.
            - If inactive, start it with: `npm run dev` (or `npm start`) and wait for successful build.

    **Validate with Playwright** (Critical Step)
    - Open page: `mcp_microsoft_pla_browser_run_code` with `await page.goto('http://localhost:5173/<your-path>')`
    - Take snapshot: `mcp_microsoft_pla_browser_snapshot` to inspect DOM structure
    - Check layout: Use `mcp_microsoft_pla_browser_evaluate` to verify element dimensions, positioning, centering
    - Test interactions: Click buttons, fill inputs, verify client-side validation and mocked flows
    - Compare against requirements: Ensure UI meets the user's specification; any external integrations should be mocked for demonstration

### Runtime Validation Decision Rules
Apply the following before launching validation tooling:
- Page Development: ALWAYS perform runtime page validation (navigation, layout checks, interaction flow).
- New Component Development: ASK the user if a demo page should be scaffolded for visual verification.
    - If user agrees: create a temporary or permanent demo under `src/pages/` or `src/pages/ComponentDemos/` and validate it like a page.
    - If user declines: skip runtime validation unless component is complex (forms, drag/drop, heavy interactions). For complexity, briefly justify and proceed.
- Minor Change (component or page): SKIP runtime validation. Only perform type-check or targeted unit tests if available.

Heuristic examples:
- Minor change includes: adjusting padding, renaming a label, fixing a null check, swapping icon component, adding a simple prop with no behavioral branch.
- Not minor: introducing new state machine, adding form validation rules, adding asynchronous data fetching logic, or altering navigation flow.

When skipping validation: explicitly note the skip reason in the response ("Skipped runtime validation: classified as minor style change").

## 🛠️ Tech Stack Details
- **Build Tool**: Vite
- **UI Library**: Material UI (MUI) v5+
- **Language**: TypeScript (Strict Mode)

## Critical 
reuse current exisiting components from `docs/components/` before building new ones.## 📚 Documentation Locations
- `docs/components/`: Per-component usage guides.

## 📂 Key Files
- `docs/standards/react-coding-standards.md`: The source of truth for code style.
- `package.json`: Dependencies and scripts.
- `vite.config.ts`: Build configuration.
 - `src/components/`: Reusable UI components.
 - `src/pages/`: Page-level views/routes.
 - `docs/components/*.md`: Per-component usage documentation.

## ⚠️ Common Pitfalls to Avoid
- Do not use `any` type; define proper interfaces.
- Do not use `makeStyles`; use `sx` or `styled`.
- Ensure all imports are valid and dependencies are installed.
 - Forgetting to update `docs/components/*.md` when modifying component props or usage.
 - Writing documentation in non-English languages without explicit user request (English is mandatory by default).
