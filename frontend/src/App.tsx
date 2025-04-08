import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import './App.scss';
import LoadingSuspense from './components/LoadingSuspense';
import { routes } from './config/routes';
import { QueryContextProvider } from './context/QueryContext';

function App() {
  return (
    <QueryContextProvider>
      <Suspense fallback={<LoadingSuspense />}>
        <RouterProvider router={routes} />
      </Suspense>
    </QueryContextProvider>
  );
}

export default App;
