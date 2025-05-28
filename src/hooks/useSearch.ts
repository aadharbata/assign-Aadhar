import { useState } from 'react';
import { SearchState, HackerNewsResponse, WebScraperResponse } from '../types';
import { 
  mockSearchHackerNews, 
  mockScrapeWebForMentions 
} from '../services/api';

// Initial state
const initialState: SearchState = {
  query: '',
  isLoading: false,
  hasSearched: false,
  error: null,
  hackerNewsData: null,
  webMentionsData: null,
};

/**
 * Custom hook for search functionality
 */
export const useSearch = () => {
  const [state, setState] = useState<SearchState>(initialState);

  /**
   * Update search query
   */
  const setQuery = (query: string) => {
    setState(prevState => ({
      ...prevState,
      query
    }));
  };

  /**
   * Reset search state
   */
  const resetSearch = () => {
    setState(initialState);
  };

  /**
   * Execute search
   */
  const executeSearch = async () => {
    if (!state.query.trim()) {
      setState(prevState => ({
        ...prevState,
        error: 'Please enter a search query'
      }));
      return;
    }

    setState(prevState => ({
      ...prevState,
      isLoading: true,
      error: null
    }));

    try {
      // Execute searches in parallel
      const [hackerNewsData, webMentionsData] = await Promise.all([
        mockSearchHackerNews(state.query),
        mockScrapeWebForMentions(state.query)
      ]);

      setState(prevState => ({
        ...prevState,
        isLoading: false,
        hasSearched: true,
        hackerNewsData,
        webMentionsData
      }));
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }));
    }
  };

  return {
    state,
    setQuery,
    executeSearch,
    resetSearch
  };
};