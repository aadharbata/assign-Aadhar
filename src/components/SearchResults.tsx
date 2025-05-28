import React from 'react';
import { motion } from 'framer-motion';
import { HackerNewsResponse, WebScraperResponse } from '../types';
import Card from './ui/Card';
import HackerNewsMetrics from './HackerNewsMetrics';
import MentionsList from './MentionsList';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface SearchResultsProps {
  hackerNewsData: HackerNewsResponse;
  webMentionsData: WebScraperResponse;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  hackerNewsData,
  webMentionsData,
}) => {
  const [showDetails, setShowDetails] = React.useState(false);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item}>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
          Results for "{hackerNewsData.query}"
        </h2>
        <p className="text-neutral-600">
          Found {hackerNewsData.totalMentions} mentions on Hacker News in the last 7 days
        </p>
      </motion.div>
      
      <motion.div variants={item}>
        <Card title="Hacker News Metrics (Last 7 Days)" className="mb-6">
          <HackerNewsMetrics data={hackerNewsData} />
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card 
          title={
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-neutral-900">
                Latest Hacker News Mentions
              </h3>
              <button 
                className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? (
                  <>
                    <span>Hide Details</span>
                    <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    <span>Show Details</span>
                    <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </button>
            </div>
          }
        >
          <MentionsList 
            items={hackerNewsData.items.slice(0, showDetails ? undefined : 5)} 
            showDetails={showDetails} 
          />
          
          {!showDetails && hackerNewsData.items.length > 5 && (
            <div className="mt-4 text-center">
              <button 
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center justify-center mx-auto"
                onClick={() => setShowDetails(true)}
              >
                <span>Show all {hackerNewsData.items.length} mentions</span>
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          )}
        </Card>
      </motion.div>
      
      {webMentionsData.results.length > 0 && (
        <motion.div variants={item}>
          <Card 
            title="Web Mentions"
            footer={
              <div className="text-sm text-neutral-500">
                Data collected through web scraping - results may vary
              </div>
            }
          >
            <div className="space-y-4">
              {webMentionsData.results.map((mention, index) => (
                <div key={index} className="border-b border-neutral-200 pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium text-neutral-900 mb-1">
                    <a 
                      href={mention.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary-600 flex items-center"
                    >
                      {mention.title}
                      <ExternalLink size={14} className="ml-1 inline" />
                    </a>
                  </h4>
                  <p className="text-sm text-neutral-600 mb-2">{mention.snippet}</p>
                  <p className="text-xs text-neutral-500">{mention.url}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchResults;