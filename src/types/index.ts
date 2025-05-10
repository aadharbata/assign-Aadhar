// Job related types
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  status: 'Open' | 'Closed' | 'Draft';
  applicants: number;
  createdAt: string;
  updatedAt: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description?: string;
  requirements?: string[];
}

// Candidate related types
export type CandidateStage = 
  | 'Applied' 
  | 'Screening' 
  | 'Interview' 
  | 'Technical' 
  | 'Reference' 
  | 'Offer' 
  | 'Hired' 
  | 'Rejected';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  jobId: string;
  jobTitle: string;
  stage: CandidateStage;
  appliedAt: string;
  updatedAt: string;
  rating?: number;
  location?: string;
  source?: string;
  resume?: string;
  notes?: string;
  interviewScheduled?: string;
}

// Analytics related types
export interface TimelineData {
  date: string;
  applied: number;
  interviewed: number;
  offered: number;
  hired: number;
}

export interface ConversionRate {
  stage: string;
  rate: number;
  previousRate?: number;
}

export interface SourceData {
  source: string;
  count: number;
  percentage: number;
}

// Chatbot related types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isAudio?: boolean;
  audioUrl?: string;
  isLoading?: boolean;
}

// API related types
export interface TTSResponse {
  audioUrl: string;
}

export interface STTResponse {
  transcript: string;
}