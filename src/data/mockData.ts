import { Job, Candidate, TimelineData, ConversionRate, SourceData, CandidateStage } from '../types';
import { subDays, format } from 'date-fns';

// Helper functions for date generation
const generatePastDate = (daysAgo: number) => {
  return format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Mock Jobs Data
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'New York, NY (Remote)',
    type: 'Full-time',
    status: 'Open',
    applicants: 24,
    createdAt: generatePastDate(15),
    updatedAt: generatePastDate(2),
    salary: {
      min: 120000,
      max: 150000,
      currency: 'USD',
    },
    description: 'We are looking for an experienced frontend developer with React expertise to join our product team.',
    requirements: [
      'At least 5 years of professional experience with React',
      'Experience with TypeScript and modern frontend tooling',
      'Experience with responsive design and accessibility',
      'Good communication skills'
    ]
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Open',
    applicants: 18,
    createdAt: generatePastDate(10),
    updatedAt: generatePastDate(1),
    salary: {
      min: 130000,
      max: 170000,
      currency: 'USD',
    }
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    status: 'Open',
    applicants: 12,
    createdAt: generatePastDate(20),
    updatedAt: generatePastDate(5),
    salary: {
      min: 90000,
      max: 120000,
      currency: 'USD',
    }
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Austin, TX',
    type: 'Full-time',
    status: 'Open',
    applicants: 9,
    createdAt: generatePastDate(25),
    updatedAt: generatePastDate(3),
  },
  {
    id: '5',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago, IL (Hybrid)',
    type: 'Full-time',
    status: 'Open',
    applicants: 15,
    createdAt: generatePastDate(18),
    updatedAt: generatePastDate(2),
  },
  {
    id: '6',
    title: 'Data Scientist',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    status: 'Closed',
    applicants: 22,
    createdAt: generatePastDate(60),
    updatedAt: generatePastDate(30),
  },
  {
    id: '7',
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Denver, CO',
    type: 'Full-time',
    status: 'Open',
    applicants: 11,
    createdAt: generatePastDate(12),
    updatedAt: generatePastDate(1),
  }
];

// Generate candidate names for mock data
const candidateNames = [
  'Alex Johnson',
  'Taylor Smith',
  'Jordan Williams',
  'Casey Brown',
  'Morgan Davis',
  'Riley Wilson',
  'Jamie Miller',
  'Avery Moore',
  'Drew Jones',
  'Quinn Anderson',
  'Cameron Martinez',
  'Reese Clark',
  'Harper Lewis',
  'Blake Lee',
  'Skyler Wright',
  'Dakota Harris',
  'Jordan Taylor',
  'Parker Young',
  'Robin Allen',
  'Charlie King'
];

// Mock Candidates Data
export const generateMockCandidates = (): Candidate[] => {
  const candidates: Candidate[] = [];
  const stages: CandidateStage[] = ['Applied', 'Screening', 'Interview', 'Technical', 'Reference', 'Offer', 'Hired', 'Rejected'];
  const sources = ['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'Job Fair', 'Glassdoor'];
  
  mockJobs.forEach(job => {
    // Generate between 1 and 5 candidates for each job
    const candidateCount = getRandomInt(1, 5);
    
    for (let i = 0; i < candidateCount; i++) {
      const nameIndex = getRandomInt(0, candidateNames.length - 1);
      const name = candidateNames[nameIndex];
      const email = name.toLowerCase().replace(' ', '.') + '@example.com';
      const stage = stages[getRandomInt(0, stages.length - 1)];
      const daysAgo = getRandomInt(1, 30);
      const updatedDaysAgo = getRandomInt(0, daysAgo - 1);
      const rating = getRandomInt(1, 5);
      const source = sources[getRandomInt(0, sources.length - 1)];
      
      candidates.push({
        id: `${job.id}-${i}`,
        name,
        email,
        jobId: job.id,
        jobTitle: job.title,
        stage,
        appliedAt: generatePastDate(daysAgo),
        updatedAt: generatePastDate(updatedDaysAgo),
        rating,
        location: job.location,
        source,
        avatar: `https://i.pravatar.cc/150?img=${getRandomInt(1, 70)}`,
      });
    }
  });
  
  return candidates;
};

export const mockCandidates = generateMockCandidates();

// Mock Analytics Data
export const mockTimelineData: TimelineData[] = [
  {
    date: generatePastDate(30),
    applied: 12,
    interviewed: 8,
    offered: 3,
    hired: 2
  },
  {
    date: generatePastDate(25),
    applied: 15,
    interviewed: 10,
    offered: 4,
    hired: 3
  },
  {
    date: generatePastDate(20),
    applied: 18,
    interviewed: 12,
    offered: 5,
    hired: 4
  },
  {
    date: generatePastDate(15),
    applied: 22,
    interviewed: 15,
    offered: 6,
    hired: 5
  },
  {
    date: generatePastDate(10),
    applied: 20,
    interviewed: 13,
    offered: 5,
    hired: 4
  },
  {
    date: generatePastDate(5),
    applied: 25,
    interviewed: 18,
    offered: 7,
    hired: 6
  },
  {
    date: generatePastDate(0),
    applied: 30,
    interviewed: 20,
    offered: 8,
    hired: 7
  }
];

export const mockConversionRates: ConversionRate[] = [
  {
    stage: 'Applied to Screening',
    rate: 68,
    previousRate: 65
  },
  {
    stage: 'Screening to Interview',
    rate: 52,
    previousRate: 48
  },
  {
    stage: 'Interview to Technical',
    rate: 45,
    previousRate: 42
  },
  {
    stage: 'Technical to Offer',
    rate: 38,
    previousRate: 40
  },
  {
    stage: 'Offer to Hire',
    rate: 80,
    previousRate: 75
  }
];

export const mockSourceData: SourceData[] = [
  {
    source: 'LinkedIn',
    count: 42,
    percentage: 42
  },
  {
    source: 'Indeed',
    count: 25,
    percentage: 25
  },
  {
    source: 'Company Website',
    count: 15,
    percentage: 15
  },
  {
    source: 'Referral',
    count: 10,
    percentage: 10
  },
  {
    source: 'Job Fair',
    count: 5,
    percentage: 5
  },
  {
    source: 'Other',
    count: 3,
    percentage: 3
  }
];

// Mock Chatbot initial messages
export const initialChatMessages = [
  {
    id: '1',
    role: 'assistant' as const,
    content: "Hello! I'm your AI recruiting assistant. I can help you find information about jobs, candidates, or provide insights about your hiring pipeline. How can I assist you today?",
    timestamp: new Date().toISOString(),
  }
];