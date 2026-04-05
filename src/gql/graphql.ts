/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Use JavaScript Date object for date/time fields. */
  DateTime: { input: any; output: any; }
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: { input: any; output: any; }
  /** A field whose value matches the provided regular expression /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/. */
  ISODate: { input: any; output: any; }
  /** A field whose value matches the provided regular expression /([a-z]{2})-([A-Z]{2})/. */
  LanguageCode: { input: any; output: any; }
  /** An Integer with a value between 1 and 1000 (inclusive). */
  PageRange: { input: any; output: any; }
  /** A field whose value matches the provided regular expression /^[A-Z]{2}$/. */
  RegionCode: { input: any; output: any; }
  /** An Integer with a value between 1 and 10 (inclusive). */
  ScoreMaximumRange: { input: any; output: any; }
  /** An Integer with a value between 0 and 10 (inclusive). */
  ScoreMinimumRange: { input: any; output: any; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: any; output: any; }
};

export type Backdrop = Image & {
  __typename?: 'Backdrop';
  colors?: Maybe<ExtractedColors>;
  custom?: Maybe<Scalars['URL']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  /** w1280 */
  large?: Maybe<Scalars['URL']['output']>;
  /** w780 */
  medium?: Maybe<Scalars['URL']['output']>;
  original?: Maybe<Scalars['URL']['output']>;
  /** w300 */
  small?: Maybe<Scalars['URL']['output']>;
  svg?: Maybe<Scalars['URL']['output']>;
};


export type BackdropCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BackdropOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type BackdropSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Cast = {
  __typename?: 'Cast';
  character: Scalars['String']['output'];
  credit: Credit;
};

export type Collection = {
  __typename?: 'Collection';
  backdrop?: Maybe<Backdrop>;
  id: Scalars['ID']['output'];
  images: Array<MediaImage>;
  name: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  parts: Array<Movie>;
  poster?: Maybe<Poster>;
};


export type CollectionPartsArgs = {
  language?: InputMaybe<Translations>;
};

