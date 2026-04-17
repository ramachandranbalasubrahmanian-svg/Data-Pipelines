import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp,
  Cpu,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const data = [
  { name: '00:00', jobs: 45, success: 42, failed: 3 },
  { name: '04:00', jobs: 52, success: 48, failed: 4 },
  { name: '08:00', jobs: 89, success: 85, failed: 4 },
  { name: '12:00', jobs: 120, success: 115, failed: 5 },
  { name: '16:00', jobs: 95, success: 90, failed: 5 },
  { name: '20:00', jobs: 65, success: 62, failed: 3 },
];

const usageData = [
  { month: 'Jan', usage: 4500, limit: 5000 },
  { month: 'Feb', usage: 5200, limit: 5000 },
  { month: 'Mar', usage: 4800, limit: 5000 },
  { month: 'Apr', usage: 6100, limit: 5000 },
];

const velocityData = [
  { day: 'Mon', speed: 120 },
  { day: 'Tue', speed: 145 },
  { day: 'Wed', speed: 132 },
  { day: 'Thu', speed: 168 },
  { day: 'Fri', speed: 185 },
  { day: 'Sat', speed: 110 },
  { day: 'Sun', speed: 95 },
];

const stats = [
  { label: 'Active Jobs', value: '124', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Success Rate', value: '98.2%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Failed Jobs', value: '12', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Avg. Execution', value: '14m 22s', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const freshnessData = [
  { source: 'Salesforce CRM', lastSync: '12m ago', status: 'Fresh', health: 98 },
  { source: 'SAP HANA ERP', lastSync: '1h 22m ago', status: 'Stale', health: 72 },
  { source: 'AWS S3 Data Lake', lastSync: '4m ago', status: 'Fresh', health: 99 },
  { source: 'Google Analytics 4', lastSync: '32m ago', status: 'Fresh', health: 95 },
  { source: 'Legacy Oracle DB', lastSync: '4h 10m ago', status: 'Critical', health: 45 },
];

import { MOCK_TENANTS } from '@/src/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function Overview() {
  const [selectedTenantId, setSelectedTenantId] = React.useState<string>(MOCK_TENANTS[0].id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Platform Overview</h2>
          <p className="text-gray-500">Real-time performance metrics for {MOCK_TENANTS.find(t => t.id === selectedTenantId)?.name}.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold uppercase text-gray-400 mb-1">Active Tenant</label>
            <Select value={selectedTenantId} onValueChange={setSelectedTenantId}>
              <SelectTrigger className="w-[200px] h-9 border-gray-200">
                <SelectValue placeholder="Select tenant" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_TENANTS.map((tenant) => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Card className="px-4 py-2 flex items-center gap-2 bg-white shadow-sm border-gray-200 mt-4 h-9">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">+12% vs last month</span>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={stat.bg + " p-3 rounded-lg"}>
                <stat.icon className={stat.color + " w-6 h-6"} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Job Execution Trends
            </CardTitle>
            <CardDescription>Hourly distribution of pipeline executions.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="jobs" stroke="#3b82f6" fillOpacity={1} fill="url(#colorJobs)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Data Freshness Scoreboard
            </CardTitle>
            <CardDescription>SLA tracking for source-to-lake synchronization.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {freshnessData.map((item) => (
                <div key={item.source} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-900">{item.source}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                      <Clock className="w-3 h-3" />
                      Last Sync: {item.lastSync}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right">
                    <div className="space-y-1">
                      <div className="flex items-center justify-end gap-2">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          item.status === 'Fresh' ? "bg-green-500" : item.status === 'Stale' ? "bg-orange-500" : "bg-red-500"
                        )} />
                        <span className="text-xs font-bold uppercase">{item.status}</span>
                      </div>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-1000",
                            item.health > 90 ? "bg-green-500" : item.health > 70 ? "bg-orange-500" : "bg-red-500"
                          )} 
                          style={{ width: `${item.health}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-blue-600 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Overall Reliability</p>
                <p className="text-2xl font-bold">94.8%</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Processing Throughput
            </CardTitle>
            <CardDescription>Real-time pipeline velocity across all compute clusters.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={velocityData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                 <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                 />
                 <Line type="stepAfter" dataKey="speed" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
               </LineChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-gradient-to-br from-[#151619] to-[#2D2E32] text-white">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-blue-400">System Pulse</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Cluster Node Health</span>
                <span className="text-green-400">99.9%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[99.9%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Queue Memory Utilization</span>
                <span className="text-blue-400">42%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-[10px] text-gray-400 leading-relaxed uppercase font-bold">
                Platform is currently operating at optimal capacity. Next scheduled maintenance window: Saturday, 02:00 UTC.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
