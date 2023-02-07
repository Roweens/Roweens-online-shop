import { useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

interface ThemeCustomProviderProps {
  children: React.ReactNode;
}

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;

export const ThemeCustomProvider: React.FC<ThemeCustomProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const contextProps = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextProps}>
      <ThemeProvider theme={theme === Theme.DARK ? darkTheme() : lightTheme()}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
