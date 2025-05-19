import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';
import { Skeleton } from './ui/skeleton';

type StatsCardsProps = {
  title: string;
  value: number;
  icon?: ReactNode;
  color?: 'blue' | 'yellow' | 'red' | 'green';
};

function StatsCards({ title, value, icon, color = 'blue' }: StatsCardsProps) {
  const getGradient = () => {
    switch(color) {
      case 'yellow': return 'from-yellow-500/10 to-transparent';
      case 'blue': return 'from-blue-500/10 to-transparent';
      case 'red': return 'from-red-500/10 to-transparent';
      case 'green': return 'from-green-500/10 to-transparent';
      default: return 'from-primary/10 to-transparent';
    }
  };
  
  const getTextColor = () => {
    switch(color) {
      case 'yellow': return 'text-yellow-600';
      case 'blue': return 'text-blue-600';
      case 'red': return 'text-red-600';
      case 'green': return 'text-green-600';
      default: return 'text-primary';
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group border border-border/50 bg-gradient-to-br bg-card">
      <CardHeader className="pb-2 relative">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-20"></div>
        <CardTitle className="font-medium text-md capitalize text-muted-foreground flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className={`text-4xl font-extrabold ${getTextColor()}`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className="overflow-hidden border border-border/50 bg-card">
      <CardHeader className="pb-2 relative">
        <Skeleton className="h-5 w-36 mb-1" />
      </CardHeader>
      
      <CardContent className="pt-2">
        <Skeleton className="h-10 w-20" />
      </CardContent>
    </Card>
  );
}

export default StatsCards;
