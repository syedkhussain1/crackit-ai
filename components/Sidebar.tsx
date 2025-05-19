'use client';
import Logo from '@/assets/logo.svg';
import links from '@/utils/links';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className='w-64 py-6 px-4 bg-background border-r h-full flex flex-col'>
      <div className='px-4'>
        <Link href="/" className="block">
          <Image 
            src={Logo} 
            alt='logo' 
            className='h-30 w-auto cursor-pointer hover:opacity-80 transition-opacity' 
            
          />
        </Link>
      </div>
      
      <div className='mt-8 px-2'>
        <div className='h-px bg-border mb-6 mx-2' />
        <nav className='space-y-1.5'>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button 
                asChild 
                key={link.href} 
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start py-2 ${isActive ? 'font-medium' : 'font-normal'}`}
              >
                <Link href={link.href} className='flex items-center gap-x-3'>
                  <span className={`${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    {link.icon}
                  </span>
                  <span className={`capitalize ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {link.label}
                  </span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}