import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#445566'
    },
    secondary: {
      main: '#f44336',
    },
  },
  shape: {
    borderRadius: 0,
  },

  typography: {
    fontFamily: "Zen Antique" , //"Oswald",
    h3: {
        fontFamily: 'Zen Antique Soft',
    },
    h4: {
        fontFamily: 'Zen Antique Soft',
    },
    h5: {
        fontFamily: 'Zen Antique Soft',
    },
    h6: {
        fontFamily: 'Zen Antique Soft', //'Bebas Neue'
    },
  },
});

export default theme