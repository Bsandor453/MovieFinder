import { Box, Container, Divider, Typography } from '@mui/material';

export const Footer = () => (
  <Box component="footer" sx={{ py: 3, mt: 'auto', bgcolor: 'background.paper' }}>
    <Container maxWidth="xl">
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} MovieFinder. Created by <b>Bereczki Sándor Máté</b>
      </Typography>
      <Typography variant="caption" color="text.disabled" align="center" display="block" sx={{ mt: 0.5 }}>
        Data provided by the Zoosh TMDB API.
      </Typography>
    </Container>
  </Box>
);
