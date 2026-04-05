import { useQuery } from '@apollo/client/react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { SEARCH_MOVIES } from '../api/graphql/queries.ts';
import type { SearchMoviesQuery, SearchMoviesQueryVariables } from '../gql/graphql.ts';
import type { MovieItem } from '../types/MovieItem.ts';
import type { MovieItemList } from '../types/MovieItemList.ts';
import { MovieCard } from './MovieCard';
import { MovieDetailModal } from './MovieDetailModal.tsx';

interface MovieListProps {
  term: string;
}

export const MovieList = ({ term }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<MovieItem | null>(null);

  const { data, loading, error } = useQuery<SearchMoviesQuery, SearchMoviesQueryVariables>(SEARCH_MOVIES, {
    variables: { term },
    skip: !term,
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">
        Error: {error.message}
      </Typography>
    );
  }

  const movies: MovieItemList = data?.searchMovies || [];

  if (movies.length === 0) {
    return (
      <Typography textAlign="center" mt={5}>
        No movies found for "{term}". Try another search!
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
          </Grid>
        ))}
      </Grid>
      <MovieDetailModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  );
};
