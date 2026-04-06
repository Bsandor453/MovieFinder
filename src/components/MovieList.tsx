import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { usePopularMovies, useSimilarSearch, useTextSearch } from '../hooks/useMovieSearch';
import type { MovieItem } from '../types/MovieItem';
import type { SearchConfig } from '../types/SeachConfig.ts';
import { MovieDetailModal } from './MovieDetailModal';
import { MovieGrid } from './MovieGrid';

interface MovieListProps {
  config: SearchConfig;
  onShowSimilar: (id: string, name: string) => void;
}

export const MovieList = ({ config, onShowSimilar }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  // All hooks are declared (mandatory in React), but the skip logic inside them ensures only the correct one fires
  const popularSearch = usePopularMovies(config.type !== 'popular');
  const textSearch = useTextSearch(config.type === 'search' ? config.term : '', config.type !== 'search');
  const similarSearch = useSimilarSearch(config.type === 'similar' ? config.movieId : '', config.type !== 'similar');

  // Select the active result set based on the current config type
  const getActiveData = () => {
    switch (config.type) {
      case 'popular':
        return popularSearch;
      case 'search':
        return textSearch;
      case 'similar':
        return similarSearch;
      default:
        return { movies: [], loading: false, error: null };
    }
  };

  const { movies, loading, error } = getActiveData();

  // Status handling: Loading
  if (loading) {
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
