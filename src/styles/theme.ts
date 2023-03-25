import { createTheme } from '@mui/material';
import PressStart2P from '../assets/fonts/PressStart2P-Regular.ttf';

const theme = createTheme({
    typography: {
        fontFamily: 'Press Start 2P, cursive',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Press Start 2P';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Press Start 2P'), local('Press Start 2P-Regular'), url(${PressStart2P}) format('ttf');
              unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
            }
          `,
        },
      },
})

export default theme;