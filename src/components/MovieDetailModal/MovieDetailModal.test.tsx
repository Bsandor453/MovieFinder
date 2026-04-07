import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as wikiApi from '../../api/rest/wikipedia';
import type { MovieItem } from '../../types/MovieItem.ts';
import { MovieDetailModal } from './MovieDetailModal';

// Wikipedia API mockup
vi.mock('../../api/rest/wikipedia', () => ({
  fetchWikiSummary: vi.fn(),
}));

const mockMovie: MovieItem = {
  id: '1',
  name: 'Inception',
  overview: 'A thief who steals corporate secrets...',
  score: 8.8,
  releaseDate: '2010-07-16',
  genres: [{ name: 'Sci-Fi' }, { name: 'Action' }],
  img: { url: 'https://test.com/poster.jpg' },
};

describe('MovieDetailModal', () => {
  const onClose = vi.fn();
  const onShowSimilar = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Displays basic movie data when open', () => {
    // By default, fetch returns an empty promise
    vi.mocked(wikiApi.fetchWikiSummary).mockResolvedValue(null);

    render(<MovieDetailModal movie={mockMovie} onClose={onClose} onShowSimilar={onShowSimilar} />);

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('A thief who steals corporate secrets...')).toBeInTheDocument();
    expect(screen.getByText(/2010/)).toBeInTheDocument();
  });

  it('Loads and displays Wikipedia data', async () => {
    const mockWiki = {
      extract: 'Inception is a 2010 science fiction action film...',
      url: 'https://en.wikipedia.org/wiki/Inception',
    };

    vi.mocked(wikiApi.fetchWikiSummary).mockResolvedValue(mockWiki);

    render(<MovieDetailModal movie={mockMovie} onClose={onClose} onShowSimilar={onShowSimilar} />);

    // There should be a loading spinner initially
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // Wait for the asynchronous data to arrive
    await waitFor(() => {
      expect(screen.getByText(/Inception is a 2010/)).toBeInTheDocument();
    });

    const link = screen.getByRole('link', { name: /read full article/i });
    expect(link).toHaveAttribute('href', mockWiki.url);
  });

  it('Calls the onShowSimilar function and closes the modal', () => {
    render(<MovieDetailModal movie={mockMovie} onClose={onClose} onShowSimilar={onShowSimilar} />);

    const similarBtn = screen.getByRole('button', { name: /similar movies/i });
    fireEvent.click(similarBtn);

    expect(onShowSimilar).toHaveBeenCalledWith(mockMovie.id, mockMovie.name);
    expect(onClose).toHaveBeenCalled();
  });

  it('Displays the error message if there is no Wikipedia data', async () => {
    vi.mocked(wikiApi.fetchWikiSummary).mockResolvedValue(null);

    render(<MovieDetailModal movie={mockMovie} onClose={onClose} onShowSimilar={onShowSimilar} />);

    await waitFor(() => {
      expect(screen.getByText(/No additional Wikipedia information available/i)).toBeInTheDocument();
    });
  });
});
