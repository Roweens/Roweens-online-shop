import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

export function darkTheme() {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: orange[700],
        contrastText: '#fff',
      },
      secondary: {
        main: orange[400],
      },
      background: {
        default: '#737373',
      },
    },
  });
}
