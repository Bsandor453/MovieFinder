import { gql } from '@apollo/client';

/**
 * Reusable movie fragment
 */
export const MOVIE_FIELDS = gql`
    fragment MovieFields on Movie {
        id
        name
        overview
        score
        releaseDate
        genres {
            name
        }
        img: poster {
            url: custom(size: "w500")
        }
    }
`;

/**
 * Standard search by text term.
 */
export const SEARCH_MOVIES = gql`
    query SearchMovies($term: String!) {
        searchMovies(query: $term) {
            ...MovieFields
        }
    }
    ${MOVIE_FIELDS}
`;

/**
 * Search for related/similar movies based on a specific movie ID.
 */
export const SEARCH_SIMILAR_MOVIES = gql`
    query SearchSimilarMovies($id: ID!) {
        movie(id: $id) {
            id # The parent movie ID
            similar {
                ...MovieFields
            }
        }
    }
    ${MOVIE_FIELDS}
`;
