import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './css/fonts.css';

import SundialRootPage from './pages/SundialRootPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: 'Lato'
  }
});

export default function SundialApp() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <SundialRootPage />
    </ThemeProvider>
  );
}
