import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
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
`;
