import React from 'react';
import { Bell, Search, User, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="h-16 border-bottom bg-white flex items-center justify-between px-6 border-b border-gray-200">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search jobs, projects, or incidents..." 
            className="pl-10 bg-gray-50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
          <Globe className="w-3 h-3" />
          <span>Tenant: Global-Enterprise-01</span>
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-2" />
        
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          <span>Admin Panel</span>
        </Button>
      </div>
    </header>
  );
}
