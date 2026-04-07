import { useCallback, useState } from 'react';
import { Footer } from '../../components/Layout/Footer';
import { Header } from '../../components/Layout/Header';
import { MainContent } from '../../components/Layout/MainContent.tsx';
import type { SearchConfig } from '../../types/SeachConfig';
import * as S from './Home.styles';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchConfig, setSearchConfig] = useState<SearchConfig>({ type: 'popular', page: 1 });

  // Search movies by a search term
  const handleSearch = useCallback(() => {
    const trimmed = searchTerm.trim();
    if (trimmed) {
      setSearchConfig({ type: 'search', term: trimmed, page: 1 });
    } else {
      // If the search is cleared, go back to the popular page
      setSearchConfig({ type: 'popular', page: 1 });
    }
  }, [searchTerm]);

  // Search movies by similarity to the given movie selected in the movie detail modal child
  const handleShowSimilar = useCallback((id: string, name: string) => {
    setSearchConfig({ type: 'similar', movieId: id, movieName: name, page: 1 });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // UX: scroll to the top when the list changes
  }, []);

  // Go back to the normal search view from the similar movies view
  const handleBack = useCallback(() => {
    // If we have a term in the box, go back to that search, otherwise reset
    if (searchTerm) {
      setSearchConfig({ type: 'search', term: searchTerm, page: 1 });
    } else {
      setSearchConfig({ type: 'popular', page: 1 }); // Back to popular if no search term exists
    }
  }, [searchTerm]);

  // Reset to the landing page
  const resetToPopular = useCallback(() => {
    setSearchTerm('');
    setSearchConfig({ type: 'popular', page: 1 });
  }, []);

  // Pagination
  const handlePageChange = useCallback((newPage: number) => {
    setSearchConfig((prev) => {
      // If we are in search OR similar movies view, we update the page
      if (prev.type === 'search' || prev.type === 'similar') {
        return { ...prev, page: newPage };
      }
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // UX
  }, []);

  return (
    <S.HomeWrapper>
      {/* Sticky header: Logo, search bar, dark mode settings */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onReset={resetToPopular}
        showBack={searchConfig.type === 'similar'}
        onBack={handleBack}
      />

      {/* Main content: The movie list */}
      <MainContent config={searchConfig} onShowSimilar={handleShowSimilar} onPageChange={handlePageChange} />

      {/* Footer: Meta information  */}
      <Footer />
    </S.HomeWrapper>
  );
};

export default Home;
