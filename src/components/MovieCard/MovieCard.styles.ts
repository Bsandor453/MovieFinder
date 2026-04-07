import { Box, Card, CardActionArea, CardMedia, styled, Typography } from '@mui/material';

export const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<{ isLoading?: boolean }>(({ theme, isLoading }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  ...(!isLoading && {
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: theme.shadows[6],
    },
  }),
}));

export const StyledActionArea = styled(CardActionArea)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'flex-start',
});

export const PosterWrapper = styled(Box)({
  width: '100%',
  height: 280,
  overflow: 'hidden',
  position: 'relative',
});

export const AbsoluteCenter = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  zIndex: 1,
});

export const StyledCardMedia = styled(CardMedia)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Cut off the excess
  objectPosition: 'center', // Center the cut
}) as typeof CardMedia;

// Helper component for trimming multiline text
export const EllipsisTypography = styled(Typography)<{ lines: number }>(({ lines }) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export const FixedHeightBox = styled(Box)<{ height: string | number }>(({ height }) => ({
  height,
  overflow: 'hidden',
}));