export type Company = {
  __typename?: 'Company';
  country: Country;
  description: Scalars['String']['output'];
  headquarters: Scalars['String']['output'];
  homepage: Scalars['URL']['output'];
  id: Scalars['ID']['output'];
  images: Array<Logo>;
  logo: Logo;
  name: Scalars['String']['output'];
  parentCompany?: Maybe<Company>;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Credit = {
  __typename?: 'Credit';
  id: Scalars['ID']['output'];
  media: Media;
  person?: Maybe<Person>;
  role: CreditType;
};

export type CreditType = Cast | Crew;

export type Crew = {
  __typename?: 'Crew';
  credit: Credit;
  department: Scalars['String']['output'];
  job: Scalars['String']['output'];
};

/** Used to filter Dates. Has no effect if both inputs are omited. */
export type DateRangeInput = {
  /** Include from the given Date forward */
  from?: InputMaybe<Scalars['ISODate']['input']>;
  /** Include up to the given Date */
  to?: InputMaybe<Scalars['ISODate']['input']>;
};

export enum Direction {
  /** Ascending, ie: 1..2..3.. or A..B..C.. */
  Asc = 'ASC',
  /** Descending, ie: 3..2..1.. or C..B..A.. */
  Desc = 'DESC'
}

export type DiscoverMoviesFilter = {
  includeAdult?: InputMaybe<Scalars['Boolean']['input']>;
  includeVideo?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Translations>;
  primaryReleaseDate?: InputMaybe<DateRangeInput>;
  primaryReleaseYear?: InputMaybe<Scalars['Int']['input']>;
  region?: InputMaybe<Scalars['RegionCode']['input']>;
  releaseDate?: InputMaybe<DateRangeInput>;
  voteAverage?: InputMaybe<VoteAverageInput>;
  voteCount?: InputMaybe<NumberRangeInput>;
  withCast?: InputMaybe<IdListInput>;
  withCompanies?: InputMaybe<IdListInput>;
  withCrew?: InputMaybe<IdListInput>;
  withGenres?: InputMaybe<IdListInput>;
  withKeywords?: InputMaybe<KeywordInput>;
  withOriginalLanguage?: InputMaybe<Translations>;
  withPeople?: InputMaybe<IdListInput>;
  withReleaseType?: InputMaybe<ReleaseTypeInput>;
  withRuntime?: InputMaybe<NumberRangeInput>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export enum DiscoverMoviesSortBy {
  OriginalTitle = 'OriginalTitle',
  Popularity = 'Popularity',
  PrimaryReleaseDate = 'PrimaryReleaseDate',
  ReleaseDate = 'ReleaseDate',
  Revenue = 'Revenue',
  VoteAverage = 'VoteAverage',
  VoteCount = 'VoteCount'
}

export type DiscoverMoviesSortInput = {
  by?: InputMaybe<DiscoverMoviesSortBy>;
  direction?: InputMaybe<Direction>;
};

export type DiscoverTvFilter = {
  airDate?: InputMaybe<DateRangeInput>;
  firstAired?: InputMaybe<DateRangeInput>;
  firstAiredYear?: InputMaybe<Scalars['Int']['input']>;
  includeUnaired?: InputMaybe<Scalars['Boolean']['input']>;
  language?: InputMaybe<Translations>;
  screenedTheatrically?: InputMaybe<Scalars['Boolean']['input']>;
  timeZone?: InputMaybe<Scalars['String']['input']>;
  voteAverage?: InputMaybe<VoteAverageInput>;
  voteCount?: InputMaybe<NumberRangeInput>;
  withCompanies?: InputMaybe<IdListInput>;
  withGenres?: InputMaybe<IdListInput>;
  withKeywords?: InputMaybe<KeywordInput>;
  withNetworks?: InputMaybe<IdListInput>;
  withOriginalLanguage?: InputMaybe<Translations>;
  withRuntime?: InputMaybe<NumberRangeInput>;
};

export enum DiscoverTvSortBy {
  FirstAirDate = 'FirstAirDate',
  Popularity = 'Popularity',
  VoteAverage = 'VoteAverage'
}

export type DiscoverTvSortInput = {
  by?: InputMaybe<DiscoverTvSortBy>;
  direction?: InputMaybe<Direction>;
};

export type Episode = {
  __typename?: 'Episode';
  aired: Scalars['DateTime']['output'];
  cast: Array<Credit>;
  crew: Array<Credit>;
  guests: Array<Credit>;
  id: Scalars['ID']['output'];
  images: Array<Still>;
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  overview: Scalars['String']['output'];
  score: Scalars['Float']['output'];
  season: Season;
  series: Tv;
  still?: Maybe<Still>;
  videos: Array<Video>;
  votes: Scalars['Int']['output'];
};


export type EpisodeCastArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type EpisodeCrewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type EpisodeGuestsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type EpisodeVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Translations>;
};

export enum EpisodeVideoType {
  BehindtheScenes = 'BehindtheScenes',
  Bloopers = 'Bloopers',
  Clip = 'Clip',
  Featurette = 'Featurette',
  OpeningCredits = 'OpeningCredits',
  Recap = 'Recap',
  Teaser = 'Teaser',
  Trailer = 'Trailer'
}

export type ExtractedColors = {
  __typename?: 'ExtractedColors';
  darkMuted?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  darkVibrant?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  lightMuted?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  lightVibrant?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  muted?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  vibrant?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'Unknown'
}

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type IdListInput = {
  exclude?: InputMaybe<Array<Scalars['ID']['input']>>;
  include?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type Image = {
  /** A hash of extracted colors from the image. */
  colors?: Maybe<ExtractedColors>;
  /** Returns a URL for an image with the given dimensions or a generated SVG as either a URL or a base64 encoded data URI. */
  custom?: Maybe<Scalars['URL']['output']>;
  /** The filename of the image. Used to construct URLs given a base URL and a size. */
  file?: Maybe<Scalars['String']['output']>;
  /** Returns a URL for an image in it's original size or a generated SVG as either a URL or a base64 encoded data URI. */
  original?: Maybe<Scalars['URL']['output']>;
  /** Returns either a URL to or a base64 encoded data URI of the image. */
  svg?: Maybe<Scalars['URL']['output']>;
};


export type ImageCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Job = {
  __typename?: 'Job';
  department: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Keyword = {
  __typename?: 'Keyword';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type KeywordInput = {
  exclude?: InputMaybe<Array<Scalars['ID']['input']>>;
  excludeLogic?: InputMaybe<Logic>;
  include?: InputMaybe<Array<Scalars['ID']['input']>>;
  includeLogic?: InputMaybe<Logic>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export enum Logic {
  And = 'AND',
  Or = 'OR'
}

export type Logo = Image & {
  __typename?: 'Logo';
  colors?: Maybe<ExtractedColors>;
  custom?: Maybe<Scalars['URL']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  /** w500 */
  huge?: Maybe<Scalars['URL']['output']>;
  /** w45 */
  icon?: Maybe<Scalars['URL']['output']>;
  /** w300 */
  large?: Maybe<Scalars['URL']['output']>;
  /** w185 */
  medium?: Maybe<Scalars['URL']['output']>;
  original?: Maybe<Scalars['URL']['output']>;
  /** w154 */
  small?: Maybe<Scalars['URL']['output']>;
  svg?: Maybe<Scalars['URL']['output']>;
  /** w92 */
  tiny?: Maybe<Scalars['URL']['output']>;
};


export type LogoCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LogoOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LogoSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Media = Movie | Tv;

export type MediaImage = Backdrop | Poster;

export enum MediaType {
  Movie = 'Movie',
  Tv = 'TV'
}

export type Movie = {
  __typename?: 'Movie';
  adult: Scalars['Boolean']['output'];
  backdrop?: Maybe<Backdrop>;
  budget: Scalars['Int']['output'];
  cast: Array<Credit>;
  collection?: Maybe<Collection>;
  country: Array<Country>;
  crew: Array<Credit>;
  genres: Array<Genre>;
  homepage?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  images: Array<MediaImage>;
  keywords: Array<Keyword>;
  languages: Array<Language>;
  name: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  poster?: Maybe<Poster>;
  productionCompanies: Array<Company>;
  recommended: Array<Movie>;
  releaseDate?: Maybe<Scalars['DateTime']['output']>;
  revenue: Scalars['String']['output'];
  reviews: Array<Review>;
  runtime?: Maybe<Scalars['Int']['output']>;
  score: Scalars['Float']['output'];
  similar: Array<Movie>;
  socialMedia?: Maybe<SocialMedia>;
  status: ReleaseStatus;
  tagline?: Maybe<Scalars['String']['output']>;
  videos: Array<Video>;
  votes: Scalars['Int']['output'];
};


export type MovieCastArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type MovieCollectionArgs = {
  language?: InputMaybe<Translations>;
};


export type MovieCrewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type MovieRecommendedArgs = {
  language?: InputMaybe<Translations>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type MovieReviewsArgs = {
  language?: InputMaybe<Translations>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type MovieSimilarArgs = {
  language?: InputMaybe<Translations>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type MovieVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Translations>;
};

export enum MovieVideoType {
  BehindtheScenes = 'BehindtheScenes',
  Bloopers = 'Bloopers',
  Clip = 'Clip',
  Featurette = 'Featurette',
  Teaser = 'Teaser',
  Trailer = 'Trailer'
}

export type Network = {
  __typename?: 'Network';
  country: Scalars['String']['output'];
  headquarters: Scalars['String']['output'];
  homepage: Scalars['URL']['output'];
  id: Scalars['ID']['output'];
  images: Array<Logo>;
  name: Scalars['String']['output'];
};

/** Used to filter video runtimes in Minutes */
export type NumberRangeInput = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
};

export enum Palette {
  DarkMuted = 'darkMuted',
  DarkVibrant = 'darkVibrant',
  LightMuted = 'lightMuted',
  LightVibrant = 'lightVibrant',
  Muted = 'muted',
  Vibrant = 'vibrant'
}

export type Person = {
  __typename?: 'Person';
  adult: Scalars['Boolean']['output'];
  aliases: Array<Scalars['String']['output']>;
  appearsIn: Array<Media>;
  biography: Scalars['String']['output'];
  birthday?: Maybe<Scalars['DateTime']['output']>;
  birthplace?: Maybe<Scalars['String']['output']>;
  credits: Array<Credit>;
  diedOn?: Maybe<Scalars['DateTime']['output']>;
  gender: Gender;
  homepage?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  images: Array<Photo>;
  knownFor: Scalars['String']['output'];
  name: Scalars['String']['output'];
  photo: Photo;
  socialMedia?: Maybe<SocialMedia>;
  taggedImages: Array<MediaImage>;
  workedOn: Array<Media>;
};


export type PersonAppearsInArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type PersonCreditsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  type: Array<MediaType>;
};


export type PersonWorkedOnArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type Photo = Image & {
  __typename?: 'Photo';
  colors?: Maybe<ExtractedColors>;
  custom?: Maybe<Scalars['URL']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  /** h632 */
  large?: Maybe<Scalars['URL']['output']>;
  /** w185 */
  medium?: Maybe<Scalars['URL']['output']>;
  original?: Maybe<Scalars['URL']['output']>;
  /** w45 */
  small?: Maybe<Scalars['URL']['output']>;
  svg?: Maybe<Scalars['URL']['output']>;
};


export type PhotoCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PhotoOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PhotoSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Poster = Image & {
  __typename?: 'Poster';
  colors?: Maybe<ExtractedColors>;
  custom?: Maybe<Scalars['URL']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  /** w780 */
  huge?: Maybe<Scalars['URL']['output']>;
  /** w500 */
  large?: Maybe<Scalars['URL']['output']>;
  /** w342 */
  medium?: Maybe<Scalars['URL']['output']>;
  original?: Maybe<Scalars['URL']['output']>;
  /** w185 */
  small?: Maybe<Scalars['URL']['output']>;
  svg?: Maybe<Scalars['URL']['output']>;
  /** w92 */
  thumbnail?: Maybe<Scalars['URL']['output']>;
  /** w154 */
  tiny?: Maybe<Scalars['URL']['output']>;
};


export type PosterCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PosterOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PosterSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  airingThisWeek: Array<Tv>;
  airingToday: Array<Tv>;
  collection: Collection;
  countries: Array<Country>;
  discoverMovies: Array<Movie>;
  discoverTV: Array<Tv>;
  jobs: Array<Job>;
  languages: Array<Language>;
  latestMovie: Movie;
  latestPerson: Person;
  latestTV: Tv;
  movie: Movie;
  movieGenres: Array<Genre>;
  movies: Array<Movie>;
  nowPlaying: Array<Movie>;
  people: Array<Person>;
  person: Person;
  popularMovies: Array<Movie>;
  popularPeople: Array<Person>;
  popularTV: Array<Tv>;
  review: Review;
  reviews: Array<Review>;
  search: Array<SearchResult>;
  searchMovies: Array<Movie>;
  searchPeople: Array<Person>;
  searchTV: Array<Tv>;
  shows: Array<Tv>;
  timezones: Array<Timezone>;
  topRatedMovies: Array<Movie>;
  topRatedTV: Array<Tv>;
  trending: Array<SearchResult>;
  trendingMovies: Array<Movie>;
  trendingPeople: Array<Person>;
  trendingTV: Array<Tv>;
  tv: Tv;
  tvGenres: Array<Genre>;
  upcomingMovies: Array<Movie>;
};


export type QueryAiringThisWeekArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryAiringTodayArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
  language?: InputMaybe<Translations>;
};


export type QueryDiscoverMoviesArgs = {
  filter?: InputMaybe<DiscoverMoviesFilter>;
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  sortBy?: InputMaybe<DiscoverMoviesSortInput>;
};


export type QueryDiscoverTvArgs = {
  filter?: InputMaybe<DiscoverTvFilter>;
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  sortBy?: InputMaybe<DiscoverTvSortInput>;
};


export type QueryLatestMovieArgs = {
  language?: InputMaybe<Translations>;
};


export type QueryLatestPersonArgs = {
  language?: InputMaybe<Translations>;
};


export type QueryLatestTvArgs = {
  language?: InputMaybe<Translations>;
};


export type QueryMovieArgs = {
  id: Scalars['ID']['input'];
  language?: InputMaybe<Translations>;
};


export type QueryMovieGenresArgs = {
  language?: InputMaybe<Translations>;
};


export type QueryMoviesArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  language?: InputMaybe<Translations>;
};


export type QueryNowPlayingArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryPeopleArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  language?: InputMaybe<Translations>;
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
  language?: InputMaybe<Translations>;
};


export type QueryPopularMoviesArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryPopularPeopleArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryPopularTvArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryReviewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryReviewsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
};


