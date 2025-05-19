'use client';
import JobCard from './JobCard';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getAllJobsAction } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Loader2, RefreshCw } from 'lucide-react';
import { JobType } from '@/utils/types';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function JobsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';
  const pageNumber = Number(searchParams.get('page')) || 1;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['jobs', search ?? '', jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({ search, jobStatus, page: pageNumber }),
  });
  
  const jobs = data?.jobs || [];
  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;
  
  // Handle pagination
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // For skeleton loading animation
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isPending) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card animate-pulse rounded-lg h-40 opacity-25"></div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-12 bg-destructive/10 rounded-lg border border-destructive/20">
        <h2 className="text-xl font-semibold text-destructive mb-3">Something went wrong!</h2>
        <p className="text-muted-foreground mb-6">Unable to load job listings</p>
        <Button 
          variant="outline" 
          onClick={() => refetch()} 
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </div>
    );
  }

  if (jobs.length < 1) {
    return (
      <div className="text-center p-12 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-3">No Jobs Found</h2>
        <p className="text-muted-foreground">
          {search || jobStatus !== 'all' 
            ? "Try adjusting your search filters." 
            : "Add your first job to get started!"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="font-medium text-foreground">{jobs.length}</span> of{' '}
          <span className="font-medium text-foreground">{count}</span> job{count !== 1 ? 's' : ''}
        </p>
        
        <Button 
          variant="ghost" 
          onClick={() => refetch()} 
          className="flex items-center gap-2"
          size="sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="grid md:grid-cols-2 gap-6 xl:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {jobs.map((job: JobType, index: number) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-12 pt-4 border-t">
          <Button 
            variant="outline" 
            size="sm"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? "default" : "outline"}
                size="icon"
                className="w-8 h-8"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          
          <Button 
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default JobsList;