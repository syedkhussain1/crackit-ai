import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import links from '@/utils/links';
import Link from 'next/link';

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='ghost' size='icon' className="h-9 w-9">
          <AlignLeft className="h-5 w-5" />
          <span className='sr-only'>Navigation</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className='w-56 lg:hidden' 
        align='start' 
        sideOffset={25}
        alignOffset={-5}
      >
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {links.map((link) => (
          <DropdownMenuItem key={link.href} className="py-1.5">
            <Link href={link.href} className='flex items-center gap-x-3 w-full'>
              <span className="text-muted-foreground">
                {link.icon}
              </span>
              <span className='capitalize font-medium'>{link.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}