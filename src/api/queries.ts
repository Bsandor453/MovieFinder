import { graphql } from '../gql';

export const SEARCH_MOVIES = graphql(`
    query SearchMovies($term: String!) {
        searchMovies(query: $term) {
            id
            name
            overview
            releaseDate
            score
        }
    }
`);
