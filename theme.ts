// src/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
// import { extendTheme } from '@mui/material/styles';




const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});


export const palette = {
  lightYellow: '#FFF5A3',
  darkInk: '#040D5D',
  checkedIn: '#7EB79C',
  notCheckedIn: "#FF5B4E",
  checkedInFont: "#4D6D5E",
}


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 850,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h5: {
      color: 'red'
    },
    subtitle1: {
      color: 'black',
      fontSize: '1rem',
      fontFamily: 'roboto mono',
      fontWeight: 300
    },
    subtitle2: {
      color: palette.lightYellow,
      fontSize: '0.75rem',
      fontFamily: 'roboto mono',
      fontWeight: 900
    },
    h6: {
      fontWeight: 500,
      fontFamily: 'roboto mono',
      fontSize: '1.125rem'
    },
    body1: {
      fontWeight: 300,
      fontFamily: 'roboto mono',
      fontSize: '0.75rem',
    },
    body2: {
      fontWeight: 300,
      fontFamily: 'roboto mono',
      fontSize: '0.675rem',
    },

  },
});

export default theme;
