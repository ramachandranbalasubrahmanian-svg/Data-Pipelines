import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  PlayCircle, 
  CreditCard, 
  AlertCircle, 
  Settings,
  Users,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Database, label: 'Projects', id: 'projects' },
  { icon: PlayCircle, label: 'Job Manager', id: 'jobs' },
  { icon: CreditCard, label: 'Billing & Usage', id: 'billing' },
  { icon: AlertCircle, label: 'Incidents', id: 'incidents' },
  { icon: History, label: 'Audit Trail', id: 'audit' },
  { icon: Users, label: 'Tenants', id: 'tenants' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export function Sidebar() {
  const [activeTab, setActiveTab] = React.useState('overview');

  return (
    <aside className="w-64 bg-[#151619] text-white flex flex-col border-r border-white/10">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
          <Database className="w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Data Pipelines</h1>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeTab === item.id 
                ? "bg-blue-600 text-white" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Product Leader</p>
            <p className="text-xs text-gray-500 truncate">ramachandran.b@gmail.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
