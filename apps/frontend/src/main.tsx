import './main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '~/routeTree.gen';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _ctx, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        const queriesList = mutation.meta.invalidateQueries;

        if (typeof queriesList === 'string') {
          queryClient.invalidateQueries({
            queryKey: [mutation.meta.invalidateQueries],
          });
          return;
        }

        for (const queryKeys of queriesList) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys],
          });
        }
      }
    },
  }),
});

const router = createRouter({
  routeTree,
  defaultPendingMs: 0,
  defaultPendingMinMs: 0,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries?: string | (string | string[])[];
    };
  }
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  );
}
