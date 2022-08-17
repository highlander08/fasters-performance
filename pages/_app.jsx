import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyContextProvider } from '../hooks/useContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <Component {...pageProps} />
      </MyContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
