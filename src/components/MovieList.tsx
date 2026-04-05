import { useQuery } from '@apollo/client/react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { SEARCH_MOVIES } from '../api/queries';
import type { SearchMoviesQuery, SearchMoviesQueryVariables } from '../gql/graphql.ts';
import { MovieCard } from './MovieCard';

type MovieList = SearchMoviesQuery['searchMovies'];

interface MovieListProps {
  term: string;
}

export const MovieList = ({ term }: MovieListProps) => {
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

  const movies: MovieList = data?.searchMovies || [];

  if (movies.length === 0) {
    return (
      <Typography textAlign="center" mt={5}>
        No movies found for "{term}". Try another search!
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {movies.map((movie) => (
        <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <MovieCard movie={movie} onClick={() => console.log('Selected:', movie.name)} />
        </Grid>
      ))}
    </Grid>
  );
};
