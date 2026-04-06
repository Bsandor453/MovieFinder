import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarIcon from '@mui/icons-material/Star';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchWikiSummary, type WikiSummary } from '../api/rest/wikipedia';
import type { MovieItem } from '../types/MovieItem.ts';

interface MovieDetailModalProps {
  movie: MovieItem | null;
  onClose: () => void;
  onShowSimilar: (id: string, name: string) => void;
}

export const MovieDetailModal = ({ movie, onClose, onShowSimilar }: MovieDetailModalProps) => {
  // Buffered state to keep movie data during the closing animation
  const [displayMovie, setDisplayMovie] = useState<MovieItem | null>(movie);
  const [wikiData, setWikiData] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync displayMovie with the movie prop when it's not null
  useEffect(() => {
    if (movie) {
      setDisplayMovie(movie);
    }
  }, [movie]);

  useEffect(() => {
    let isMounted = true; // lightweight abort mechanism

    if (movie?.name) {
      setLoading(true);
      fetchWikiSummary(movie.name).then((data) => {
        if (isMounted) {
          setWikiData(data);
          setLoading(false);
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [movie]);

  return (
    <Dialog
      open={!!movie}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            transition: 'backdrop-filter 0.3s ease',
          },
        },
        paper: {
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
          },
        },
        transition: {
          onExited: () => {
            // Clean up all buffered data only after the transition finished
            setDisplayMovie(null);
            setWikiData(null);
          },
        },
      }}
    >
      {/* Render content using the buffered displayMovie */}
      {displayMovie && (
        <>
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5" component="span" fontWeight="bold">
              {displayMovie.name}
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              overflowY: 'auto',
              // Subtle scrollbar
              '&::-webkit-scrollbar': { width: '8px' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: '4px' },
            }}
          >
            {/* Related movies trigger button */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<AutoAwesomeIcon />}
              onClick={() => {
                onShowSimilar(displayMovie.id, displayMovie?.name);
                onClose();
              }}
              sx={{ mb: 3, py: 1.5, fontWeight: 'bold' }}
            >
              Discover similar movies
            </Button>

            <Grid container spacing={3}>
              {/* Left column: poster image */}
              <Grid size={{ xs: 12, sm: 4 }}>
                <Box
                  component="img"
                  src={displayMovie.img?.url ?? 'https://placehold.co/300x450?text=No+Poster'}
                  alt={displayMovie.name}
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    display: 'block',
                  }}
                />
              </Grid>

              {/* Right column: Key movie info */}
              <Grid size={{ xs: 12, sm: 8 }}>
                <Stack spacing={2}>
                  {/* Genres */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {displayMovie.genres?.map((genre) => (
                      <Chip key={genre.name} label={genre.name} size="small" color="primary" variant="outlined" />
                    ))}
                  </Stack>

                  {/* Rating & release year */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Rating
                        value={(displayMovie.score || 0) / 2}
                        precision={0.5}
                        readOnly
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                        {displayMovie.score?.toFixed(1)}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      • {displayMovie.releaseDate ? new Date(displayMovie.releaseDate).getFullYear() : 'N/A'}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* Database description (short) */}
                  <Box>
                    <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
                      Database Overview
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {displayMovie.overview}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {/* Wikipedia description (longer) */}
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 2 }}>
                <Chip label="Wikipedia Insights" size="small" />
              </Divider>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress size={30} />
                </Box>
              ) : wikiData ? (
                <Box sx={{ p: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontStyle: 'italic',
                      mb: 2,
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      lineClamp: 6,
                      WebkitLineClamp: 6,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {wikiData.extract}
                  </Typography>
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<OpenInNewIcon />}
                    href={wikiData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ borderRadius: 5 }}
                  >
                    Read full article
                  </Button>
                </Box>
              ) : (
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', display: 'block' }}>
                  No additional Wikipedia information available for this movie.
                </Typography>
              )}
            </Box>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};
