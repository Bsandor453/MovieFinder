export interface PopularSearchConfig {
  type: 'popular';
  page?: number; // Optional, handled internally
}

export interface TextSearchConfig {
  type: 'search';
  term: string;
  page: number;
}

export interface SimilarSearchConfig {
  type: 'similar';
  movieId: string;
  movieName: string;
  page: number;
}

export type SearchConfig = PopularSearchConfig | TextSearchConfig | SimilarSearchConfig;
