# Login Page

This page provides a simple, accessible login form using the reusable `DynamicForm` component with Material UI.

## Overview
- Path: `/login`
- Components used: `DynamicForm`
- Fields: `email`, `password`, `remember`
- Validation: required for email and password, email format check, min length 6 for password
- Behavior: mocks async login; shows an error message when credentials are invalid

## Usage
Navigate to `/login` via the top navigation bar or directly.

## Form Configuration
```ts
const fields = [
  {
    name: 'email',
    label: 'Email',
    type: 'text',
    validation: {
      required: 'Email is required',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    textFieldProps: { autoComplete: 'email', placeholder: 'you@example.com' },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validation: {
      required: 'Password is required',
      minLength: 6,
    },
    textFieldProps: { autoComplete: 'current-password', placeholder: '••••••••' },
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
    defaultValue: true,
  },
];
```

## Submit Handling
```ts
async function handleSubmit(values: LoginValues) {
  setError(undefined);
  setSubmitting(true);
  try {
    await new Promise((res) => setTimeout(res, 800));
    if (values.email === 'user@example.com' && values.password === 'password') {
      alert('Login successful');
    } else {
      setError('Invalid email or password');
    }
  } finally {
    setSubmitting(false);
  }
}
```

## Notes
- Replace the mock handler with a real API call as needed.
- Use `layout="stack"` in `DynamicForm` for vertical alignment.
- Links for "Forgot password" and "Create an account" are placeholders.
