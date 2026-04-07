import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import type * as React from 'react';
import { memo } from 'react';
import type { MovieItem } from '../types/MovieItem.ts';

interface MovieCardProps {
  movie?: MovieItem;
  onClick?: () => void;
  isLoading?: boolean;
}

export const MovieCard = memo(({ movie, onClick, isLoading }: MovieCardProps) => {
  if (!isLoading && !movie) return null;

  const posterUrl = movie?.img?.url ?? 'https://placehold.co/185x278?text=No+Poster'; // Fallback placeholder

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': !isLoading ? { transform: 'scale(1.02)', boxShadow: 6 } : {},
      }}
    >
      <CardActionArea
        onClick={!isLoading ? onClick : undefined}
        disabled={isLoading}
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
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              {/* Absolute centered spinner over the skeleton */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  zIndex: 1,
                }}
              >
                <CircularProgress size={40} thickness={4} sx={{ color: 'grey.500' }} />
              </Box>
            </>
          ) : (
            <CardMedia
              component="img"
              image={posterUrl}
              alt={movie?.name}
              loading="lazy"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Cut off the excess
                objectPosition: 'center', // Center the cut
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = 'https://placehold.co/342x513?text=Image+Error';
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
          {/* Title */}
          <Box sx={{ height: '3rem', mb: 1, display: 'flex', alignItems: 'flex-start' }}>
            {isLoading ? (
              <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" width="90%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
              </Box>
            ) : (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  fontSize: '1.1rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  lineClamp: 2,
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {movie?.name}
              </Typography>
            )}
          </Box>

          {/* Genres */}
          <Box sx={{ height: '24px', mb: 1.5 }}>
            <Stack direction="row" spacing={0.5}>
              {isLoading ? (
                <>
                  <Skeleton variant="rounded" width={60} height={20} />
                  <Skeleton variant="rounded" width={60} height={20} />
                </>
              ) : (
                movie?.genres
                  ?.slice(0, 2)
                  .map((genre) => (
                    <Chip
                      key={genre.name}
                      label={genre.name}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem', height: '20px' }}
                    />
                  ))
              )}
            </Stack>
          </Box>

          {/* Rating */}
          <Box sx={{ height: '24px', display: 'flex', alignItems: 'center', mb: 1.5 }}>
            {isLoading ? (
              <Skeleton width="50%" height={20} />
            ) : (
              <>
                <Rating value={(movie?.score || 0) / 2} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontWeight: 'medium' }}>
                  {movie?.score ? movie.score.toFixed(1) : 'N/A'}
                </Typography>
              </>
            )}
          </Box>

          {/* Overview */}
          <Box sx={{ height: '3.8rem', overflow: 'hidden' }}>
            {isLoading ? (
              <Box>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  lineClamp: 3,
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                }}
              >
                {movie?.overview || 'No description available for this movie.'}
              </Typography>
            )}
          </Box>

          {/* Release year */}
          <Box sx={{ mt: 2, height: '20px' }}>
            {isLoading ? (
              <Skeleton width="30%" />
            ) : (
              <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 'bold' }}>
                {movie?.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'Unknown Year'}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
