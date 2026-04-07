import { Button, CircularProgress, Grid, Pagination, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useMovieCollection } from '../hooks/useMovieCollection.ts';
import type { MovieItem } from '../types/MovieItem';
import type { SearchConfig } from '../types/SeachConfig.ts';
import { MovieCard } from './MovieCard.tsx';
import { MovieDetailModal } from './MovieDetailModal';
import { MovieGrid } from './MovieGrid';

interface MovieListProps {
  config: SearchConfig;
  onShowSimilar: (id: string, name: string) => void;
  onPageChange: (page: number) => void;
}

// For loading state: 8 fixed skeleton items
const SKELETON_IDS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];

export const MovieList = memo(({ config, onShowSimilar, onPageChange }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  // Master hook for all movie queries
  const { movies, loading, error, loadMore, hasLoadMore } = useMovieCollection(config);

  // Status handling: Loading
  if (loading && movies.length === 0) {
    return (
      <Grid container spacing={3}>
        {SKELETON_IDS.map((id) => (
          <Grid key={id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard isLoading={true} />
          </Grid>
        ))}
      </Grid>
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
        {hasLoadMore && (
          <Button
            variant="outlined"
            onClick={loadMore}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Loading...' : 'Show more movies'}
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
});
