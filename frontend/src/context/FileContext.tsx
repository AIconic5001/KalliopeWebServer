import { createContext, useContext, useState } from 'react';

interface FileContextType {
  filename: string;
  setFilename: (filename: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useQueryContext must be used within a QueryProvider');
  }
  return context;
};

export const QueryProvider = FileContext.Provider;
export const QueryConsumer = FileContext.Consumer;

export const FileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [filename, setFilename] = useState('');

  return <QueryProvider value={{ filename, setFilename }}>{children}</QueryProvider>;
};
