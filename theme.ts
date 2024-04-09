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
    palette: {
        ...palette,
    },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h5: {
        color: 'red'
    },
    subtitle2: {
        color: 'white',
        fontSize: '1rem',
        fontFamily: 'roboto mono',
        fontWeight: 500
    },
    body2LightBold: {
      color: palette.lightYellow,
      fontSize: '0.75rem',
      fontFamily: 'roboto mono',
      fontWeight: 900
    },
    subtitle3: {
      fontWeight: 500,
      fontFamily: 'roboto mono',
      fontSize: '1.125rem'
    },
    body1: {
      fontWeight: 400,
      fontFamily: 'roboto mono',
      fontSize: '0.8125rem',
    },
    body2: {
      fontWeight: 300,
      fontFamily: 'roboto mono',
      fontSize: '0.75rem',
    },
    body3: {
      fontWeight: 300,
      fontFamily: 'roboto mono',
      fontSize: '0.675rem',
    },
    bodyBold3: {
      fontWeight: 500,
      fontFamily: 'roboto mono',
      fontSize: '0.675rem',
    }
  },
});

export default theme;
