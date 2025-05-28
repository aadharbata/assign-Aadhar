import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyState: React.FC = () => {
  return (
    <motion.div 
      className="text-center py-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mx-auto h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4"
        whileHover={{ scale: 1.05 }}
      >
        <Search size={32} />
      </motion.div>
      
      <h2 className="text-2xl font-bold text-neutral-900 mb-2">
        Track web mentions
      </h2>
      
      <p className="text-neutral-600 max-w-md mx-auto mb-6">
        Enter a company or person name to find mentions across the web and view Hacker News metrics for the last 7 days.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
          <div className="font-medium text-neutral-900 mb-1">1. Enter a search term</div>
          <div className="text-sm text-neutral-600">Type a company or person name in the search box</div>
        </div>
        
        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
          <div className="font-medium text-neutral-900 mb-1">2. Trigger the search</div>
          <div className="text-sm text-neutral-600">We'll scan the web and Hacker News for mentions</div>
        </div>
        
        <div className="bg-white p-4 border border-neutral-200 rounded-lg">
          <div className="font-medium text-neutral-900 mb-1">3. View the results</div>
          <div className="text-sm text-neutral-600">See metrics and detailed mention data</div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyState;