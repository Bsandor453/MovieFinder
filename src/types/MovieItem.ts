import type { SearchMoviesQuery } from '../gql/graphql.ts';

export type MovieItem = SearchMoviesQuery['searchMovies'][0];