export type QuerySearchArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchMoviesArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchPeopleArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  query: Scalars['String']['input'];
};


export type QuerySearchTvArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
  query: Scalars['String']['input'];
};


export type QueryShowsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  language?: InputMaybe<Translations>;
};


export type QueryTopRatedMoviesArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryTopRatedTvArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type QueryTrendingArgs = {
  page?: InputMaybe<Scalars['PageRange']['input']>;
  timeframe?: InputMaybe<TrendingTimeframe>;
};


export type QueryTrendingMoviesArgs = {
  page?: InputMaybe<Scalars['PageRange']['input']>;
  timeframe?: InputMaybe<TrendingTimeframe>;
};


export type QueryTrendingPeopleArgs = {
  page?: InputMaybe<Scalars['PageRange']['input']>;
  timeframe?: InputMaybe<TrendingTimeframe>;
};


export type QueryTrendingTvArgs = {
  page?: InputMaybe<Scalars['PageRange']['input']>;
  timeframe?: InputMaybe<TrendingTimeframe>;
};


export type QueryTvArgs = {
  id: Scalars['ID']['input'];
  language?: InputMaybe<Translations>;
};


export type QueryTvGenresArgs = {
  language?: InputMaybe<Translations>;
};


export type QueryUpcomingMoviesArgs = {
  language?: InputMaybe<Translations>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};

