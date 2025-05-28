import axios from 'axios';
import { HackerNewsResponse, WebScraperResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Search Hacker News for mentions
 * @param query - The search query (company or person name)
 */
export const searchHackerNews = async (query: string): Promise<HackerNewsResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search/hackernews`, { query });
    return response.data;
  } catch (error) {
    console.error('Error searching Hacker News:', error);
    throw error;
  }
};

/**
 * Scrape the web for mentions
 * @param query - The search query (company or person name)
 * @param limit - Maximum number of results to return
 */
export const scrapeWebForMentions = async (query: string, limit = 10): Promise<WebScraperResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search/web`, { query, limit });
    return response.data;
  } catch (error) {
    console.error('Error scraping web:', error);
    throw error;
  }
};

/**
 * Mock API for development without backend
 */
export const mockSearchHackerNews = async (query: string): Promise<HackerNewsResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate random data for the last 7 days
  const dailyMetrics = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    
    const count = Math.floor(Math.random() * 10);
    const points = Math.floor(Math.random() * 100 * count);
    const comments = Math.floor(Math.random() * 50 * count);
    
    const items = Array.from({ length: count }).map((_, j) => ({
      id: `${dateString}-${j}`,
      title: `${query} mentioned in a ${Math.random() > 0.5 ? 'story' : 'project'} #${j+1}`,
      url: Math.random() > 0.3 ? `https://example.com/${dateString}/${j}` : null,
      author: `user${Math.floor(Math.random() * 1000)}`,
      points: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      date: new Date(date).toISOString(),
      type: Math.random() > 0.5 ? 'story' : 'link',
      hnUrl: `https://news.ycombinator.com/item?id=${dateString}-${j}`
    }));
    
    return {
      date: dateString,
      count,
      points,
      comments,
      items
    };
  });
  
  // Sort by date
  dailyMetrics.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Flatten items
  const allItems = dailyMetrics.flatMap(day => day.items);
  
  return {
    query,
    totalMentions: allItems.length,
    totalPoints: allItems.reduce((sum, item) => sum + item.points, 0),
    totalComments: allItems.reduce((sum, item) => sum + item.comments, 0),
    dailyMetrics,
    items: allItems
  };
};

export const mockScrapeWebForMentions = async (query: string): Promise<WebScraperResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate random results
  const results = Array.from({ length: 10 }).map((_, i) => ({
    title: `${query} mentioned on Website #${i+1}`,
    url: `https://example${i}.com/article-about-${query.toLowerCase().replace(/\s+/g, '-')}`,
    snippet: `This is a snippet about ${query} that appears on a website. It contains some information about the entity that was searched for.`,
    source: 'web',
    date: new Date().toISOString()
  }));
  
  return {
    query,
    results
  };
};