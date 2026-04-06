export interface TextSearchConfig {
  type: 'search';
  term: string;
}

export interface SimilarSearchConfig {
  type: 'similar';
  movieId: string;
  movieName: string;
}

export type SearchConfig = TextSearchConfig | SimilarSearchConfig;
