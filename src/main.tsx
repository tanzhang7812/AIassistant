import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import App from './App'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },
    secondary: { main: '#14b8a6' },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
        notchedOutline: {
          borderColor: '#e5e7eb',
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        variant: 'outlined',
      },
      styleOverrides: {
        select: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          padding: 6,
          borderRadius: 6,
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '0.9rem',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.9rem',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
