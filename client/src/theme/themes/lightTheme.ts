import { createTheme } from '@mui/material/styles';
import { orange, red } from '@mui/material/colors';

export function lightTheme() {
  return createTheme({
    palette: {
      primary: { main: orange[800] },
      secondary: {
        main: '#000000',
      },
      background: {
        default: '#F5F5F5',
      },
    },
  });
}
