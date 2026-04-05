import { gql } from '@apollo/client';

export const SEARCH_MOVIES = gql`
    query SearchMovies($term: String!) {
        searchMovies(query: $term) {
            id
            name
            overview
            releaseDate
            genres {
                name
            }
            score
            img: poster {
                url: custom(size: "w500")
            }
        }
    }
`;
