# React + Material UI + TypeScript Coding Standards

## 1. General Principles
- **Functional Components**: Use functional components with Hooks. Avoid class components.
- **TypeScript**: Enable strict mode. Avoid `any`. Define interfaces for all component props and state.
- **Modern React**: Use React 18+ features (Suspense, concurrent features) where appropriate.

## 2. File Structure & Naming
- **Component Co-location**: Group related files (component, styles, tests, types) in a folder.
  ```
  /src/components/MyComponent/
  ├── MyComponent.tsx
  ├── MyComponent.test.tsx
  └── index.ts
  ```
 - **Placement Rules**:
   - If implementing a reusable UI piece, place it under `src/components/` and create/update its usage documentation in `docs/components/MyComponent.md`.
   - If implementing a page-level view or route, place it under `src/pages/` (e.g., `src/pages/Home.tsx`). Page-level work requires visual verification (see workflow).
 - **Reuse First**:
   - Before building a new component or page, search `docs/components/` for an existing component that matches the need.
   - Favor composition of existing components over creating new ones. Extend via props rather than duplicating logic.
- **Naming**:
  - Components: PascalCase (e.g., `UserProfile.tsx`).
  - Hooks: camelCase with `use` prefix (e.g., `useAuth.ts`).
  - Utilities/Functions: camelCase (e.g., `formatDate.ts`).

## 3. TypeScript Guidelines
- **Props Interfaces**: Define props with `interface` named `[ComponentName]Props`.
  ```typescript
  interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'text' | 'contained' | 'outlined';
  }
  ```
- **Event Handling**: Use React's specific event types.
  ```typescript
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => { ... };
  ```
- **Exports**: Use named exports over default exports for better refactoring support.

## 4. Material UI (MUI) Best Practices
- **Styling**: Prefer the `sx` prop for one-off styles and `styled()` utility for reusable components. Avoid `makeStyles` (deprecated in v5).
  ```tsx
  // Good
  <Box sx={{ display: 'flex', gap: 2, p: 2 }}>...</Box>
  
  // Good (Reusable)
  const StyledButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(2),
  }));
  ```
- **Theming**: Use `ThemeProvider` and customize `createTheme` for global styles, colors, and typography. Avoid hardcoded hex values; use `theme.palette`.
- **Imports**: Import components directly to minimize bundle size (though Vite handles tree-shaking well).
  ```typescript
  import Box from '@mui/material/Box'; // vs import { Box } from '@mui/material';
  ```

## 5. State Management
- **Local State**: Use `useState` for simple component state.
- **Complex State**: Use `useReducer` or Context API for complex local state.
- **Global State**: Use a library like Zustand or Redux Toolkit if strictly necessary.

## 6. Testing
- **Unit/Integration**: Use Vitest + React Testing Library.
- **E2E**: Use Playwright.
- **Selectors**: Use `data-testid` for stable test selectors if semantic HTML is insufficient.
 - **Docs Upkeep**: When modifying a component, update its corresponding markdown in `docs/components/` to reflect props, examples, and usage.

## 7. Performance
- **Memoization**: Use `useMemo` and `useCallback` only when necessary (e.g., passing props to memoized children or expensive calculations).
- **Code Splitting**: Use `React.lazy` and `Suspense` for route-based splitting.
