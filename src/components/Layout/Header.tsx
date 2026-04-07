import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, InputAdornment, Toolbar, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import * as S from '../../pages/Home/Home.styles';
import { ThemeToggleButton } from '../ThemeToggle/ThemeToggleButton';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  onSearch: () => void;
  onReset: () => void;
  showBack: boolean;
  onBack: () => void;
}

export const Header = ({ searchTerm, setSearchTerm, onSearch, onReset, showBack, onBack }: HeaderProps) => (
  <AppBar position="sticky" sx={{ bgcolor: 'background.paper', color: 'text.primary', boxShadow: 1 }}>
    <Toolbar sx={{ py: 1, gap: { xs: 1, sm: 2 } }}>
      {/* Logo & brand group: desktop only */}
      <S.LogoGroup onClick={onReset}>
        <Box component="img" src={logo} alt="Logo" sx={{ height: 48, width: 'auto' }} />
        <Typography variant="h6" className="logo-text" sx={{ fontWeight: 'bold', ml: 1 }}>
          MovieFinder
        </Typography>
      </S.LogoGroup>

      {/* Back button: Similar movies view */}
      {showBack && (
        <IconButton onClick={onBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
      )}

      {/* Search bar: responsive width */}
      <S.SearchField
        variant="outlined"
        size="small"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={onSearch} edge="end">
                  <SearchIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {/* Theme switcher: always visible at the end */}
      <ThemeToggleButton />
    </Toolbar>
  </AppBar>
);
