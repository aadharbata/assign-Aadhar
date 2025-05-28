import React, { FormEvent } from 'react';
import { Search } from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

interface SearchFormProps {
  query: string;
  onQueryChange: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
}

const SearchForm: React.FC<SearchFormProps> = ({
  query,
  onQueryChange,
  onSubmit,
  isLoading,
  error,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Enter a company or person name"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            leftIcon={<Search size={18} />}
            error={error || undefined}
            aria-label="Search query"
            className="h-12"
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !query.trim()}
          className="h-12 px-8"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;