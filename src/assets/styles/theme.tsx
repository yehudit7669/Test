import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    text: {
      primary: '#200343',
    },
    primary: {
      main: '#200343',
    },
    secondary: {
      main: '#FFC046',
    },
    error: {
      main: '#E50000',
    },
    warning: {
      main: '#FF7300',
    },
    info: {
      main: '#00A5FF',
    },
    success: {
      main: '#0AB813',
    },
    grey: {
      '400': 'rgba(0, 0, 0, 0.12)',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#F3EEE9',
        },
      },
    },
  },
})
