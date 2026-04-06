import { Box, Button, CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePopularMovies, useSimilarSearch, useTextSearch } from '../hooks/useMovieSearch';
import type { MovieItem } from '../types/MovieItem';
import type { SearchConfig } from '../types/SeachConfig.ts';
import { MovieDetailModal } from './MovieDetailModal';
import { MovieGrid } from './MovieGrid';

interface MovieListProps {
  config: SearchConfig;
  onShowSimilar: (id: string, name: string) => void;
  onPageChange: (page: number) => void;
}

export const MovieList = ({ config, onShowSimilar, onPageChange }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);
  const [popularPage, setPopularPage] = useState(1);

  const isPopular = config.type === 'popular';

  useEffect(() => {
    // If page 1 is in the config (because e.g., a reset has occurred in the App),
    // then return the internal counter as well.
    if (config.type === 'popular' && config.page === 1) {
      setPopularPage(1);
    }
  }, [config.page, config.type]);

  // All hooks are declared (mandatory in React), but the skip logic inside them ensures only the correct one fires

  const popularSearch = usePopularMovies(!isPopular);

  const textSearch = useTextSearch(
    config.type === 'search' ? config.term : '',
    config.type === 'search' ? config.page || 1 : 1,
    config.type !== 'search',
  );

  const similarSearch = useSimilarSearch(
    config.type === 'similar' ? config.movieId : '',
    config.type === 'similar' ? config.page || 1 : 1,
    config.type !== 'similar',
  );

  // Select the active result set based on the current config type
  const getActiveData = () => {
    switch (config.type) {
      case 'popular':
        return { ...popularSearch, loadMore: popularSearch.loadMore };
      case 'search':
        return { ...textSearch, loadMore: undefined };
      case 'similar':
        return { ...similarSearch, loadMore: undefined };
      default:
        return { movies: [], loading: false, error: null, loadMore: undefined };
    }
  };

  const { movies, loading, error } = getActiveData();

  // 'Load more' handler for popular movies
  const handleLoadMore = () => {
    const nextPage = popularPage + 1;
    setPopularPage(nextPage);
    popularSearch.loadMore(nextPage);
  };

  // Status handling: Loading
  if (loading && movies.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  // Status handling: Error
  if (error) {
    return (
      <Typography color="error" textAlign="center" sx={{ mt: 5, fontWeight: 'medium' }}>
        Failed to load movies: {error.message}
      </Typography>
    );
  }

  // Status handling: Empty
  if (movies.length === 0) {
    const noResultsMessage =
      config.type === 'search' ? `No movies found for "${config.term}".` : 'No movies available at the moment.';

    return (
      <Typography textAlign="center" mt={10} color="text.secondary" variant="h6">
        {noResultsMessage} Try a different search!
      </Typography>
    );
  }

  return (
    <>
      <MovieGrid movies={movies} onSelect={setSelectedMovie} />

      <Stack spacing={2} sx={{ mt: 4, mb: 4, alignItems: 'center' }}>
        {/* Load more: for popular movies */}
        {config.type === 'popular' && (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Loading next page...' : 'Show more movies'}
          </Button>
        )}

        {/* Pagination: for search and similar movies mode */}
        {(config.type === 'search' || config.type === 'similar') && (
          <Pagination
            count={50}
            page={config.page || 1}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
            disabled={loading}
          />
        )}
      </Stack>

      <MovieDetailModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onShowSimilar={(id) => {
          if (selectedMovie) {
            onShowSimilar(id, selectedMovie.name);
            setSelectedMovie(null); // Close modal when switching to the similar movies view
          }
        }}
      />
    </>
  );
};
