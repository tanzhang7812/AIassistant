import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
export default function Home() {
  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={2} alignItems="flex-start">
        <Typography variant="h4">Vibe Coding</Typography>
        <Typography variant="body1">This page uses a reusable component:</Typography>
      </Stack>
    </Box>
  )
}
