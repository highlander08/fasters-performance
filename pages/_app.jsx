import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyContextProvider } from '../hooks/useContext';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <Component {...pageProps} />
      </MyContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
