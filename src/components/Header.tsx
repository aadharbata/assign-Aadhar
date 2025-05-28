import React from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-primary-600 rounded-md flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-neutral-900">Web Mention Tracker</h1>
              <p className="text-sm text-neutral-500">Track mentions across the web</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center space-x-2 text-neutral-500">
              <Search className="h-5 w-5" />
              <span className="text-sm">Web scraping for brand monitoring</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;