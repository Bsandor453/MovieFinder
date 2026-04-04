import { useQuery } from '@apollo/client/react';
import { SEARCH_MOVIES } from '../api/queries.ts';

export const MovieList = ({ term }: { term: string }) => {
  const { data, loading, error } = useQuery(SEARCH_MOVIES, {
    variables: { term: term },
    skip: !term,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ul>
      {data?.searchMovies?.map((movie) => (
        <li key={movie.id}>{movie.name}</li>
      ))}
    </ul>
  );
};
