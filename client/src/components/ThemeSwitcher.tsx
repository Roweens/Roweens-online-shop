import { Switch, FormGroup, FormControlLabel } from '@mui/material';
import { Theme } from '../theme/ThemeContext';
import { useTheme } from '../theme/useTheme';

export const ThemeSwitcher = () => {
  const { switchTheme, theme } = useTheme();

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={theme === Theme.LIGHT ? false : true}
            onClick={switchTheme}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
        label="Switch theme"
      />
    </FormGroup>
  );
};
