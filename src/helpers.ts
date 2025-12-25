import Parser from 'rss-parser';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import type { Article } from './types.js';

dayjs.extend(customParseFormat);

const parser = new Parser();

export function setCeid(country = 'US', language = 'en'): string {
  return `?ceid=${country}:${language}&hl=${language}&gl=${country}`;
}

export async function feedParser(feedUrl: string): Promise<{
  feed: { title?: string; link?: string; description?: string };
  entries: Parser.Item[];
}> {
  try {
    const feed = await parser.parseURL(feedUrl);

    if (feed.link?.includes('unsupported')) {
      throw new Error('Feed is not available');
    }

    return {
      feed: {
        title: feed.title,
        link: feed.link,
        description: feed.description,
      },
      entries: feed.items,
    };
  } catch (error) {
    throw new Error(
      `Failed to parse feed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function parseArticles(entry: Parser.Item): Article[] {
  const articles: Article[] = [];
  const content = entry.content || entry.contentSnippet || '';

  if (!content) {
    if (entry.link && entry.title) {
      articles.push({
        url: entry.link,
        title: entry.title,
        publisher: entry.creator || 'Unknown',
        publishedDate: entry.pubDate || '',
      });
    }
    return articles;
  }

  const $ = cheerio.load(content);
  const links = $('a');

  if (links.length === 0) {
    if (entry.link && entry.title) {
      articles.push({
        url: entry.link,
        title: entry.title,
        publisher: entry.creator || 'Unknown',
        publishedDate: entry.pubDate || '',
      });
    }
    return articles;
  }

  links.each((_, element) => {
    const $el = $(element);
    const url = $el.attr('href');
    const title = $el.text().trim();

    if (url && title) {
      const fontTag = $el.next('font');
      const publisher = fontTag.length > 0 ? fontTag.text().trim() : 'Unknown';

      articles.push({
        url,
        title,
        publisher,
        publishedDate: entry.pubDate || '',
      });
    }
  });

  return articles;
}

export function collectCoverage(entries: Parser.Item[]): Article[] {
  const allArticles: Article[] = [];

  for (const entry of entries) {
    const articles = parseArticles(entry);
    allArticles.push(...articles);
  }

  return allArticles;
}

export function encodeSearchQuery(query: string): string {
  return encodeURIComponent(query).replace(/%20/g, '+');
}

export function parseDate(date: string): string {
  const parsed = dayjs(date);

  if (!parsed.isValid()) {
    throw new Error(`Unable to parse date: ${date}`);
  }

  return parsed.format('YYYY-MM-DD');
}
