import { Box, CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';
import { useSimilarSearch, useTextSearch } from '../hooks/useMovieSearch';
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

  // Call both hooks, the skip logic inside them ensures only the correct one fires
  const textSearch = useTextSearch(config.type === 'search' ? config.term : '', config.type !== 'search');
  const similarSearch = useSimilarSearch(config.type === 'similar' ? config.movieId : '', config.type !== 'similar');

  // Pick the active result based on the config type
  const { movies, loading, error } = config.type === 'search' ? textSearch : similarSearch;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" sx={{ mt: 5, fontWeight: 'medium' }}>
        Failed to load movies: {error.message}
      </Typography>
    );
  }

  if (movies.length === 0) {
    return (
      <Typography textAlign="center" mt={10} color="text.secondary" variant="h6">
        No movies found. Try a different search!
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
            setSelectedMovie(null);
          }
        }}
      />
    </>
  );
};
