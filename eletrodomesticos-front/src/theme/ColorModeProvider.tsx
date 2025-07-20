import React, { createContext, useMemo, useState, useEffect, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getDesignTokens } from './theme';
import { createTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

type Mode = 'light' | 'dark';

interface ColorModeContextType {
  mode: Mode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialMode = (): Mode => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    localStorage.setItem('theme', mode);

    // Tailwind dark mode (add/remove class)
    const root = window.document.documentElement;
    root.classList.remove(mode === 'dark' ? 'light' : 'dark');
    root.classList.add(mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode],
  );

  const theme: Theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
