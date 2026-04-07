import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { fetchWikiSummary } from './wikipedia';

// Define the mock server
const server = setupServer(
  http.get('https://en.wikipedia.org/api/rest_v1/page/summary/*', () => {
    return HttpResponse.json({
      extract: 'Mocked Wikipedia content',
      content_urls: { desktop: { page: 'https://en.wikipedia.org/wiki/Mock' } },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Wikipedia API service', () => {
  it('format the Wikipedia answer correctly', async () => {
    const result = await fetchWikiSummary('Inception');

    expect(result).toEqual({
      extract: 'Mocked Wikipedia content',
      url: 'https://en.wikipedia.org/wiki/Mock',
    });
  });

  it('returns null on error', async () => {
    // Overwrite the default handler with an error message
    server.use(
      http.get('https://en.wikipedia.org/api/rest_v1/page/summary/*', () => {
        return new HttpResponse(null, { status: 404 });
      }),
    );

    const result = await fetchWikiSummary('NonExistentMovie');
    expect(result).toBeNull();
  });
});
