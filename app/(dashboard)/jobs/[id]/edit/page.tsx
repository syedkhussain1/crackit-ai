import { getSingleJobAction } from '@/utils/actions';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import JobEditClient from './JobEditClient';

interface EditJobPageProps {
  params: { id: string };
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  // Await the params object itself
  const resolvedParams = await Promise.resolve(params);
  const id = resolvedParams.id;

  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      return await getSingleJobAction(id);
    },
  });
  
  return <JobEditClient state={dehydrate(queryClient)} jobId={id} />;
} 