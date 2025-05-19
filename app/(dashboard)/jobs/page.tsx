// Server component
import { getAllJobsAction } from '@/utils/actions';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import JobsClient from './JobsClient';

export default async function JobsPage() {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['jobs', '', 'all', 1],
    queryFn: () => getAllJobsAction({}),
  });
  
  return <JobsClient state={dehydrate(queryClient)} />;
}