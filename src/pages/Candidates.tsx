import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Users, ChevronDown, ArrowLeft, ArrowRight, Star, PlusSquare, PhoneCall, Mail, Calendar, FileText, Award } from 'lucide-react';
import { mockCandidates } from '../data/mockData';
import { Candidate, CandidateStage } from '../types';
import { format } from 'date-fns';

const stageOrder: CandidateStage[] = [
  'Applied', 
  'Screening', 
  'Interview', 
  'Technical', 
  'Reference', 
  'Offer', 
  'Hired', 
  'Rejected'
];

const stageBgColors: Record<CandidateStage, string> = {
  'Applied': 'bg-gray-100',
  'Screening': 'bg-blue-100',
  'Interview': 'bg-purple-100',
  'Technical': 'bg-indigo-100',
  'Reference': 'bg-teal-100',
  'Offer': 'bg-amber-100',
  'Hired': 'bg-green-100',
  'Rejected': 'bg-red-100'
};

const stageTextColors: Record<CandidateStage, string> = {
  'Applied': 'text-gray-800',
  'Screening': 'text-blue-800',
  'Interview': 'text-purple-800',
  'Technical': 'text-indigo-800',
  'Reference': 'text-teal-800',
  'Offer': 'text-amber-800',
  'Hired': 'text-green-800',
  'Rejected': 'text-red-800'
};

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<CandidateStage | 'All'>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [view, setView] = useState<'list' | 'kanban'>('list');

  const filteredCandidates = mockCandidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          candidate.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStage = selectedStage === 'All' || candidate.stage === selectedStage;
    
    return matchesSearch && matchesStage;
  });

  const candidatesByStage = stageOrder.reduce((acc, stage) => {
    acc[stage] = filteredCandidates.filter(c => c.stage === stage);
    return acc;
  }, {} as Record<CandidateStage, Candidate[]>);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleBackClick = () => {
    setSelectedCandidate(null);
  };

  if (selectedCandidate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <button 
            onClick={handleBackClick}
            className="text-gray-600 hover:text-gray-800 mr-3"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Candidate Details</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  {selectedCandidate.avatar ? (
                    <img 
                      src={selectedCandidate.avatar} 
                      alt={selectedCandidate.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {selectedCandidate.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{selectedCandidate.name}</h2>
                  <p className="text-gray-600">Applying for {selectedCandidate.jobTitle}</p>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stageBgColors[selectedCandidate.stage]} ${stageTextColors[selectedCandidate.stage]}`}>
                      {selectedCandidate.stage}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-auto flex flex-wrap gap-2">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Mail size={16} className="mr-2" />
                  Email
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <PhoneCall size={16} className="mr-2" />
                  Call
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <Calendar size={16} className="mr-2" />
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Candidate Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{selectedCandidate.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1">{selectedCandidate.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="mt-1">{selectedCandidate.location || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Source</p>
                      <p className="mt-1">{selectedCandidate.source || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Application Timeline</h3>
                  <div className="relative">
                    <div className="absolute top-0 left-4 h-full w-0.5 bg-gray-200"></div>
                    <ul className="space-y-6 relative">
                      {stageOrder.slice(0, stageOrder.indexOf(selectedCandidate.stage) + 1).map((stage, idx) => (
                        <li key={stage} className="flex items-start">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-4 z-10 ${
                            stage === selectedCandidate.stage ? stageBgColors[stage] : 'bg-green-100'
                          }`}>
                            {stage === selectedCandidate.stage ? (
                              <div className={`h-3 w-3 rounded-full ${stage === 'Rejected' ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                            ) : (
                              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{stage}</p>
                            <p className="text-sm text-gray-500">
                              {stage === selectedCandidate.stage 
                                ? `Current stage since ${format(new Date(selectedCandidate.updatedAt), 'MMMM d, yyyy')}`
                                : idx === 0 
                                  ? `Applied on ${format(new Date(selectedCandidate.appliedAt), 'MMMM d, yyyy')}`
                                  : `Completed on ${format(new Date(selectedCandidate.updatedAt), 'MMMM d, yyyy')}`
                              }
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Notes</h3>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">
                      {selectedCandidate.notes || 'No notes available for this candidate.'}
                    </p>
                    <div className="mt-4">
                      <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
                        <PlusSquare size={16} className="mr-2" />
                        Add Note
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Rating</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={24}
                          className={idx < (selectedCandidate.rating || 0) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                          }
                        />
                      ))}
                      <span className="ml-2 text-lg font-medium text-gray-800">
                        {selectedCandidate.rating || 'Not rated'}
                      </span>
                    </div>
                    <button className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700">
                      Update Rating
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Documents</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center p-3 border border-gray-200 rounded-lg bg-white">
                      <FileText size={20} className="text-blue-500 mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">Resume</p>
                        <p className="text-xs text-gray-500">Added on {format(new Date(selectedCandidate.appliedAt), 'MMM d, yyyy')}</p>
                      </div>
                      <button className="ml-auto text-blue-600 hover:text-blue-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                    <button className="mt-3 w-full flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <PlusSquare size={16} className="mr-2" />
                      Upload Document
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-3">Skills & Qualifications</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        React
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        TypeScript
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        GraphQL
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Node.js
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <Award size={16} className="inline-block mr-1 text-gray-500" />
                        <span>Bachelor's Degree in Computer Science</span>
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        <Award size={16} className="inline-block mr-1 text-gray-500" />
                        <span>5+ years of experience</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Candidates</h1>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setView('list')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              view === 'list' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List
          </button>
          <button 
            onClick={() => setView('kanban')} 
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              view === 'kanban' 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Kanban
          </button>
        </div>
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
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value as any)}
                  className="appearance-none block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Stages</option>
                  {stageOrder.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
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

        {view === 'list' ? (
          <div className="overflow-x-auto">
            {filteredCandidates.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCandidates.map((candidate) => (
                    <tr 
                      key={candidate.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleCandidateClick(candidate)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            {candidate.avatar ? (
                              <img 
                                src={candidate.avatar} 
                                alt={candidate.name} 
                                className="h-full w-full object-cover" 
                              />
                            ) : (
                              <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                {candidate.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500">{candidate.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{candidate.jobTitle}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stageBgColors[candidate.stage]} ${stageTextColors[candidate.stage]}`}>
                          {candidate.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(candidate.appliedAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {candidate.source || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {candidate.rating ? (
                            <>
                              {Array.from({ length: 5 }).map((_, idx) => (
                                <Star
                                  key={idx}
                                  size={16}
                                  className={idx < candidate.rating! 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                  }
                                />
                              ))}
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">Not rated</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">
                          <ArrowRight size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center">
                <Users className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No candidates found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 overflow-x-auto">
            <div className="inline-flex gap-4 min-w-full pb-4">
              {stageOrder.map((stage) => (
                <div 
                  key={stage}
                  className="flex-shrink-0 w-72 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-2 px-3">
                    <h3 className="font-medium text-gray-800">{stage}</h3>
                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {candidatesByStage[stage]?.length || 0}
                    </span>
                  </div>
                  
                  <div className={`rounded-lg ${stageBgColors[stage]}25 p-2 h-full min-h-[300px] overflow-hidden flex flex-col`}>
                    <div className="space-y-2 flex-1 overflow-y-auto">
                      {candidatesByStage[stage]?.length ? (
                        candidatesByStage[stage].map((candidate) => (
                          <motion.div
                            key={candidate.id}
                            layoutId={candidate.id}
                            onClick={() => handleCandidateClick(candidate)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white rounded-lg shadow-sm p-3 cursor-pointer"
                          >
                            <div className="flex items-start">
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                {candidate.avatar ? (
                                  <img 
                                    src={candidate.avatar} 
                                    alt={candidate.name} 
                                    className="h-full w-full object-cover" 
                                  />
                                ) : (
                                  <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                    {candidate.name.charAt(0)}
                                  </div>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900 truncate">{candidate.name}</p>
                                <p className="text-xs text-gray-500 truncate">{candidate.jobTitle}</p>
                                
                                <div className="mt-2 flex justify-between items-center">
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(candidate.appliedAt), 'MMM d')}
                                  </span>
                                  
                                  {candidate.rating && (
                                    <div className="flex">
                                      <Star size={12} className="text-yellow-400 fill-current" />
                                      <span className="text-xs font-medium ml-1">{candidate.rating}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center text-sm text-gray-500 italic">
                          No candidates
                        </div>
                      )}
                    </div>
                    
                    <button className="mt-2 w-full flex justify-center items-center px-3 py-1.5 border border-gray-200 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <PlusSquare size={14} className="mr-1" />
                      Add Candidate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;