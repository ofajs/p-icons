import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import IconList from './icon-list';

export default function App() {
  return (
    <Container>
      <l-m src="https://cdn.jsdelivr.net/npm/p-icons/lib/abc-icon.html"></l-m>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Material UI Vite.js example
        </Typography>
        <ProTip />
        <abc-icon size="large" color="success"></abc-icon>
        <Copyright />
      </Box>
    </Container>
  );
}
