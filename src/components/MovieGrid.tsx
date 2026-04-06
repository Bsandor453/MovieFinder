import { Grid } from '@mui/material';
import type { MovieItem } from '../types/MovieItem.ts';
import { MovieCard } from './MovieCard.tsx';

interface MovieGridProps {
  movies: MovieItem[];
  onSelect: (m: MovieItem) => void;
}

export const MovieGrid = ({ movies, onSelect }: MovieGridProps) => (
  <Grid container spacing={3}>
    {movies.map((movie) => (
      <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <MovieCard movie={movie} onClick={() => onSelect(movie)} />
      </Grid>
    ))}
  </Grid>
);
