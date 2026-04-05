import { Box, Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material';

// TODO: Fix any type
export const MovieCard = ({ movie, onClick }: { movie: any; onClick: () => void }) => {
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
        <CardContent>
          {/* Title */}
          <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            {movie.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={movie.score / 2} precision={0.5} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {movie.score}
            </Typography>
          </Box>

          <Typography variant="caption" display="block" sx={{ mt: 2, color: 'gray' }}>
            Release: {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
