import type { SearchConfig } from '../types/SeachConfig.ts';
import { usePopularMovies, useSimilarSearch, useTextSearch } from './useMovieSearch.ts';

// Default page size for the TMBD sandbox
const DEFAULT_PAGE_SIZE = 20;

// Master hook for all movie queries
export const useMovieCollection = (config: SearchConfig) => {
  const isPopular = config.type === 'popular';
  const isSearch = config.type === 'search';
  const isSimilar = config.type === 'similar';

  const popular = usePopularMovies(!isPopular);
  const search = useTextSearch(isSearch ? config.term : '', config.page || 1, !isSearch);
  const similar = useSimilarSearch(isSimilar ? config.movieId : '', config.page || 1, !isSimilar);

  // Uniform loadMore that only does something when we are in popular mode
  const handleLoadMore = () => {
    if (isPopular) {
      // Calculate how many blocks of DEFAULT_PAGE_SIZE are already in it
      const nextPage = Math.floor(popular.movies.length / DEFAULT_PAGE_SIZE) + 1;

      popular.loadMore(nextPage);
    }
  };

  // Return the data in a fixed structure
  if (isPopular) {
    return {
      movies: popular.movies,
      loading: popular.loading,
      error: popular.error,
      loadMore: handleLoadMore,
      hasLoadMore: true,
    };
  }

  const activeSearch = isSearch ? search : similar;
  return {
    movies: activeSearch.movies,
    loading: activeSearch.loading,
    error: activeSearch.error,
    loadMore: () => {}, // Empty function for correct typing
    hasLoadMore: false,
  };
};
