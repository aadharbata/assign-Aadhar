import axios from 'axios';
import { subDays, format } from 'date-fns';

// HN Search API endpoint
const HN_SEARCH_API = 'https://hn.algolia.com/api/v1/search';

/**
 * Search Hacker News for mentions of a query within the last 7 days
 * @param {string} query - The search query (company or person name)
 * @returns {Promise<Object>} - Results and metrics
 */
export async function searchHackerNews(query) {
  try {
    // Calculate date 7 days ago
    const sevenDaysAgo = subDays(new Date(), 7);
    const formattedDate = format(sevenDaysAgo, 'yyyy-MM-dd');
    
    // Search HN for posts containing the query and created after the date
    const response = await axios.get(HN_SEARCH_API, {
      params: {
        query,
        numericFilters: `created_at_i>${Math.floor(sevenDaysAgo.getTime() / 1000)}`,
        hitsPerPage: 1000
      }
    });
    
    const hits = response.data.hits || [];
    
    // Group results by day
    const dailyMentions = hits.reduce((acc, hit) => {
      const date = format(new Date(hit.created_at), 'yyyy-MM-dd');
      
      if (!acc[date]) {
        acc[date] = {
          date,
          count: 0,
          points: 0,
          comments: 0,
          items: []
        };
      }
      
      acc[date].count += 1;
      acc[date].points += hit.points || 0;
      acc[date].comments += hit.num_comments || 0;
      acc[date].items.push({
        id: hit.objectID,
        title: hit.title,
        url: hit.url,
        author: hit.author,
        points: hit.points,
        comments: hit.num_comments,
        date: hit.created_at,
        type: hit.story_text ? 'story' : 'link',
        hnUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`
      });
      
      return acc;
    }, {});
    
    // Ensure we have entries for all 7 days even if no mentions
    const allDays = [];
    for (let i = 0; i < 7; i++) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      if (!dailyMentions[date]) {
        dailyMentions[date] = {
          date,
          count: 0,
          points: 0,
          comments: 0,
          items: []
        };
      }
      allDays.push(dailyMentions[date]);
    }
    
    // Sort by date
    allDays.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Calculate totals
    const totalMentions = hits.length;
    const totalPoints = hits.reduce((sum, hit) => sum + (hit.points || 0), 0);
    const totalComments = hits.reduce((sum, hit) => sum + (hit.num_comments || 0), 0);
    
    return {
      query,
      totalMentions,
      totalPoints,
      totalComments,
      dailyMetrics: allDays,
      items: hits.map(hit => ({
        id: hit.objectID,
        title: hit.title,
        url: hit.url,
        author: hit.author,
        points: hit.points,
        comments: hit.num_comments,
        date: hit.created_at,
        type: hit.story_text ? 'story' : 'link',
        hnUrl: `https://news.ycombinator.com/item?id=${hit.objectID}`
      }))
    };
  } catch (error) {
    console.error('Error searching Hacker News:', error);
    throw error;
  }
}