export enum ReleaseStatus {
  Canceled = 'Canceled',
  InProduction = 'InProduction',
  Planned = 'Planned',
  PostProduction = 'PostProduction',
  Released = 'Released',
  Rumored = 'Rumored'
}

export type ReleaseTypeInput = {
  /** How to combine the Release Types list, default: OR */
  logic?: InputMaybe<Logic>;
  /** Duplicate Release Types will be filtered */
  types?: InputMaybe<Array<ReleaseStatus>>;
};

export type Review = {
  __typename?: 'Review';
  author: Scalars['String']['output'];
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  language?: Maybe<Language>;
  media: Media;
  url: Scalars['URL']['output'];
};

export type SearchResult = Movie | Person | Tv;

export type Season = {
  __typename?: 'Season';
  aired: Scalars['DateTime']['output'];
  cast: Array<Credit>;
  crew: Array<Credit>;
  episodeCount: Scalars['Int']['output'];
  episodes: Array<Episode>;
  id: Scalars['ID']['output'];
  images: Array<Poster>;
  name: Scalars['String']['output'];
  number: Scalars['Int']['output'];
  overview: Scalars['String']['output'];
  poster?: Maybe<Poster>;
  series: Tv;
  videos: Array<Video>;
};


export type SeasonCastArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonCrewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type SeasonVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Translations>;
};

