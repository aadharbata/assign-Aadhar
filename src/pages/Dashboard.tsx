import { motion } from 'framer-motion';
import { ChevronUp, Users, Briefcase, Clock, CheckCircle } from 'lucide-react';
import { mockJobs, mockCandidates, mockTimelineData } from '../data/mockData';
import { format } from 'date-fns';
import AreaChart from '../components/insights/AreaChart';

const Dashboard = () => {
  // Calculate statistics
  const openJobs = mockJobs.filter(job => job.status === 'Open').length;
  const totalCandidates = mockCandidates.length;
  const activeInterviews = mockCandidates.filter(candidate => 
    ['Interview', 'Technical'].includes(candidate.stage)
  ).length;
  const hired = mockCandidates.filter(candidate => candidate.stage === 'Hired').length;

  // Recent activity
  const recentCandidates = [...mockCandidates]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

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
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-500">Last updated:</span>
          <span className="font-medium text-gray-800">{format(new Date(), 'PPpp')}</span>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item}>
          <StatsCard 
            title="Open Positions"
            value={openJobs}
            icon={<Briefcase className="text-blue-500" />}
            change={2}
            changeLabel="from last week"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Total Candidates"
            value={totalCandidates}
            icon={<Users className="text-green-500" />}
            change={12}
            changeLabel="from last week"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Active Interviews"
            value={activeInterviews}
            icon={<Clock className="text-amber-500" />}
            change={-3}
            changeLabel="from last week"
          />
        </motion.div>
        <motion.div variants={item}>
          <StatsCard 
            title="Hired This Month"
            value={hired}
            icon={<CheckCircle className="text-indigo-500" />}
            change={1}
            changeLabel="from last month"
          />
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recruitment Activity</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">Monthly</button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">Quarterly</button>
              </div>
            </div>
            <div className="h-64">
              <AreaChart data={mockTimelineData} />
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 h-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">View all</a>
            </div>
            
            <div className="space-y-4">
              {recentCandidates.map((candidate) => (
                <div key={candidate.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    {candidate.avatar ? (
                      <img src={candidate.avatar} alt={candidate.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                        {candidate.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{candidate.name}</p>
                    <p className="text-xs text-gray-500 truncate">{candidate.jobTitle}</p>
                    <div className="mt-1 flex items-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        candidate.stage === 'Hired' ? 'bg-green-100 text-green-800' :
                        candidate.stage === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {candidate.stage}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {format(new Date(candidate.updatedAt), 'MMM d')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: number;
  changeLabel: string;
}

const StatsCard = ({ title, value, icon, change, changeLabel }: StatsCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className="p-3 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <div className={`flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        <ChevronUp className={`h-4 w-4 ${change < 0 ? 'rotate-180' : ''}`} />
        <span className="text-sm font-medium">{Math.abs(change)}%</span>
      </div>
      <span className="ml-2 text-xs text-gray-500">{changeLabel}</span>
    </div>
  </div>
);

export default Dashboard;