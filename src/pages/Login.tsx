import { useState } from 'react';
import { Box, Paper, Typography, Link as MuiLink } from '@mui/material';
import DynamicForm from '../components/DynamicForm/DynamicForm';

interface LoginValues {
  [key: string]: unknown;
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const fields = [
    {
      name: 'email',
      label: 'Email',
      type: 'text' as const,
      validation: {
        required: 'Email is required',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      textFieldProps: { autoComplete: 'email', placeholder: 'you@example.com' },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password' as const,
      validation: {
        required: 'Password is required',
        minLength: 6,
      },
      textFieldProps: { autoComplete: 'current-password', placeholder: '••••••••' },
    },
    {
      name: 'remember',
      label: 'Remember me',
      type: 'checkbox' as const,
      defaultValue: true,
    },
  ];

  async function handleSubmit(values: LoginValues) {
    setError(undefined);
    setSubmitting(true);
    try {
      // Mock async login
      await new Promise((res) => setTimeout(res, 800));
      // Simple fake check
      if (values.email === 'user@example.com' && values.password === 'password') {
        alert('Login successful');
      } else {
        setError('Invalid email or password');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <Paper elevation={3} sx={{ p: 3, width: '100%', maxWidth: 420 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>Welcome back</Typography>
        <DynamicForm<LoginValues>
          fields={fields}
          onSubmit={handleSubmit}
          submitLabel="Sign in"
          submitting={submitting}
          errorMessage={error}
          layout="stack"
        />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <MuiLink href="#" underline="hover">Forgot password?</MuiLink>
          <MuiLink href="#" underline="hover">Create an account</MuiLink>
        </Box>
      </Paper>
    </Box>
  );
}
