import { useEffect, useState } from 'react';
import type { SearchConfig } from '../types/SeachConfig.ts';
import { usePopularMovies, useSimilarSearch, useTextSearch } from './useMovieSearch.ts';

// Master hook for all movie queries
export const useMovieCollection = (config: SearchConfig) => {
  const [popularPage, setPopularPage] = useState(1);

  // Reset logic: if the config jumps back to 1, we also reset internally
  // Example use case: the user clicks on the title / home page button
  useEffect(() => {
    if (config.type === 'popular' && config.page === 1) {
      setPopularPage(1);
    }
  }, [config.page, config.type]);

  const isPopular = config.type === 'popular';
  const isSearch = config.type === 'search';
  const isSimilar = config.type === 'similar';

  const popular = usePopularMovies(!isPopular);
  const search = useTextSearch(isSearch ? config.term : '', config.page || 1, !isSearch);
  const similar = useSimilarSearch(isSimilar ? config.movieId : '', config.page || 1, !isSimilar);

  // Uniform loadMore that only does something when we are in popular mode
  const handleLoadMore = () => {
    if (isPopular) {
      const nextPage = popularPage + 1;
      setPopularPage(nextPage);
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
