import DarkModeIcon from '@mui/icons-material/DarkMode';
import SunnyIcon from '@mui/icons-material/Sunny';
import { IconButton, useTheme } from '@mui/material';
import { useColorMode } from './MUIThemeProvider';

export const ThemeToggleButton = () => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton
      onClick={colorMode.toggleColorMode}
      color="inherit"
      title={theme.palette.mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    >
      {theme.palette.mode === 'dark' ? <DarkModeIcon color="info" /> : <SunnyIcon sx={{ color: 'warning.main' }} />}
    </IconButton>
  );
};
