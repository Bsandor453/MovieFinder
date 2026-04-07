import { Box, styled, TextField, Typography } from '@mui/material';

export const HomeWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const LogoGroup = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    opacity: 0.85,
    '& .logo-text': {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: '100%',
  marginLeft: 0,
  marginRight: 0,
  [theme.breakpoints.up('sm')]: {
    maxWidth: '500px',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
}));
