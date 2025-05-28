import axios from 'axios';
import cheerio from 'cheerio';

/**
 * Scrape the web for mentions of a query
 * @param {string} query - The search query (company or person name)
 * @param {number} limit - Maximum number of results to return
 * @returns {Promise<Array>} - Array of mention objects
 */
export async function scrapeWebForMentions(query, limit = 10) {
  try {
    // Use a search engine API to find mentions
    // Note: In a production app, you would use a proper API with authentication
    // This is a simplified example using Google search results
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    const $ = cheerio.load(response.data);
    const results = [];
    
    // Extract search results (simplified - this would be more robust in production)
    $('div.g').slice(0, limit).each((i, el) => {
      const titleEl = $(el).find('h3');
      const linkEl = $(el).find('a');
      const snippetEl = $(el).find('div.VwiC3b');
      
      if (titleEl.length && linkEl.length) {
        const title = titleEl.text();
        const url = new URL(linkEl.attr('href'), searchUrl).href;
        const snippet = snippetEl.text();
        
        results.push({
          title,
          url,
          snippet,
          source: 'web',
          date: new Date().toISOString() // We don't have actual dates from search results
        });
      }
    });
    
    return {
      query,
      results
    };
  } catch (error) {
    console.error('Error scraping web:', error);
    // Return empty results on error instead of failing completely
    return {
      query,
      results: [],
      error: error.message
    };
  }
}