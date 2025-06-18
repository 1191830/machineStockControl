import type { ThemeOptions } from '@mui/material/styles';

export const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          background: {
            default: '#f3f4f6',
            paper: '#ffffff',
          },
          primary: {
            main: '#1e40af', // Azul escuro
          },
          secondary: {
            main: '#f97316', // Laranja
          },
        }
      : {
          background: {
            default: '#111827',
            paper: '#1f2937',
          },
          primary: {
            main: '#60a5fa', // Azul claro
          },
          secondary: {
            main: '#fb923c', // Laranja claro
          },
        }),
  },
  typography: {
    fontFamily: ['"Roboto"', 'sans-serif'].join(','),
  },
});
