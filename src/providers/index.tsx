  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { Provider } from 'react-redux';
  import { store } from "@/store";
  import { ReactNode } from 'react';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  });

  export function Providers({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  }
