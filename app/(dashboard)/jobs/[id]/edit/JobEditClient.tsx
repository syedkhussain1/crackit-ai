'use client';

import { dehydrate, HydrationBoundary, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import EditJobForm from '@/components/EditJobForm';

export default function JobEditClient({ 
  state, 
  jobId 
}: { 
  state: unknown;
  jobId: string;
}) {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>
        <EditJobForm jobId={jobId} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
} 