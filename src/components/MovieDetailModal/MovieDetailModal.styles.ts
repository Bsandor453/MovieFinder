import { Dialog, DialogContent, styled, Typography } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(8px)',
    transition: 'backdrop-filter 0.3s ease',
  },
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(3),
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  overflowY: 'auto',
  // Subtle scrollbar
  '&::-webkit-scrollbar': { width: '8px' },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    borderRadius: '4px',
  },
}));

export const PosterImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
}));

export const WikiExtract = styled(Typography)({
  fontStyle: 'italic',
  marginBottom: 16,
  lineHeight: 1.6,
  display: '-webkit-box',
  WebkitLineClamp: 6,
  // WebkitBoxOrient is technically deprecated, but this is currently
  // the only practical cross-browser solution for multi-line truncation.
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
