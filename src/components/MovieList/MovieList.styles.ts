import { Stack, styled, Typography } from '@mui/material';

export const PaginationStack = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  alignItems: 'center',
}));

export const StatusMessage = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(5),
  fontWeight: 'medium',
}));

export const EmptyStateWrapper = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(10),
  color: theme.palette.text.secondary,
}));
