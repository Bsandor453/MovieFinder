import type { ErrorLike } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { GET_POPULAR_MOVIES, SEARCH_MOVIES, SEARCH_SIMILAR_MOVIES } from '../api/graphql/queries';
import type { MovieItem } from '../types/MovieItem';

interface SearchData {
  searchMovies: MovieItem[];
}

interface SimilarData {
  movie: {
    similar: MovieItem[];
  };
}

interface PopularMoviesResult {
  movies: MovieItem[];
  loading: boolean;
  error: ErrorLike | undefined;
}

interface TextSearchResult {
  movies: MovieItem[];
  loading: boolean;
  error: ErrorLike | undefined;
}

interface SimilarSearchResult {
  movies: MovieItem[];
  loading: boolean;
  error: ErrorLike | undefined;
}

// Hook for popular movies (landing page)
export const usePopularMovies = (skip: boolean): PopularMoviesResult => {
  const { data, loading, error } = useQuery<{ movies: MovieItem[] }>(GET_POPULAR_MOVIES, {
    skip,
  });

  return {
    movies: data?.movies || [],
    loading,
    error,
  };
};

// Hook for standard text search
export const useTextSearch = (term: string, skip: boolean): TextSearchResult => {
  const { data, loading, error } = useQuery<SearchData>(SEARCH_MOVIES, {
    variables: { term },
    skip: skip || !term,
  });

  return {
    movies: data?.searchMovies || [],
    loading,
    error,
  };
};

// Hook for similar movies search
export const useSimilarSearch = (movieId: string, skip: boolean): SimilarSearchResult => {
  const { data, loading, error } = useQuery<SimilarData>(SEARCH_SIMILAR_MOVIES, {
    variables: { id: movieId },
    skip: skip || !movieId,
  });

  return {
    movies: data?.movie?.similar || [],
    loading,
    error,
  };
};
