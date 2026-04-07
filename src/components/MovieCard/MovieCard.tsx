import { Box, CardContent, Chip, CircularProgress, Rating, Skeleton, Stack, Typography } from '@mui/material';
import type * as React from 'react';
import { memo } from 'react';
import type { MovieItem } from '../../types/MovieItem.ts';
import * as S from './MovieCard.styles';

interface MovieCardProps {
  movie?: MovieItem;
  onClick?: () => void;
  isLoading?: boolean;
}

export const MovieCard = memo(({ movie, onClick, isLoading }: MovieCardProps) => {
  if (!isLoading && !movie) return null;

  const posterUrl = movie?.img?.url ?? 'https://placehold.co/185x278?text=No+Poster'; // Fallback placeholder

  return (
    <S.StyledCard isLoading={isLoading}>
      <S.StyledActionArea onClick={!isLoading ? onClick : undefined} disabled={isLoading}>
        {/* Movie poster */}
        <S.PosterWrapper>
          {isLoading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
              {/* Absolute centered spinner over the skeleton */}
              <S.AbsoluteCenter>
                <CircularProgress size={40} thickness={4} sx={{ color: 'grey.500' }} />
              </S.AbsoluteCenter>
            </>
          ) : (
            <S.StyledCardMedia
              component="img"
              image={posterUrl}
              alt={movie?.name}
              loading="lazy"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = 'https://placehold.co/342x513?text=Image+Error';
              }}
            />
          )}
        </S.PosterWrapper>

        <CardContent sx={{ flexGrow: 1, width: '100%', boxSizing: 'border-box' }}>
          {/* Title */}
          <S.FixedHeightBox height="3rem" mb={1} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {isLoading ? (
              <Box sx={{ width: '100%' }}>
                <Skeleton variant="text" width="90%" height={25} />
                <Skeleton variant="text" width="60%" height={25} />
              </Box>
            ) : (
              <S.EllipsisTypography
                variant="h6"
                lines={2}
                sx={{ fontWeight: 'bold', lineHeight: 1.2, fontSize: '1.1rem' }}
              >
                {movie?.name}
              </S.EllipsisTypography>
            )}
          </S.FixedHeightBox>

          {/* Genres */}
          <S.FixedHeightBox height="24px" mb={1.5}>
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
          </S.FixedHeightBox>

          {/* Rating */}
          <S.FixedHeightBox height="24px" mb={1.5} sx={{ display: 'flex', alignItems: 'center' }}>
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
          </S.FixedHeightBox>

          {/* Overview */}
          <S.FixedHeightBox height="3.8rem">
            {isLoading ? (
              <Box>
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="70%" />
              </Box>
            ) : (
              <S.EllipsisTypography
                variant="body2"
                color="text.secondary"
                lines={3}
                sx={{ fontSize: '0.85rem', lineHeight: 1.5 }}
              >
                {movie?.overview || 'No description available for this movie.'}
              </S.EllipsisTypography>
            )}
          </S.FixedHeightBox>

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
      </S.StyledActionArea>
    </S.StyledCard>
  );
});
