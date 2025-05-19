import { Skeleton } from '@/components/ui/skeleton';

function loading() {
  return (
    <div className='space-y-8'>
      {/* Search/filter loading skeleton */}
      <div className='bg-card p-6 rounded-lg border border-border/50 shadow-sm'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
          <Skeleton className='h-10 w-full' />
        </div>
      </div>
      
      {/* Jobs list loading skeleton */}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className='border border-border/50 rounded-lg overflow-hidden bg-card'>
            <div className='p-6 pb-3'>
              <Skeleton className='h-6 w-3/4 mb-2' />
              <Skeleton className='h-4 w-1/2 mb-4' />
              <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-full col-span-2' />
              </div>
            </div>
            <div className='mt-4 p-4 bg-muted/40 border-t border-border/40'>
              <div className='flex gap-3'>
                <Skeleton className='h-9 w-full' />
                <Skeleton className='h-9 w-9' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default loading;
