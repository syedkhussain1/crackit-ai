'use client';

import JobsList from '@/components/JobsList';
import SearchForm from '@/components/SearchForm';
import { HydrationBoundary, QueryClientProvider, QueryClient } from '@tanstack/react-query';

export default function JobsClient({ state }: { state: unknown }) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>
        <SearchForm />
        <JobsList />
      </HydrationBoundary>
    </QueryClientProvider>
  );
} 