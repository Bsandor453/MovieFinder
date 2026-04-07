import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { MovieItem } from '../../types/MovieItem.ts';
import { MovieCard } from './MovieCard';

const mockMovie: MovieItem = {
  id: '1',
  name: 'Inception',
  overview: 'A thief who steals corporate secrets...',
  score: 8.8,
  releaseDate: '2010-07-16',
  genres: [{ name: 'Sci-Fi' }, { name: 'Action' }],
  img: { url: 'https://test.com/poster.jpg' },
};

describe('MovieCard', () => {
  it('Displays the movie and the score', () => {
    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('8.8')).toBeInTheDocument();
  });

  it('Calls the onClick function on click', () => {
    const handleClick = vi.fn(); // Create the mock function
    render(<MovieCard movie={mockMovie} onClick={handleClick} />);

    const cardAction = screen.getByRole('button');
    fireEvent.click(cardAction);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Displays the skeleton in loading state', () => {
    render(<MovieCard isLoading={true} />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });
});
