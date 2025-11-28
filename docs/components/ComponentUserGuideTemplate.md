# [ComponentName]

[One-sentence overview describing what the component does and when to use it. Keep concise and user-focused.]

## AI Reuse Guidance
- When to use: [Describe typical scenarios where this component should be preferred.]
- Trigger words: [comma, separated, keywords] to help auto-selection.
- Avoid using when: [Optional — clarify anti-patterns or edge cases.]

## Props
Provide a concise, authoritative props list. Avoid `any`; use strict types.

- `propName: Type` — [Short description of the prop’s purpose and behavior.]
- `optionalProp?: Type` — [Default behavior and impact when omitted.]
- `onChange?(value: T): void` — [Event signature and when it fires.]

> Tip: Document defaults, constraints, and interactions between props.

## Types
```ts
// Core types and interfaces for the component
export type [EnumOrUnion] = 'optionA' | 'optionB' | 'optionC';

export interface [ComponentName]Props {
  /* Required props */
  requiredProp: string;

  /* Optional props */
  optionalProp?: number;
  variant?: 'text' | 'outlined' | 'contained';

  /* Events */
  onChange?: (value: unknown) => void;
}
```

## Basic Usage
```tsx
import [ComponentName] from '@/components/[ComponentName]/[ComponentName]';
import type { [ComponentName]Props } from '@/components/[ComponentName]/types';

export function Example() {
  return (
    <[ComponentName]
      requiredProp="value"
      optionalProp={42}
      variant="contained"
      onChange={(v) => console.log(v)}
    />
  );
}
```

## Notes
- [Call out important edge cases, caveats, or cross-component interactions.]
- [If this component wraps or composes existing components, document expectations.]
