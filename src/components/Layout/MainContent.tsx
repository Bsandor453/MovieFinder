import { Box, Container } from '@mui/material';
import * as S from '../../pages/Home/Home.styles';
import type { SearchConfig } from '../../types/SeachConfig';
import { MovieList } from '../MovieList';

interface MainContentProps {
  config: SearchConfig;
  onShowSimilar: (id: string, name: string) => void;
  onPageChange: (page: number) => void;
}

export const MainContent = ({ config, onShowSimilar, onPageChange }: MainContentProps) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      {/* Page context title based on search mode */}
      <S.PageTitle variant="h5">
        {config.type === 'popular' && 'Popular Movies'}
        {config.type === 'search' && 'Search results for: '}
        {config.type === 'similar' && 'Movies similar to: '}

        {config.type !== 'popular' && (
          <Box component="span" sx={{ color: 'primary.main' }}>
            {config.type === 'search' ? config.term : config.movieName}
          </Box>
        )}
      </S.PageTitle>

      {/* The list handles popular, search, and similar modes via its config prop and callbacks */}
      <MovieList config={config} onShowSimilar={onShowSimilar} onPageChange={onPageChange} />
    </Container>
  );
};
