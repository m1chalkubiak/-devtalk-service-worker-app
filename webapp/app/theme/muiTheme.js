import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#55bd86',
    },
    secondary: {
      main: '#03ccff',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '20px',
      },
      contained: {
        boxShadow: 'none',
      },
      label: {
        color: '#fff',
      },
    },
  },
});
