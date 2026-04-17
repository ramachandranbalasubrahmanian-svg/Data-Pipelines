import React from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Play, 
  Square, 
  RefreshCw,
  Trash2,
  Edit2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { HARDWARE_OPTIONS, Job, JobStatus } from '@/src/types';
import { MOCK_JOBS, MOCK_TENANTS } from '@/src/constants';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText, CheckCircle2 } from 'lucide-react';

export function JobManager() {
  const [selectedTenantId, setSelectedTenantId] = React.useState<string>(MOCK_TENANTS[0].id);
  const [jobs, setJobs] = React.useState<Job[]>(MOCK_JOBS);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [uploadFile, setUploadFile] = React.useState<File | null>(null);
  const [newJob, setNewJob] = React.useState({
    name: '',
    hardwareId: 'small',
    threads: 2
  });

  const filteredJobs = jobs.filter(j => j.tenantId === selectedTenantId);
  const selectedHardware = HARDWARE_OPTIONS.find(h => h.id === newJob.hardwareId);

  const handleCreateJob = () => {
    const job: Job = {
      id: Math.random().toString(36).substr(2, 9),
      tenantId: selectedTenantId,
      projectId: 'p1',
      name: newJob.name,
      status: 'Queueing',
      hardwareId: newJob.hardwareId,
      threads: newJob.threads,
      executionTime: 0,
      logs: ['Job queued by user', uploadFile ? `Configuration uploaded: ${uploadFile.name}` : 'Default configuration used'],
      createdAt: new Date().toISOString()
    };
    setJobs([job, ...jobs]);
    setIsCreateOpen(false);
    setNewJob({ name: '', hardwareId: 'small', threads: 2 });
    setUploadFile(null);
  };

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'Completed': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Completed</Badge>;
      case 'Running': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none animate-pulse">Running</Badge>;
      case 'Failed': 
      case 'Errored out': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">{status}</Badge>;
      case 'Queueing': return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none">Queueing</Badge>;
      case 'Initialising': return <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100 border-none">Initialising</Badge>;
      case 'Cancelled': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Cancelled</Badge>;
      case 'Timeout': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">Timeout</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Job Manager</h2>
          <p className="text-gray-500">Configure, schedule, and monitor your data pipelines.</p>
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
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2 h-9 mt-4">
                <Plus className="w-4 h-4" />
                Create New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Configure Data Pipeline Job</DialogTitle>
                <DialogDescription>
                  Define the resource allocation and parallelism for your job.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Job Name</label>
                  <Input 
                    placeholder="e.g. Daily ETL Sync" 
                    value={newJob.name}
                    onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Job Configuration (ZIP)</label>
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer",
                      uploadFile ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    )}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <input 
                      id="file-upload" 
                      type="file" 
                      accept=".zip" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setUploadFile(file);
                      }}
                    />
                    {uploadFile ? (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                        <p className="text-sm font-medium text-green-700">{uploadFile.name}</p>
                        <p className="text-xs text-green-600">File ready for upload</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Click to upload job details (ZIP)</p>
                        <p className="text-xs text-gray-400">Max file size: 50MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium">Hardware Configuration</label>
                  <Select 
                    value={newJob.hardwareId} 
                    onValueChange={(val) => {
                      const hw = HARDWARE_OPTIONS.find(h => h.id === val);
                      setNewJob({ 
                        ...newJob, 
                        hardwareId: val,
                        threads: Math.min(newJob.threads, hw?.maxThreads || 1)
                      });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select hardware" />
                    </SelectTrigger>
                    <SelectContent>
                      {HARDWARE_OPTIONS.map((hw) => (
                        <SelectItem key={hw.id} value={hw.id}>
                          {hw.label} (Max {hw.maxThreads} threads)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">Parallel Threads</label>
                    <span className="text-xs text-gray-500">Max: {selectedHardware?.maxThreads}</span>
                  </div>
                  <Input 
                    type="number" 
                    min={1} 
                    max={selectedHardware?.maxThreads}
                    value={newJob.threads}
                    onChange={(e) => setNewJob({ ...newJob, threads: parseInt(e.target.value) })}
                  />
                  {newJob.threads > (selectedHardware?.maxThreads || 0) && (
                    <p className="text-xs text-red-500">Threads exceed hardware capacity.</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button 
                  onClick={handleCreateJob}
                  disabled={!newJob.name || newJob.threads > (selectedHardware?.maxThreads || 0)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Deploy Job
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Filter by job name..." className="pl-10 border-gray-200" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Status
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px]">Job Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resources</TableHead>
              <TableHead>Threads</TableHead>
              <TableHead>Execution Time</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell>{getStatusBadge(job.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Badge variant="outline" className="font-normal">
                      {HARDWARE_OPTIONS.find(h => h.id === job.hardwareId)?.label}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600">{job.threads}</TableCell>
                <TableCell className="text-gray-600">
                  {job.executionTime > 0 ? `${Math.floor(job.executionTime / 60)}m ${job.executionTime % 60}s` : '--'}
                </TableCell>
                <TableCell className="text-xs text-gray-500">
                  {job.startTime ? new Date(job.startTime).toLocaleString() : 'Never'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => setSelectedJob(job)}
                        >
                          <Search className="w-4 h-4 text-blue-600" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Job Execution Details</DialogTitle>
                          <DialogDescription>
                            Full execution metrics and logs for {selectedJob?.name}
                          </DialogDescription>
                        </DialogHeader>
                        {selectedJob && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="space-y-1">
                                <p className="text-gray-500">Status</p>
                                <div>{getStatusBadge(selectedJob.status)}</div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-500">Hardware</p>
                                <p className="font-medium">{HARDWARE_OPTIONS.find(h => h.id === selectedJob.hardwareId)?.label}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-500">Start Time</p>
                                <p className="font-medium">{selectedJob.startTime ? new Date(selectedJob.startTime).toLocaleString() : '--'}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-500">End Time</p>
                                <p className="font-medium">{selectedJob.endTime ? new Date(selectedJob.endTime).toLocaleString() : '--'}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-500">Execution Time</p>
                                <p className="font-medium">
                                  {selectedJob.executionTime > 0 ? `${Math.floor(selectedJob.executionTime / 60)}m ${selectedJob.executionTime % 60}s` : '--'}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-gray-500">Threads</p>
                                <p className="font-medium">{selectedJob.threads}</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Execution Logs</p>
                              <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-gray-900 text-gray-100 font-mono text-xs">
                                {selectedJob.logs.map((log, i) => (
                                  <div key={i} className="mb-1">
                                    <span className="text-gray-500 mr-2">[{new Date(selectedJob.createdAt).toLocaleTimeString()}]</span>
                                    {log}
                                  </div>
                                ))}
                              </ScrollArea>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button onClick={() => setSelectedJob(null)}>Close</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
