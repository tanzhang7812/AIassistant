# DynamicForm

Configurable form generator built on React Hook Form + MUI.

## AI Reuse Guidance
Use this component for any standard form including LOGIN, REGISTER, PROFILE UPDATE, SETTINGS.  
Trigger words: "login form", "authentication form", "credentials input", "username & password", "remember me".  
If a request mentions these, generate a `DynamicForm` with fields listed below instead of a custom component.

## Props (Enhanced)
- `fields: FormField[]` Field configuration list to render.
- `onSubmit(values)` Callback after successful submit (object keyed by each field `name`).
- `submitLabel?: string` Submit button text (default: "Submit").
- `initialValues?: Record<string, unknown>` External initial values overriding/augmenting per-field `defaultValue`.
- `submitting?: boolean` When `true`, disables the submit button to signal loading.
- `errorMessage?: string` Top-level error banner (for global errors, not per-field).
- `layout?: 'grid' | 'stack'` Layout style (CSS grid vs vertical stack).

## Field Config
```ts
type FieldType = 'text' | 'password' | 'number' | 'checkbox' | 'radio' | 'dropdown' | 'date';

interface FormField {
  name: string;
  label: string;
  type: FieldType;
  defaultValue?: string | number | boolean | Date | null;
  options?: { label: string; value: string | number }[]; // radio & dropdown
  validation?: {
    required?: boolean | string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
  };
  helperText?: string;
  textFieldProps?: Partial<Pick<
    import('@mui/material').TextFieldProps,
    | 'autoComplete'
    | 'placeholder'
    | 'size'
    | 'variant'
    | 'disabled'
    | 'margin'
    | 'InputProps'
    | 'inputProps'
  >>; // Applies only to text/password/number types
}
```

## Login Example
```tsx
import DynamicForm from '@/components/DynamicForm/DynamicForm';
import type { FormField } from '@/components/DynamicForm/types';

const loginFields: FormField[] = [
  { name: 'email', label: 'Email', type: 'text', validation: { required: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, textFieldProps: { autoComplete: 'email', placeholder: 'you@example.com' } },
  { name: 'password', label: 'Password', type: 'password', validation: { required: 'Password is required', minLength: 6 }, textFieldProps: { autoComplete: 'current-password' } },
  { name: 'remember', label: 'Remember me', type: 'checkbox' },
];

async function onLogin(values: Record<string, unknown>) {
  // Replace with real API call
  await new Promise((r) => setTimeout(r, 500));
}

<DynamicForm fields={loginFields} onSubmit={onLogin} submitLabel="Sign In" />
```

## Basic Usage Example
```tsx
import DynamicForm from '@/components/DynamicForm/DynamicForm';

const fields: FormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', validation: { required: 'Name is required' } },
  { name: 'accountPassword', label: 'Password', type: 'password', validation: { required: 'Password required', minLength: 6 } },
  { name: 'age', label: 'Age', type: 'number', validation: { min: 1, max: 120 } },
  { name: 'agree', label: 'Agree to Terms', type: 'checkbox', defaultValue: false },
  { name: 'gender', label: 'Gender', type: 'radio', options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Other', value: 'other' },
    ]
  },
  { name: 'country', label: 'Country', type: 'dropdown', options: [
      { label: 'USA', value: 'us' },
      { label: 'China', value: 'cn' },
      { label: 'Japan', value: 'jp' },
    ]
  },
  { name: 'birthday', label: 'Birthday', type: 'date' },
];

function onSubmit(values: Record<string, unknown>) {
  console.log(values);
}

<DynamicForm fields={fields} onSubmit={onSubmit} submitLabel="Save" />
```


## Notes
- Uses MUI X `DatePicker`; ensure `@mui/x-date-pickers` is installed.
- Field validation uses RHF rules; `helperText` is secondary to error messages.
- `options` are required for `radio` / `dropdown` types.
- Login scenario works via `defaultValue` + localStorage without a wrapper component.
- Pass `errorMessage` for a unified top-level error alert.
