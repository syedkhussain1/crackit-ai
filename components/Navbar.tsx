import LinksDropdown from './LinksDropdown';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <LinksDropdown />
      </div>
      
      <div className="flex items-center">
        <UserButton 
          appearance={{
            elements: {
              userButtonAvatarBox: "w-9 h-9"
            }
          }}
        />
      </div>
    </nav>
  );
}