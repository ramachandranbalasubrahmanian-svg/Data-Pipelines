
export const HARDWARE_OPTIONS = [
  { id: 'small', cpu: 2, ram: 8, maxThreads: 10, label: '2 CPU / 8 GB RAM' },
  { id: 'medium', cpu: 4, ram: 21, maxThreads: 20, label: '4 CPU / 21 GB RAM' },
  { id: 'large', cpu: 8, ram: 32, maxThreads: 100, label: '8 CPU / 32 GB RAM' },
  { id: 'xlarge', cpu: 16, ram: 64, maxThreads: 200, label: '16 CPU / 64 GB RAM' },
  { id: 'xxlarge', cpu: 32, ram: 128, maxThreads: 400, label: '32 CPU / 128 GB RAM' },
];

export type JobStatus = 'Completed' | 'Running' | 'Timeout' | 'Errored out' | 'Cancelled' | 'Initialising' | 'Queueing' | 'Failed';

export interface Job {
  id: string;
  tenantId: string;
  projectId: string;
  name: string;
  status: JobStatus;
  hardwareId: string;
  threads: number;
  startTime?: string;
  endTime?: string;
  executionTime: number; // in seconds
  logs: string[];
  createdAt: string;
}

export interface Project {
  id: string;
  tenantId: string;
  name: string;
  description: string;
}

export interface Tenant {
  id: string;
  name: string;
  onboardedHours: number;
  monthlyRate: number;
  contactEmail: string;
  serviceAgreementDate: string;
  initialPayment: number;
}

export interface Incident {
  id: string;
  jobId: string;
  jobName: string;
  errorMsg: string;
  kbId: string;
  status: 'Open' | 'Resolved';
  severity: 'P1' | 'P2' | 'P3';
  owner: string;
  contactMetrics: string;
  explanation: string;
  createdAt: string;
}
