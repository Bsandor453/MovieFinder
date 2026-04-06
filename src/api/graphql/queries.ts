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
 * Fetch popular movies for the landing page.
 */
export const GET_POPULAR_MOVIES = gql`
    query GetPopularMovies($page: PageRange) {
        popularMovies(page: $page) {
            ...MovieFields
        }
    }
    ${MOVIE_FIELDS}
`;

/**
 * Standard search by text term.
 */
export const SEARCH_MOVIES = gql`
    query SearchMovies($term: String!, $page: PageRange) {
        searchMovies(query: $term, page: $page) {
            ...MovieFields
        }
    }
    ${MOVIE_FIELDS}
`;

/**
 * Search for related/similar movies based on a specific movie ID.
 */
export const SEARCH_SIMILAR_MOVIES = gql`
    query SearchSimilarMovies($id: ID!, $page: PageRange) {
        movie(id: $id) {
            id # The parent movie ID
            similar(page: $page) {
                ...MovieFields
            }
        }
    }
    ${MOVIE_FIELDS}
`;
