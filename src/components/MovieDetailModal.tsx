import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchWikiSummary, type WikiSummary } from '../api/rest/wikipedia';
import type { MovieItem } from '../types/MovieItem.ts';

export const MovieDetailModal = ({ movie, onClose }: { movie: MovieItem | null; onClose: () => void }) => {
  const [wikiData, setWikiData] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(false);

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
    } else {
      setWikiData(null);
    }

    return () => {
      isMounted = false;
    };
  }, [movie]);

  return (
    <Dialog open={!!movie} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle
        sx={{ m: 0, p: 2, fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {movie?.name}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Database description (short) */}
        <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold' }}>
          Database Overview
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {movie?.overview}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Wikipedia description (longer) */}
        <Typography variant="overline" color="secondary" sx={{ fontWeight: 'bold' }}>
          Wikipedia Summary
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : wikiData ? (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
              {wikiData.extract}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<OpenInNewIcon />}
              href={wikiData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more on Wikipedia
            </Button>
          </Box>
        ) : (
          <Typography variant="caption" display="block">
            No Wikipedia page found for this title.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};
