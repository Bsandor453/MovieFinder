import { Grid } from '@mui/material';
import { memo } from 'react';
import type { MovieItem } from '../../types/MovieItem.ts';
import { MovieCard } from '../MovieCard/MovieCard.tsx';
import * as S from './MovieGrid.styles';

interface MovieGridProps {
  movies: MovieItem[];
  onSelect: (m: MovieItem) => void;
}

export const MovieGrid = memo(({ movies, onSelect }: MovieGridProps) => (
  <S.MovieGridContainer container spacing={3}>
    {movies.map((movie) => (
      <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <MovieCard movie={movie} onClick={() => onSelect(movie)} />
      </Grid>
    ))}
  </S.MovieGridContainer>
));
