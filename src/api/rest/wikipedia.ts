export interface WikiSummary {
  extract: string;
  url: string;
  thumbnail?: string;
}

export const fetchWikiSummary = async (title: string): Promise<WikiSummary | null> => {
  try {
    const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);

    if (!response.ok) {
      // If 404, then there is no such article
      return null;
    }

    const data = await response.json();

    return {
      extract: data.extract,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
      thumbnail: data.thumbnail?.source,
    };
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return null;
  }
};
