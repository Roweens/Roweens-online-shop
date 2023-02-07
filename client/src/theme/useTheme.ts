import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface useThemeRes {
  theme?: Theme;
  switchTheme: () => void;
}

export function useTheme(): useThemeRes {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    if (setTheme) setTheme(newTheme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return { theme, switchTheme };
}
