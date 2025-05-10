import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Pause, Play, VolumeX, Volume2, X, Loader2 } from 'lucide-react';
import { initialChatMessages } from '../data/mockData';
import { ChatMessage } from '../types';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    // Simulate API response delay
    setTimeout(async () => {
      // Get mock response
      const response = await mockChatbotResponse(userMessage.content);
      
      setMessages(prev => [...prev, response]);
      setIsThinking(false);
      
      // If there's audio, play it
      if (response.audioUrl) {
        const audio = new Audio(response.audioUrl);
        audioRef.current = audio;
        setCurrentAudio(audio);
        
        if (!isMuted) {
          audio.play();
          setIsPlaying(true);
        }
        
        audio.onended = () => {
          setIsPlaying(false);
        };
      }
    }, 1500);
  };
  
  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    
    // If starting recording
    if (!isRecording) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        // Simulate transcription
        handleTranscription("Could you tell me about the current hiring trends?");
      }, 3000);
    }
  };
  
  const handleTranscription = (transcript: string) => {
    setInputValue(transcript);
    
    // Automatically send the transcribed message
    setTimeout(() => {
      const syntheticEvent = {
        preventDefault: () => {}
      } as React.FormEvent;
      handleSendMessage(syntheticEvent);
    }, 500);
  };
  
  const togglePlayPause = () => {
    if (currentAudio) {
      if (isPlaying) {
        currentAudio.pause();
      } else {
        currentAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (currentAudio) {
      currentAudio.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };
  
  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
    }
  };
  
  // Mock API call for chatbot response
  const mockChatbotResponse = async (userMessage: string): Promise<ChatMessage> => {
    // Mock responses for different queries
    const responses = [
      {
        trigger: ['hello', 'hi', 'hey', 'greetings'],
        response: "Hello! I'm your AI recruiting assistant. How can I help you today?",
      },
      {
        trigger: ['job', 'position', 'opening'],
        response: "We currently have 7 open positions. The most active one is 'Senior Frontend Developer' with 24 applicants so far. Would you like me to provide more details about any specific job?",
      },
      {
        trigger: ['candidate', 'applicant', 'talent', 'hiring'],
        response: "We have 42 active candidates in the pipeline. 18 are in the screening stage, 12 in interview stage, and 5 have received offers. The Senior Frontend Developer position has the most candidates. Would you like to see the top candidates?",
      },
      {
        trigger: ['trend', 'data', 'analytics', 'metrics', 'insight'],
        response: "Based on recent data, our hiring efficiency has improved by 12% in the last month. The average time-to-hire has decreased from 21 days to 18 days. LinkedIn continues to be our best source of quality candidates, accounting for 42% of all hires.",
      },
      {
        trigger: ['interview', 'schedule', 'meeting'],
        response: "You have 3 interviews scheduled this week. One for the Product Manager position tomorrow at 10 AM, and two for the UX Designer position on Friday at 2 PM and 4 PM. Would you like me to help you prepare for these interviews?",
      }
    ];
    
    // Find a matching response
    const matchedResponse = responses.find(r => 
      r.trigger.some(t => userMessage.toLowerCase().includes(t.toLowerCase()))
    );
    
    // Generate mock audio URL
    const mockAudioUrl = 'https://audio-samples.github.io/samples/mp3/blizzard_biased/sample-1.mp3';
    
    // Default response if no match
    return {
      id: uuidv4(),
      role: 'assistant',
      content: matchedResponse?.response || "I don't have specific information about that. Would you like me to help you with job listings, candidate information, or recruitment analytics?",
      timestamp: new Date().toISOString(),
      audioUrl: mockAudioUrl
    };
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-white shadow-sm rounded-xl overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="M12 8V4H8"></path>
                <rect width="16" height="12" x="4" y="8" rx="2"></rect>
                <path d="M2 14h2"></path>
                <path d="M20 14h2"></path>
                <path d="M15 13v2"></path>
                <path d="M9 13v2"></path>
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">AI Recruiting Assistant</h3>
              <p className="text-xs text-gray-500">Always online</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={toggleMute}
              className={`p-2 rounded-full ${isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'} hover:bg-gray-200`}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[75%] rounded-lg p-4 ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="mt-1 flex justify-between items-center">
                    <span className={`text-xs ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </span>
                    
                    {message.role === 'assistant' && message.audioUrl && (
                      <div className="flex items-center space-x-1">
                        {currentAudio && message.audioUrl === currentAudio.src && isPlaying ? (
                          <button 
                            onClick={togglePlayPause}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Pause size={14} className="text-gray-600" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              if (currentAudio) {
                                stopAudio();
                              }
                              const audio = new Audio(message.audioUrl);
                              audioRef.current = audio;
                              setCurrentAudio(audio);
                              
                              if (!isMuted) {
                                audio.play();
                                setIsPlaying(true);
                              }
                              
                              audio.onended = () => {
                                setIsPlaying(false);
                              };
                            }}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <Play size={14} className="text-gray-600" />
                          </button>
                        )}
                        
                        {currentAudio && message.audioUrl === currentAudio.src && isPlaying && (
                          <button 
                            onClick={stopAudio}
                            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                          >
                            <X size={14} className="text-gray-600" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
            
            {isThinking && (
              <div className="flex justify-start">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 text-gray-800 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Loader2 size={18} className="animate-spin text-blue-600" />
                    <p className="text-sm text-gray-500">Thinking...</p>
                  </div>
                </motion.div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-red-50 border-t border-red-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                  <p className="text-sm font-medium text-red-800">Recording...</p>
                </div>
                <button
                  onClick={() => setIsRecording(false)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              type="button"
              onClick={handleRecordToggle}
              className={`p-2 rounded-full ${
                isRecording 
                  ? 'bg-red-600 text-white animate-pulse' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mic size={20} />
            </button>
            
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
          
          <div className="mt-2 text-xs text-gray-500 text-center">
            Ask me about job listings, candidates, or recruitment insights
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;