export enum SeasonVideoType {
  BehindtheScenes = 'BehindtheScenes',
  Bloopers = 'Bloopers',
  Clip = 'Clip',
  Featurette = 'Featurette',
  OpeningCredits = 'OpeningCredits',
  Recap = 'Recap',
  Teaser = 'Teaser',
  Trailer = 'Trailer'
}

export type SocialMedia = {
  __typename?: 'SocialMedia';
  facebook?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  imdb?: Maybe<Scalars['URL']['output']>;
  instagram?: Maybe<Scalars['URL']['output']>;
  twitter?: Maybe<Scalars['URL']['output']>;
};

export type Still = Image & {
  __typename?: 'Still';
  colors?: Maybe<ExtractedColors>;
  custom?: Maybe<Scalars['URL']['output']>;
  file?: Maybe<Scalars['String']['output']>;
  /** w300 */
  large?: Maybe<Scalars['URL']['output']>;
  /** w185 */
  medium?: Maybe<Scalars['URL']['output']>;
  original?: Maybe<Scalars['URL']['output']>;
  /** w92 */
  small?: Maybe<Scalars['URL']['output']>;
  svg?: Maybe<Scalars['URL']['output']>;
};


export type StillCustomArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StillOriginalArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  svg?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StillSvgArgs = {
  base64?: InputMaybe<Scalars['Boolean']['input']>;
  color?: InputMaybe<Palette>;
  size?: InputMaybe<Scalars['String']['input']>;
};

