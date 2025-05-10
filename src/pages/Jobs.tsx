import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Calendar, MapPin, DollarSign, BriefcaseIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { mockJobs } from '../data/mockData';
import { format } from 'date-fns';
import { Job } from '../types';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Open' | 'Closed' | 'Draft'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleJobClick = (job: Job) => {
    setSelectedJob(selectedJob?.id === job.id ? null : job);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Jobs</h1>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus size={18} className="mr-2" />
          Create New Job
        </motion.button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </div>

              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Filter size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <React.Fragment key={job.id}>
                    <tr 
                      className={`hover:bg-gray-50 cursor-pointer ${selectedJob?.id === job.id ? 'bg-blue-50' : ''}`}
                      onClick={() => handleJobClick(job)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.type}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${job.status === 'Open' ? 'bg-green-100 text-green-800' : 
                            job.status === 'Closed' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.applicants}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(job.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {selectedJob?.id === job.id ? (
                          <ChevronDown size={18} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={18} className="text-gray-500" />
                        )}
                      </td>
                    </tr>
                    <AnimatePresence>
                      {selectedJob?.id === job.id && (
                        <motion.tr
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <td colSpan={7} className="px-6 py-4 bg-blue-50">
                            <div className="border-t border-blue-100 pt-4">
                              <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Details</h3>
                                  
                                  <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                      <BriefcaseIcon size={18} className="mr-2 text-gray-500" />
                                      <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                      <MapPin size={18} className="mr-2 text-gray-500" />
                                      <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                      <Calendar size={18} className="mr-2 text-gray-500" />
                                      <span>Posted on {format(new Date(job.createdAt), 'MMMM d, yyyy')}</span>
                                    </div>
                                    {job.salary && (
                                      <div className="flex items-center text-gray-600">
                                        <DollarSign size={18} className="mr-2 text-gray-500" />
                                        <span>
                                          ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} {job.salary.currency}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  
                                  {job.description && (
                                    <div className="mt-4">
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                                      <p className="text-sm text-gray-600">{job.description}</p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1">
                                  {job.requirements && job.requirements.length > 0 && (
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                        {job.requirements.map((req, idx) => (
                                          <li key={idx}>{req}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  
                                  <div className="mt-6 flex gap-3">
                                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                                      View Candidates
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg">
                                      Edit Job
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <BriefcaseIcon size={32} className="text-gray-300 mb-3" />
                      <p className="text-gray-500 font-medium">No jobs found</p>
                      <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Jobs;