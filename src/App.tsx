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
import { useCallback, useState } from 'react';
import { MovieList } from './components/MovieList';
import type { SearchConfig } from './types/SeachConfig.ts';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({ type: 'popular', page: 1 });

  // Search movies by a search term
  const handleSearch = useCallback(() => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      setSearchConfig({ type: 'search', term: trimmed, page: 1 });
    } else {
      // If the search is cleared, go back to the popular page
      setSearchConfig({ type: 'popular', page: 1 });
    }
  }, [searchTerm]);

  // Search movies by similarity to the given movie selected in the movie detail modal child
  const handleShowSimilar = useCallback((id: string, name: string) => {
    setSearchConfig({ type: 'similar', movieId: id, movieName: name, page: 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // UX: scroll to the top when the list changes
  }, []);

  // Go back to the normal search view from the similar movies view
  const handleBackToSearch = useCallback(() => {
    // If we have a term in the box, go back to that search, otherwise reset
    if (searchTerm) {
      setSearchConfig({ type: 'search', term: searchTerm, page: 1 });
    } else {
      setSearchConfig({ type: 'popular', page: 1 }); // Back to popular if no search term exists
    }
  }, [searchTerm]);

  // Reset to the landing page
  const resetToPopular = useCallback(() => {
    setSearchTerm('');
    setSearchConfig({ type: 'popular', page: 1 });
  }, []);

  // Pagination
  const handlePageChange = useCallback((newPage: number) => {
    setSearchConfig((prev) => {
      // If we are in search OR similar movies view, we update the page
      if (prev.type === 'search' || prev.type === 'similar') {
        return { ...prev, page: newPage };
      }
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // UX
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Sticky header */}
      <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: 'center', py: 1, gap: 2 }}>
          {/* Logo that resets the app */}
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer', display: { xs: 'none', md: 'block' }, fontWeight: 'bold' }}
            onClick={resetToPopular}
          >
            MovieFinder
          </Typography>

          {searchConfig.type === 'similar' && (
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
        {/* Context title based on search mode */}
        <Typography variant="h5" sx={{ color: 'text.primary', mb: 3, fontWeight: 'bold' }}>
          {searchConfig.type === 'popular' && 'Popular Movies'}
          {searchConfig.type === 'search' && 'Search results for: '}
          {searchConfig.type === 'similar' && 'Movies similar to: '}

          {searchConfig.type !== 'popular' && (
            <Box component="span" sx={{ color: 'primary.main' }}>
              {searchConfig.type === 'search' ? searchConfig.term : searchConfig.movieName}
            </Box>
          )}
        </Typography>

        {/* The list handles popular, search, and similar modes via its config prop and callbacks */}
        <MovieList config={searchConfig} onShowSimilar={handleShowSimilar} onPageChange={handlePageChange} />
      </Container>
    </Box>
  );
};

export default App;
