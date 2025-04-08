import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import './App.scss';
import LoadingSuspense from './components/LoadingSuspense';
import { routes } from './config/routes';
import { QueryContextProvider } from './context/QueryContext';
import { FileContextProvider } from './context/FileContext';

function App() {
  return (
    <FileContextProvider>
      <QueryContextProvider>
        <Suspense fallback={<LoadingSuspense />}>
          <RouterProvider router={routes} />
        </Suspense>
      </QueryContextProvider>
    </FileContextProvider>
  );
}

export default App;
