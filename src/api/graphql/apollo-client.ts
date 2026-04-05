import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

const link = new HttpLink({
  // Zoosh TMDB sandbox URI
  uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
});

export const apolloClient = new ApolloClient({
  cache: cache,
  link: link,
});
