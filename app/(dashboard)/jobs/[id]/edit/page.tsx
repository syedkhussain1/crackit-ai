import { getSingleJobAction } from '@/utils/actions';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import JobEditClient from './JobEditClient';

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function EditJobPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  await searchParams; // Ensure searchParams is resolved

  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      return await getSingleJobAction(id);
    },
  });
  
  return <JobEditClient state={dehydrate(queryClient)} jobId={id} />;
} 