import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import './css/fonts.css';

import '@fortawesome/fontawesome-free/css/all.css';

import SundialRootPage from './pages/SundialRootPage';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#5e35b1'
    },
    secondary: {
      main: '#dce775'
    }
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
