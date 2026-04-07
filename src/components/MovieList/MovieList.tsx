import { Button, CircularProgress, Grid, Pagination } from '@mui/material';
import { memo, useState } from 'react';
import { useMovieCollection } from '../../hooks/useMovieCollection.ts';
import type { MovieItem } from '../../types/MovieItem';
import type { SearchConfig } from '../../types/SeachConfig.ts';
import { MovieCard } from '../MovieCard/MovieCard.tsx';
import { MovieDetailModal } from '../MovieDetailModal/MovieDetailModal.tsx';
import { MovieGrid } from '../MovieGrid/MovieGrid.tsx';
import * as S from './MovieList.styles';

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
    return <S.StatusMessage color="error">Failed to load movies: {error.message}</S.StatusMessage>;
  }

  // Status handling: Empty
  if (movies.length === 0) {
    const noResultsMessage =
      config.type === 'search' ? `No movies found for "${config.term}".` : 'No movies available at the moment.';

    return <S.EmptyStateWrapper variant="h6">{noResultsMessage} Try a different search!</S.EmptyStateWrapper>;
  }

  return (
    <>
      <MovieGrid movies={movies} onSelect={setSelectedMovie} />

      {/* Load more button: for popular movies mode */}
      <S.PaginationStack spacing={2}>
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
      </S.PaginationStack>

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
