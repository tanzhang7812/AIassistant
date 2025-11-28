import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Home from './pages/Home'
import FormDemo from './pages/FormDemo'
import DataGridDemo from './pages/ComponentDemos/DataGridDemo'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button component={Link} to="/">Home</Button>
          <Button component={Link} to="/form-demo">Form Demo</Button>
          <Button component={Link} to="/login">Login</Button>
          <Button component={Link} to="/component-demos/datagrid">DataGrid Demo</Button>
          <Button component={Link} to="/users">User Management</Button>
        </Stack>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form-demo" element={<FormDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/component-demos/datagrid" element={<DataGridDemo />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}
