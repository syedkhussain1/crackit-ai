'use client';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { Search, Filter } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { JobStatus } from '@/utils/types';

function SearchContainer() {
  // set default values
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const jobStatus = searchParams.get('jobStatus') || 'all';

  const router = useRouter();
  const pathname = usePathname();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const jobStatus = formData.get('jobStatus') as string;
    params.set('search', search);
    params.set('jobStatus', jobStatus);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form
      className='bg-card mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg shadow-sm border border-border/40'
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type='text'
          placeholder='Search Jobs'
          name='search'
          defaultValue={search}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-primary/40"
        />
      </div>
      
      <div className="relative">
        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Select defaultValue={jobStatus} name='jobStatus'>
          <SelectTrigger className="pl-10 focus:ring-2 focus:ring-primary/40 w-full">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="min-w-[200px] w-full">
            {['all', ...Object.values(JobStatus)].map((jobStatus) => {
              return (
                <SelectItem key={jobStatus} value={jobStatus} className="capitalize">
                  {jobStatus}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        type='submit' 
        className="bg-primary hover:bg-primary/90 transition-colors duration-200"
      >
        Search
      </Button>
    </form>
  );
}
export default SearchContainer;
