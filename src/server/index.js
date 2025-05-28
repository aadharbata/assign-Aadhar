import express from 'express';
import cors from 'cors';
import { searchHackerNews } from './hackerNewsAPI.js';
import { scrapeWebForMentions } from './webScraper.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Search Hacker News for mentions
app.post('/api/search/hackernews', async (req, res) => {
  try {
    const { query } = req.body;
    const results = await searchHackerNews(query);
    res.json(results);
  } catch (error) {
    console.error('Error searching Hacker News:', error);
    res.status(500).json({ error: 'Failed to search Hacker News' });
  }
});

// Scrape the web for mentions
app.post('/api/search/web', async (req, res) => {
  try {
    const { query, limit = 10 } = req.body;
    const results = await scrapeWebForMentions(query, limit);
    res.json(results);
  } catch (error) {
    console.error('Error scraping web:', error);
    res.status(500).json({ error: 'Failed to scrape web for mentions' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});