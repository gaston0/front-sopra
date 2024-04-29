import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import { shadows } from "./Shadows";

const baselightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#cf022b',
      light: '#ECF2FF',
      dark: '#bc1434',
    },
    secondary: {
      main: '#bc1434',
      light: '#E8F7FF',
      dark: '#bc1434',
    },
    success: {
      main: '#dc7c94',
      light: '#E6FFFA',
      dark: '#bc1434',
      contrastText: '#ffffff',
    },
    info: {
      main: '#bc1434',
      light: '#EBF3FE',
      dark: '#bc1434',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc7c94',
      light: '#FDEDE8',
      dark: '#bc1434',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#cf022b',
      light: '#FEF5E5',
      dark: '#bc1434',
      contrastText: '#ffffff',
    },
    purple: {
      A50: '#cf022b',
      A100: '#6610f2',
      A200: '#bc1434',
    },
    grey: {
      100: '#F2F6FA',
      200: '#EAEFF4',
      300: '#DFE5EF',
      400: '#7C8FAC',
      500: '#5A6A85',
      600: '#2A3547',

    },
    text: {
      primary: '#0f0f0f',
      secondary: '#5A6A85',
    },
    action: {
      disabledBackground: '#bc1434',
      hoverOpacity: 0.02,
      hover: '#f6f9fc',
    },
    divider: '#cf022b',
  },
  typography,
  shadows
},
  
);

export { baselightTheme };
