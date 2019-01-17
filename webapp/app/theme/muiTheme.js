import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#26b2ff',
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
      containedPrimary: {
        color: '#fff',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#55bd86',
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});
