# tsgnews

A TypeScript library for scraping Google News feeds.

## Installation

```bash
npm install tsgnews
# or
yarn add tsgnews
# or
pnpm add tsgnews
```

## Requirements

- Node.js >= 18.0.0

## Usage

```typescript
import { TSGNews } from 'tsgnews';

const news = new TSGNews();
```

### Top Stories

Fetch the top news stories from Google News.

```typescript
const result = await news.topStories();
console.log(result.articles);
```

### Topic Headlines

Fetch news articles by topic. Supported topics: `WORLD`, `NATION`, `BUSINESS`, `TECHNOLOGY`, `ENTERTAINMENT`, `SCIENCE`, `SPORTS`, `HEALTH`.

```typescript
const result = await news.topicHeadlines('TECHNOLOGY');
console.log(result.articles);
```

### Location Headlines

Fetch news articles by geographic location.

```typescript
const result = await news.locationHeadlines('US');
console.log(result.articles);
```

### Search

Search for news articles with optional date filters.

```typescript
// Basic search
const result = await news.search('artificial intelligence');

// Search with time filter
const recent = await news.search('AI', { sinceWhen: '7d' });

// Search with date range
const range = await news.search('tech', {
  afterDate: '2024-01-01',
  beforeDate: '2024-12-31'
});
```

#### Search Options

| Option | Description | Example |
|--------|-------------|---------|
| `sinceWhen` | Time offset | `'1h'`, `'2d'`, `'1w'` |
| `afterDate` | Articles after date | `'2024-01-01'` |
| `beforeDate` | Articles before date | `'2024-12-31'` |

## Configuration

You can customize the news instance with options:

```typescript
const news = new TSGNews({
  country: 'GB',    // Country code (default: 'US')
  language: 'en',   // Language code (default: 'en')
});
```

## Response Format

All methods return a `NewsResult` object:

```typescript
interface NewsResult {
  feed: {
    title?: string;
    link?: string;
    description?: string;
  };
  articles: Article[];
}

interface Article {
  url: string;
  title: string;
  publisher: string;
  publishedDate: string;
}
```

## API Reference

### `TSGNews`

#### Constructor

```typescript
new TSGNews(options?: TSGNewsOptions)
```

#### Methods

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `topStories()` | - | `Promise<NewsResult>` | Fetch top stories |
| `topicHeadlines(topic)` | `topic: string` | `Promise<NewsResult>` | Fetch headlines by topic |
| `locationHeadlines(location)` | `location: string` | `Promise<NewsResult>` | Fetch headlines by location |
| `search(query, options?)` | `query: string`, `options?: SearchOptions` | `Promise<NewsResult>` | Search news articles |

## License

MIT
