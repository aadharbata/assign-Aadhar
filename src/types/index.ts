// API Response Types
export interface HackerNewsItem {
  id: string;
  title: string;
  url: string | null;
  author: string;
  points: number;
  comments: number;
  date: string;
  type: 'story' | 'link';
  hnUrl: string;
}

export interface DailyMetrics {
  date: string;
  count: number;
  points: number;
  comments: number;
  items: HackerNewsItem[];
}

export interface HackerNewsResponse {
  query: string;
  totalMentions: number;
  totalPoints: number;
  totalComments: number;
  dailyMetrics: DailyMetrics[];
  items: HackerNewsItem[];
}

export interface WebMention {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date: string;
}

export interface WebScraperResponse {
  query: string;
  results: WebMention[];
  error?: string;
}

// Application State Types
export interface SearchState {
  query: string;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
  hackerNewsData: HackerNewsResponse | null;
  webMentionsData: WebScraperResponse | null;
}