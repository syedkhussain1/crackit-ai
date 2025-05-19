'use client';
import { useQuery } from '@tanstack/react-query';
import { getStatsAction } from '@/utils/actions';
import StatsCard from './StatsCard';
import { BarChart3Icon, ClockIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3Icon className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Job Application Status</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-3">
        <StatsCard 
          title="Pending Applications"
          value={data?.pending || 0}
          icon={<ClockIcon className="h-5 w-5 text-yellow-500" />}
          color="yellow"
        />
        <StatsCard 
          title="Interview Scheduled"
          value={data?.interview || 0}
          icon={<CheckCircleIcon className="h-5 w-5 text-blue-500" />}
          color="blue"
        />
        <StatsCard 
          title="Applications Declined"
          value={data?.declined || 0}
          icon={<XCircleIcon className="h-5 w-5 text-red-500" />}
          color="red"
        />
      </div>
    </section>
  );
}

export default StatsContainer;