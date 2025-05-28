import React from 'react';
import { HackerNewsItem } from '../types';
import { ExternalLink, MessageSquare, ThumbsUp, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import Badge from './ui/Badge';

interface MentionsListProps {
  items: HackerNewsItem[];
  showDetails?: boolean;
}

const MentionsList: React.FC<MentionsListProps> = ({ 
  items,
  showDetails = false
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        No mentions found
      </div>
    );
  }

  return (
    <div className="space-y-4 divide-y divide-neutral-200">
      {items.map((item) => (
        <div key={item.id} className="pt-4 first:pt-0">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-neutral-900 mb-1 pr-4">
              <a 
                href={item.hnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600"
              >
                {item.title}
              </a>
            </h4>
            <Badge variant={item.type === 'story' ? 'secondary' : 'primary'} size="sm">
              {item.type}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-500 mb-2">
            <div className="flex items-center">
              <ThumbsUp size={14} className="mr-1" />
              <span>{item.points} points</span>
            </div>
            
            <div className="flex items-center">
              <MessageSquare size={14} className="mr-1" />
              <span>{item.comments} comments</span>
            </div>
            
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{format(parseISO(item.date), 'MMM dd, yyyy')}</span>
            </div>
            
            <div>
              by <span className="text-neutral-700">{item.author}</span>
            </div>
          </div>
          
          {showDetails && item.url && (
            <div className="mt-2">
              <a 
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
              >
                <span className="truncate">{item.url}</span>
                <ExternalLink size={14} className="ml-1 flex-shrink-0" />
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MentionsList;