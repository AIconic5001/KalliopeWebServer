import { createContext, useContext, useState } from 'react';

interface QueryContextType {
  query: string;
  setQuery: (query: string) => void;
}

const QueryContext = createContext<QueryContextType | undefined>(undefined);

export const useQueryContext = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};

export const QueryProvider = QueryContext.Provider;
export const QueryConsumer = QueryContext.Consumer;

export const QueryContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState('sample query');

  return <QueryProvider value={{ query, setQuery }}>{children}</QueryProvider>;
};
