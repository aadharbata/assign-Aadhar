import React from 'react';
import { HackerNewsResponse } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format, parseISO } from 'date-fns';
import Badge from './ui/Badge';

interface HackerNewsMetricsProps {
  data: HackerNewsResponse;
}

const HackerNewsMetrics: React.FC<HackerNewsMetricsProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.dailyMetrics.map(day => ({
    date: format(parseISO(day.date), 'MMM dd'),
    mentions: day.count,
    points: day.points,
    comments: day.comments
  }));

  return (
    <div>
      {/* Summary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-500 mb-1">Total Mentions</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-neutral-900">{data.totalMentions}</span>
            <Badge variant="primary" className="ml-2">HN</Badge>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-500 mb-1">Total Points</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-neutral-900">{data.totalPoints}</span>
            <Badge variant="secondary" className="ml-2">Upvotes</Badge>
          </div>
        </div>
        
        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-500 mb-1">Total Comments</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-neutral-900">{data.totalComments}</span>
            <Badge variant="success" className="ml-2">Engagement</Badge>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" orientation="left" stroke="#3B82F6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '0.375rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                border: '1px solid #E5E7EB'
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="mentions" name="Mentions" fill="#3B82F6" />
            <Bar yAxisId="right" dataKey="comments" name="Comments" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HackerNewsMetrics;