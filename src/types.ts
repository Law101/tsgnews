import type { Topic } from './constants.js';

export interface Article {
  url: string;
  title: string;
  publisher: string;
  publishedDate: string;
}

export interface TSGNewsOptions {
  baseUrl?: string;
  country?: string;
  language?: string;
}

export interface SearchOptions {
  sinceWhen?: string;
  afterDate?: string;
  beforeDate?: string;
}

export interface NewsResult {
  feed: {
    title?: string;
    link?: string;
    description?: string;
  };
  articles: Article[];
}

export type { Topic };
