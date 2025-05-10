import axios from 'axios';

const API_URL = 'http://localhost:2900';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
interface TTSRequest {
  text: string;
  voice?: string;
}

interface TTSResponse {
  text: string;
  voice: string;
  audio_url: string;
  timestamp: string;
}

interface STTResponse {
  id: string;
  transcript: string;
  ai_response: {
    text: string;
    type: string;
    timestamp: string;
  };
  tts_available: boolean;
}

// Text-to-Speech API
export const textToSpeech = async (text: string, voice: string = 'default'): Promise<TTSResponse> => {
  const response = await api.post<TTSResponse>('/api/tts', { text, voice });
  return response.data;
};

// Speech-to-Text API for pre-recorded audio
export const speechToText = async (audioBlob: Blob, id: string): Promise<STTResponse> => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'audio.wav');
  formData.append('language', 'en');

  const response = await api.post<STTResponse>(`/api/stt/prerecorded/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// WebSocket STT connection
export const createSTTWebSocket = (id: string): WebSocket => {
  const ws = new WebSocket(`ws://localhost:2900/ws/stt/${id}`);
  
  ws.onopen = () => {
    console.log('WebSocket connection established');
  };
  
  ws.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return ws;
};

export default api;