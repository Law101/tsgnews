import { BASE_URL, TOPICS, type Topic } from './constants.js';
import type { TSGNewsOptions, SearchOptions, NewsResult } from './types.js';
import {
  setCeid,
  feedParser,
  collectCoverage,
  encodeSearchQuery,
  parseDate,
} from './helpers.js';

export class TSGNews {
  private baseUrl: string;
  private country: string;
  private language: string;

  constructor(options: TSGNewsOptions = {}) {
    this.baseUrl = options.baseUrl ?? BASE_URL;
    this.country = options.country ?? 'US';
    this.language = options.language ?? 'en';
  }

  async topStories(): Promise<NewsResult> {
    const url = `${this.baseUrl}${setCeid(this.country, this.language)}`;
    const { feed, entries } = await feedParser(url);
    const articles = collectCoverage(entries);

    return { feed, articles };
  }

  async topicHeadlines(topic: Topic | string = 'WORLD'): Promise<NewsResult> {
    const upperTopic = topic.toUpperCase();

    if (!TOPICS.includes(upperTopic as Topic)) {
      return this.search(topic);
    }

    const url = `${this.baseUrl}/headlines/section/topic/${upperTopic}${setCeid(this.country, this.language)}`;
    const { feed, entries } = await feedParser(url);
    const articles = collectCoverage(entries);

    return { feed, articles };
  }

  async locationHeadlines(location = 'US'): Promise<NewsResult> {
    const url = `${this.baseUrl}/headlines/section/geo/${location}${setCeid(this.country, this.language)}`;
    const { feed, entries } = await feedParser(url);
    const articles = collectCoverage(entries);

    return { feed, articles };
  }

  async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<NewsResult> {
    if (!query) {
      throw new TypeError('Search query is required');
    }

    const { sinceWhen, afterDate, beforeDate } = options;
    let searchUrl = `${this.baseUrl}/search?q=${encodeSearchQuery(query)}`;

    if (sinceWhen) {
      searchUrl += `+when:${sinceWhen}`;
    }

    if (afterDate) {
      searchUrl += `+after:${parseDate(afterDate)}`;
    }

    if (beforeDate) {
      searchUrl += `+before:${parseDate(beforeDate)}`;
    }

    searchUrl += `&${setCeid(this.country, this.language).slice(1)}`;

    const { feed, entries } = await feedParser(searchUrl);
    const articles = collectCoverage(entries);

    return { feed, articles };
  }
}
