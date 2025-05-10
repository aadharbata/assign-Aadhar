import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, ArrowDown, Calendar, BarChart, PieChart, TrendingUp } from 'lucide-react';
import { mockTimelineData, mockConversionRates, mockSourceData } from '../data/mockData';
import { format, subDays } from 'date-fns';
import AreaChart from '../components/insights/AreaChart';

const Insights = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Filter data based on time range
  const filteredTimelineData = timeRange === '7d' 
    ? mockTimelineData.slice(-7) 
    : timeRange === '30d'
      ? mockTimelineData
      : mockTimelineData;

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
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Insights</h1>
        
        <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-1.5 text-sm font-medium rounded ${
              timeRange === '7d' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            7d
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-1.5 text-sm font-medium rounded ${
              timeRange === '30d' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            30d
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-4 py-1.5 text-sm font-medium rounded ${
              timeRange === '90d' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            90d
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <SummaryCard
            title="Total Applicants"
            value={164}
            change={12}
            icon={<TrendingUp className="text-blue-500" size={20} />}
            positive
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Avg. Time to Hire"
            value="18 days"
            change={-3}
            icon={<Calendar className="text-purple-500" size={20} />}
            positive
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Offer Acceptance"
            value="87%"
            change={5}
            icon={<BarChart className="text-teal-500" size={20} />}
            positive
          />
        </motion.div>
        <motion.div variants={item}>
          <SummaryCard
            title="Cost per Hire"
            value="$3,240"
            change={2}
            icon={<PieChart className="text-amber-500" size={20} />}
            positive={false}
          />
        </motion.div>
      </motion.div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recruitment Activity</h2>
              <div className="text-sm text-gray-500">
                {format(subDays(new Date(), timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90), 'MMM d')} - {format(new Date(), 'MMM d, yyyy')}
              </div>
            </div>
            <div className="h-64">
              <AreaChart data={filteredTimelineData} />
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 h-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Pipeline Conversion</h2>
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                View Details
              </button>
            </div>
            <div className="space-y-4">
              {mockConversionRates.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.stage}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-semibold">{item.rate}%</span>
                      {item.previousRate && (
                        <div className={`ml-2 flex items-center text-xs ${
                          item.rate > item.previousRate ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.rate > item.previousRate ? (
                            <ArrowUp size={12} className="mr-0.5" />
                          ) : (
                            <ArrowDown size={12} className="mr-0.5" />
                          )}
                          {Math.abs(item.rate - item.previousRate)}%
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.rate}%` }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        index === 2 ? 'bg-teal-500' : 
                        index === 3 ? 'bg-amber-500' : 
                        'bg-green-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Candidate Sources</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
              View Details
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {mockSourceData.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.source}</span>
                    <span className="text-sm font-semibold">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-purple-500' : 
                        index === 2 ? 'bg-teal-500' : 
                        index === 3 ? 'bg-amber-500' : 
                        index === 4 ? 'bg-green-500' : 
                        'bg-gray-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full max-w-[180px]">
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6" />
                      <stop offset="100%" stopColor="#2dd4bf" />
                    </linearGradient>
                    <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                    <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="gradient6" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6b7280" />
                      <stop offset="100%" stopColor="#9ca3af" />
                    </linearGradient>
                  </defs>
                  
                  {/* LinkedIn (42%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient1)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="0" 
                    strokeLinecap="round"
                  />
                  
                  {/* Indeed (25%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient2)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="291.392" 
                    strokeLinecap="round"
                  />
                  
                  {/* Company Website (15%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient3)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="417.192" 
                    strokeLinecap="round"
                  />
                  
                  {/* Referral (10%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient4)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="467.08" 
                    strokeLinecap="round"
                  />
                  
                  {/* Job Fair (5%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient5)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="491.6" 
                    strokeLinecap="round"
                  />
                  
                  {/* Other (3%) */}
                  <motion.circle 
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    cx="100" 
                    cy="100" 
                    r="80" 
                    fill="none" 
                    stroke="url(#gradient6)" 
                    strokeWidth="30" 
                    strokeDasharray="502.4" 
                    strokeDashoffset="502.4" 
                    strokeLinecap="round"
                  />
                  
                  <circle cx="100" cy="100" r="50" fill="white" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Top Performing Jobs</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="mr-4 p-3 bg-blue-100 rounded-md">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Senior Frontend Developer</h3>
                <p className="text-sm text-gray-600">24 candidates · 4 in final round</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-lg font-semibold text-gray-800">78%</p>
                <p className="text-xs text-green-600">+12% vs avg</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="mr-4 p-3 bg-purple-100 rounded-md">
                <Briefcase className="text-purple-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Product Manager</h3>
                <p className="text-sm text-gray-600">18 candidates · 3 in final round</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-lg font-semibold text-gray-800">65%</p>
                <p className="text-xs text-red-600">-1% vs avg</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="mr-4 p-3 bg-teal-100 rounded-md">
                <Briefcase className="text-teal-600" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">UX Designer</h3>
                <p className="text-sm text-gray-600">12 candidates · 2 in final round</p>
              </div>
              <div className="ml-4 text-right">
                <p className="text-lg font-semibold text-gray-800">70%</p>
                <p className="text-xs text-green-600">+4% vs avg</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  positive: boolean;
}

const SummaryCard = ({ title, value, change, icon, positive }: SummaryCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <div className={`flex items-center ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? (
          <ArrowUp className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDown className="h-4 w-4 mr-1" />
        )}
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
      <span className="ml-2 text-xs text-gray-500">vs previous period</span>
    </div>
  </div>
);

const Briefcase = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default Insights;