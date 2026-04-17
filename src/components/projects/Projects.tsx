import React from 'react';
import { 
  Folder, 
  Plus, 
  MoreVertical, 
  Activity, 
  Clock,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockProjects = [
  { id: 'p1', name: 'Sales Analytics', jobs: 12, health: 'Healthy', lastActivity: '2m ago' },
  { id: 'p2', name: 'Inventory Management', jobs: 5, health: 'Warning', lastActivity: '15m ago' },
  { id: 'p3', name: 'Customer 360', jobs: 24, health: 'Healthy', lastActivity: '1h ago' },
  { id: 'p4', name: 'Logistics Optimization', jobs: 8, health: 'Critical', lastActivity: '5m ago' },
];

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-gray-500">Manage your data pipeline projects and their associated jobs.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="border-none shadow-sm hover:ring-1 hover:ring-blue-500 transition-all cursor-pointer group">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Folder className="w-5 h-5" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
              <CardTitle className="text-lg pt-2">{project.name}</CardTitle>
              <CardDescription className="text-xs">ID: {project.id}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Activity className="w-4 h-4" />
                  <span>{project.jobs} Active Jobs</span>
                </div>
                <Badge 
                  variant="secondary" 
                  className={cn(
                    "border-none",
                    project.health === 'Healthy' ? "bg-green-100 text-green-700" :
                    project.health === 'Warning' ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  )}
                >
                  {project.health}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Last activity: {project.lastActivity}</span>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
