import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Container, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { MovieList } from './components/MovieList';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setActiveSearch(searchTerm);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sticky header */}
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'center', py: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ width: { xs: '100%', sm: '500px' } }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch} edge="end">
                      <SearchIcon color="primary" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {!activeSearch ? (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" color="text.secondary">
              Search for your favorite movies! 🍿
            </Typography>
          </Box>
        ) : (
          <MovieList term={activeSearch} />
        )}
      </Container>
    </Box>
  );
};

export default App;
