import { Box, Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import type * as React from 'react';
import type { MovieItem } from '../types/MovieItem.ts';

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
      <CardActionArea
        onClick={onClick}
        sx={{
          height: '100%', // Force to fill out the Card
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        {/* Movie poster */}
        <Box sx={{ width: '100%', height: 280, overflow: 'hidden', position: 'relative' }}>
          <CardMedia
            component="img"
            image={posterUrl}
            alt={movie.name}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Cut off the excess
              objectPosition: 'center', // Center the cut
              bgcolor: 'grey.200',
            }}
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.src = 'https://placehold.co/185x278?text=Image+Error';
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          {/* Title */}
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 1 }}>
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
