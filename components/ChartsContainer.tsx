'use client';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { useQuery } from '@tanstack/react-query';
import { getChartsDataAction } from '@/utils/actions';
import { BarChart3Icon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

function ChartsContainer() {
  const { data, isPending } = useQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });

  if (isPending) return <h2 className='text-xl font-medium'>Please wait...</h2>;
  if (!data || data.length < 1) return null;
  return (
    <section className="mt-12 mb-10">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3Icon className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Monthly Applications</h2>
      </div>
      
      <Card className="overflow-hidden border border-border/50 bg-card">
        <CardContent className="pt-6 pb-2">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="date" 
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <YAxis 
                allowDecimals={false}
                axisLine={{ stroke: '#e0e0e0' }}
                tick={{ fill: 'var(--muted-foreground)' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  boxShadow: 'var(--shadow-sm)'
                }}
                cursor={{ fill: 'var(--primary-foreground)', opacity: 0.1 }}
              />
              <Bar 
                dataKey="count" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </section>
  );
}
export default ChartsContainer;