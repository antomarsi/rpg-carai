import { createTheme } from '@mui/material/styles';
import { red, deepPurple } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: deepPurple[400],
    },
    secondary: {
      main: '#64385e',
    },
    background: {
      default: "#1A202C"
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;