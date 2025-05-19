import { JobType } from '@/utils/types';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { CalendarIcon, MapPinIcon, BriefcaseIcon, Edit} from 'lucide-react';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import DeleteJobBtn from './DeleteJobBtn';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JobCardProps {
  job: JobType;
}

function JobCard({ job }: JobCardProps) {
  const { id, position, company, location, status, mode, createdAt } = job;
  
  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500/80 hover:bg-yellow-500';
      case 'interview': return 'bg-blue-500/80 hover:bg-blue-500';
      case 'declined': return 'bg-red-500/80 hover:bg-red-500';
      case 'offered': return 'bg-green-500/80 hover:bg-green-500';
      default: return 'bg-slate-500/80 hover:bg-slate-500';
    }
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group border border-border/50">
      <CardHeader className="pb-3 relative">
        <div className="absolute right-6 top-6">
          <Badge className={`capitalize ${getStatusColor(status)}`}>
            {status}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-xl font-bold truncate">{position}</CardTitle>
          <CardDescription className="text-md mt-1 font-medium">{company}</CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 pt-0">
        <div className="grid grid-cols-2 gap-y-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="h-3.5 w-3.5 text-primary/70" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BriefcaseIcon className="h-3.5 w-3.5 text-primary/70" />
            <span className="capitalize">{mode.toLowerCase().replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <CalendarIcon className="h-3.5 w-3.5 text-primary/70" />
            <span>Applied {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/40 pt-3 pb-3 border-t border-border/40 flex justify-between gap-2">
        <div className="flex gap-2 w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5">
                  <Link href={`/jobs/${id}/edit`} className="flex items-center justify-center">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit this job</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger>
                <DeleteJobBtn id={id} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete this job</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>
    </Card>
  );
}

export default JobCard;