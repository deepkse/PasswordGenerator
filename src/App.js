import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PasswordGenerator from './PasswordGenerator';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #0077be, #00008b)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <PasswordGenerator />
      </div>
    </ThemeProvider>
  );
}

export default App;