export type Tv = {
  __typename?: 'TV';
  backdrop?: Maybe<Backdrop>;
  cast: Array<Credit>;
  country: Array<Country>;
  createdBy: Array<Person>;
  crew: Array<Credit>;
  episodeCount: Scalars['Int']['output'];
  episodes: Array<Episode>;
  firstAired: Scalars['DateTime']['output'];
  genres: Array<Genre>;
  homepage?: Maybe<Scalars['URL']['output']>;
  id: Scalars['ID']['output'];
  images: Array<MediaImage>;
  inProduction: Scalars['Boolean']['output'];
  language: Language;
  languages: Array<Language>;
  lastAired: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  networks: Array<Network>;
  originalName: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  poster?: Maybe<Poster>;
  productionCompanies: Array<Company>;
  recommended: Array<Tv>;
  reviews: Array<Review>;
  runtime: Array<Scalars['Int']['output']>;
  score: Scalars['Float']['output'];
  seasonCount: Scalars['Int']['output'];
  seasons: Array<Season>;
  similar: Array<Tv>;
  socialMedia?: Maybe<SocialMedia>;
  status: TvStatus;
  type: TvType;
  videos: Array<Video>;
  votes: Scalars['Int']['output'];
};


export type TvCastArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type TvCrewArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type TvRecommendedArgs = {
  language?: InputMaybe<Translations>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type TvReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type TvSimilarArgs = {
  language?: InputMaybe<Translations>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['PageRange']['input']>;
};


export type TvVideosArgs = {
  filter?: InputMaybe<VideoFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  language?: InputMaybe<Translations>;
};

export enum TvStatus {
  Canceled = 'Canceled',
  Ended = 'Ended',
  InProduction = 'InProduction',
  Pilot = 'Pilot',
  Planned = 'Planned',
  ReturningSeries = 'ReturningSeries'
}

export enum TvType {
  Documentary = 'Documentary',
  Miniseries = 'Miniseries',
  News = 'News',
  Reality = 'Reality',
  Scripted = 'Scripted',
  TalkShow = 'TalkShow'
}

export enum TvVideoType {
  BehindtheScenes = 'BehindtheScenes',
  Bloopers = 'Bloopers',
  Clip = 'Clip',
  Featurette = 'Featurette',
  OpeningCredits = 'OpeningCredits',
  Teaser = 'Teaser',
  Trailer = 'Trailer'
}

export type Timezone = {
  __typename?: 'Timezone';
  code: Scalars['String']['output'];
  zone: Scalars['String']['output'];
};

export enum Translations {
  Bangla = 'Bangla',
  Basque = 'Basque',
  BokmalNorwegian = 'BokmalNorwegian',
  BrazilianPortuguese = 'BrazilianPortuguese',
  Bulgarian = 'Bulgarian',
  CanadianFrench = 'CanadianFrench',
  Catalan = 'Catalan',
  Chamorro = 'Chamorro',
  ChineseSimplified = 'ChineseSimplified',
  ChineseTraditional = 'ChineseTraditional',
  Czech = 'Czech',
  Danish = 'Danish',
  Dutch = 'Dutch',
  English = 'English',
  Esperanto = 'Esperanto',
  Farsi = 'Farsi',
  Finnish = 'Finnish',
  French = 'French',
  Georgian = 'Georgian',
  German = 'German',
  Greek = 'Greek',
  Hebrew = 'Hebrew',
  Hindi = 'Hindi',
  Hungarian = 'Hungarian',
  Indonesian = 'Indonesian',
  Italian = 'Italian',
  Japanese = 'Japanese',
  Kannada = 'Kannada',
  Korean = 'Korean',
  Lithuanian = 'Lithuanian',
  Malayalam = 'Malayalam',
  MexicanSpanish = 'MexicanSpanish',
  Norwegian = 'Norwegian',
  Polish = 'Polish',
  Portuguese = 'Portuguese',
  Romanian = 'Romanian',
  Russian = 'Russian',
  SaudiArabianArabic = 'SaudiArabianArabic',
  Serbian = 'Serbian',
  Slovak = 'Slovak',
  Slovenian = 'Slovenian',
  Spanish = 'Spanish',
  Swedish = 'Swedish',
  Tamil = 'Tamil',
  Telugu = 'Telugu',
  Thai = 'Thai',
  Turkish = 'Turkish',
  UaeArabic = 'UAEArabic',
  Ukrainian = 'Ukrainian',
  Vietnamese = 'Vietnamese'
}

export enum TrendingTimeframe {
  Day = 'Day',
  Week = 'Week'
}

export type Video = {
  __typename?: 'Video';
  country: Country;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  language: Language;
  name: Scalars['String']['output'];
  site: Scalars['String']['output'];
  /** One of value: 360, 480, 720, 1080 */
  size: Scalars['Int']['output'];
  type: VideoType;
};

export type VideoFilter = {
  site?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Array<VideoType>>;
};

export enum VideoType {
  BehindtheScenes = 'BehindtheScenes',
  Bloopers = 'Bloopers',
  Clip = 'Clip',
  Featurette = 'Featurette',
  OpeningCredits = 'OpeningCredits',
  Recap = 'Recap',
  Teaser = 'Teaser',
  Trailer = 'Trailer'
}

/** Used to filter User Scores by Average Votes */
export type VoteAverageInput = {
  /** Integer between 1 and 10 */
  max?: InputMaybe<Scalars['ScoreMaximumRange']['input']>;
  /** Integer between 0 and 10 */
  min?: InputMaybe<Scalars['ScoreMinimumRange']['input']>;
};

export type SearchMoviesQueryVariables = Exact<{
  term: Scalars['String']['input'];
}>;


export type SearchMoviesQuery = { __typename?: 'Query', searchMovies: Array<{ __typename?: 'Movie', id: string, name: string, overview: string, releaseDate?: any | null, score: number, img?: { __typename?: 'Poster', url?: any | null } | null }> };


export const SearchMoviesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMovies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"term"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchMovies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"term"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","alias":{"kind":"Name","value":"img"},"name":{"kind":"Name","value":"poster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"url"},"name":{"kind":"Name","value":"custom"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"StringValue","value":"w500","block":false}}]}]}}]}}]}}]} as unknown as DocumentNode<SearchMoviesQuery, SearchMoviesQueryVariables>;