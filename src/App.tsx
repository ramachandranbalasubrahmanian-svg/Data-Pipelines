/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Overview } from './components/dashboard/Overview';
import { JobManager } from './components/jobs/JobManager';
import { BillingOverview } from './components/billing/BillingOverview';
import { IncidentCenter } from './components/support/IncidentCenter';
import { Projects } from './components/projects/Projects';
import { AuditTrail } from './components/audit/AuditTrail';
import { Tenants } from './components/tenants/Tenants';
import { Toaster } from 'sonner';
import { ErrorBoundary } from './components/ErrorBoundary';
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

export default function App() {
  const [activeTab, setActiveTab] = React.useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'projects': return <Projects />;
      case 'jobs': return <JobManager />;
      case 'billing': return <BillingOverview />;
      case 'incidents': return <IncidentCenter />;
      case 'audit': return <AuditTrail />;
      case 'tenants': return <Tenants />;
      default: return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <Database className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Module under development</p>
          <p className="text-sm">This section of the Data Pipelines platform is coming soon.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#1A1A1A] font-sans">
      {/* Sidebar - Integrated here for state management simplicity in demo */}
      <aside className="w-64 bg-[#151619] text-white flex flex-col border-r border-white/10 shrink-0">
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

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Integrated here */}
        <header className="h-16 border-bottom bg-white flex items-center justify-between px-6 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                placeholder="Search jobs, projects, or incidents..." 
                className="w-full h-9 rounded-md px-10 bg-gray-50 border-none text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
              <History className="w-3 h-3" />
              <span>Tenant: Global-Enterprise-01</span>
            </div>
            
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <AlertCircle className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />
            
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-md transition-colors text-sm font-medium">
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <ErrorBoundary>
            {renderContent()}
          </ErrorBoundary>
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

function Search({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
