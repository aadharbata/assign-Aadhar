import React from 'react';
import { useSearch } from './hooks/useSearch';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import EmptyState from './components/EmptyState';

function App() {
  const { state, setQuery, executeSearch } = useSearch();
  const { query, isLoading, hasSearched, error, hackerNewsData, webMentionsData } = state;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <SearchForm
              query={query}
              onQueryChange={setQuery}
              onSubmit={executeSearch}
              isLoading={isLoading}
              error={error}
            />
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}
          
          {!isLoading && !hasSearched && (
            <EmptyState />
          )}
          
          {!isLoading && hasSearched && hackerNewsData && webMentionsData && (
            <SearchResults
              hackerNewsData={hackerNewsData}
              webMentionsData={webMentionsData}
            />
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500">
            Web Mention Tracker — Track companies and individuals across the web
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;