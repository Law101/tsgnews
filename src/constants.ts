export const BASE_URL = 'https://news.google.com/rss';

export const TOPICS = [
  'WORLD',
  'NATION',
  'BUSINESS',
  'TECHNOLOGY',
  'ENTERTAINMENT',
  'SCIENCE',
  'SPORTS',
  'HEALTH',
] as const;

export type Topic = (typeof TOPICS)[number];
