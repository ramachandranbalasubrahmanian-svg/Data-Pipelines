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

const stats = [
  { label: 'Active Jobs', value: '124', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Success Rate', value: '98.2%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Failed Jobs', value: '12', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
  { label: 'Avg. Execution', value: '14m 22s', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
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
              <Cpu className="w-5 h-5 text-blue-500" />
              Tenant Resource Usage
            </CardTitle>
            <CardDescription>Actual execution hours vs. onboarded capacity.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
