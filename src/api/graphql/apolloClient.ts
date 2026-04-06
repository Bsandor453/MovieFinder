import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import type { MovieItem } from '../../types/MovieItem.ts';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        popularMovies: {
          // Ignore args: allows merging pages (infinite scroll)
          keyArgs: false,
          merge(existing: MovieItem[] = [], incoming: MovieItem[]) {
            return [...existing, ...incoming];
          },
        },
        searchMovies: {
          // Cache per (query, page): no merging between pages
          keyArgs: ['query', 'page'],
        },
      },
    },
    Movie: {
      fields: {
        similar: {
          // Cache per page: each page replaces previous
          keyArgs: ['page'],
        },
      },
    },
  },
});

const link = new HttpLink({
  // Zoosh TMDB sandbox URI
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
});

export const apolloClient = new ApolloClient({
  cache,
  link,
});
