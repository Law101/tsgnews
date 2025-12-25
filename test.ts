import { TSGNews } from './src/index.js';

async function main() {
  const news = new TSGNews();

  console.log('=== Testing TSGNews ===\n');

  // Test top stories
  console.log('1. Fetching top stories...');
  const topStories = await news.topStories();
  console.log(`   Feed: ${topStories.feed.title}`);
  console.log(`   Articles found: ${topStories.articles.length}`);
  if (topStories.articles.length > 0) {
    console.log(`   First article: ${topStories.articles[0].title}`);
  }

  // Test topic headlines
  console.log('\n2. Fetching TECHNOLOGY headlines...');
  const techNews = await news.topicHeadlines('TECHNOLOGY');
  console.log(`   Feed: ${techNews.feed.title}`);
  console.log(`   Articles found: ${techNews.articles.length}`);
  if (techNews.articles.length > 0) {
    console.log(`   First article: ${techNews.articles[0].title}`);
  }

  // Test location headlines
  console.log('\n3. Fetching US location headlines...');
  const usNews = await news.locationHeadlines('US');
  console.log(`   Feed: ${usNews.feed.title}`);
  console.log(`   Articles found: ${usNews.articles.length}`);
  if (usNews.articles.length > 0) {
    console.log(`   First article: ${usNews.articles[0].title}`);
  }

  // Test search
  console.log('\n4. Searching for "AI"...');
  const searchResults = await news.search('AI', { sinceWhen: '7d' });
  console.log(`   Feed: ${searchResults.feed.title}`);
  console.log(`   Articles found: ${searchResults.articles.length}`);
  if (searchResults.articles.length > 0) {
    console.log(`   First article: ${searchResults.articles[0].title}`);
  }

  console.log('\n=== All tests passed! ===');
}

main().catch(console.error);
