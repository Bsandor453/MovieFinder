import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { MovieList } from './components/MovieList';
import type { SearchConfig } from './types/SeachConfig.ts';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchConfig, setSearchConfig] = useState<SearchConfig | null>(null);

  // Search movies by a search term
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchConfig({ type: 'search', term: searchTerm.trim() });
    }
  };

  // Search movies by similarity to the given movie selected in the movie detail modal child
  const handleShowSimilar = (id: string, name: string) => {
    setSearchConfig({ type: 'similar', movieId: id, movieName: name });
  };

  // Go back to the normal search view from the similar movies view
  const handleBackToSearch = () => {
    // If we have a term in the box, go back to that search, otherwise reset
    if (searchTerm) {
      setSearchConfig({ type: 'search', term: searchTerm });
    } else {
      setSearchConfig(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sticky header */}
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'center', py: 1, gap: 2 }}>
          {/* Back button only visible in 'similar' mode */}
          {searchConfig?.type === 'similar' && (
            <Button startIcon={<ArrowBackIcon />} onClick={handleBackToSearch} variant="outlined" size="small">
              Back
            </Button>
          )}

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
        {!searchConfig ? (
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h4" color="text.secondary">
              Search for your favorite movies! 🍿
            </Typography>
          </Box>
        ) : (
          <>
            {/* Context title based on search mode */}
            <Typography variant="h5" sx={{ color: 'text.primary', mb: 3, fontWeight: 'bold' }}>
              {searchConfig.type === 'search' ? 'Movies result for search: ' : 'Movies similar to: '}
              <Box component="span" sx={{ color: 'primary.main' }}>
                {searchConfig.type === 'search' ? searchConfig.term : searchConfig.movieName}
              </Box>
            </Typography>

            {/* The movie list: either search results or similar movies to the selected movie in the detail modal */}
            <MovieList config={searchConfig} onShowSimilar={handleShowSimilar} />
          </>
        )}
      </Container>
    </Box>
  );
};

export default App;
