import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import type * as React from 'react';
import type { SearchMoviesQuery } from '../gql/graphql.ts';

type MovieItem = SearchMoviesQuery['searchMovies'][0];

interface MovieCardProps {
  movie: MovieItem;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.img?.url ?? 'https://placehold.co/185x278?text=No+Poster'; // Fallback placeholder

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': { transform: 'scale(1.02)', boxShadow: 6 },
      }}
    >
      <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
        {/* Movie poster */}
        <CardMedia
          component="img"
          sx={{
            height: 280, // Fix height
            objectFit: 'cover',
            bgcolor: 'grey.200',
          }}
          image={posterUrl}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.currentTarget;
            target.src = 'https://placehold.co/185x278?text=Image+Error';
          }}
          alt={movie.name}
        />

        <CardContent>
          {/* Title */}
          <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            {movie.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={(movie.score || 0) / 2} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.score}
            </Typography>
          </Box>

          {/* Overview */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.85rem',
            }}
          >
            {movie.overview}
          </Typography>

          <Typography variant="caption" display="block" sx={{ mt: 2, color: 'gray' }}>
            {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
