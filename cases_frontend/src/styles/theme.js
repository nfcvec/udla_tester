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
