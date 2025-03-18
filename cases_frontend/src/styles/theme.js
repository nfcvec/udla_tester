import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@mui/material/styles';
import {  grey } from '@mui/material/colors';
import { esES } from '@mui/x-data-grid/locales';

// Create a theme instance.
export const theme = createMuiTheme({
  palette: {
    secondary: {
      main: grey[800],
    },
    primary: {
      main: "#C73142ff",
    },
  },
}, esES);

export const lightTheme = createMuiTheme({
  palette: {
    mode: 'light',
    secondary: {
      main: grey[800],
    },
    primary: {
      main: "#C73142ff",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
  },
}, esES);

export const darkTheme = createMuiTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: grey[500],
    },
    primary: {
      main: "#C73142ff",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
}, esES);
