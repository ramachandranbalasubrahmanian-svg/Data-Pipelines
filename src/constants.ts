import { Tenant, HARDWARE_OPTIONS, Job } from './types';

export const MOCK_TENANTS: Tenant[] = [
  { 
    id: 't1', 
    name: 'Global-Enterprise-01', 
    contactEmail: 'sarah.j@global.com', 
    serviceAgreementDate: '2026-01-15', 
    onboardedHours: 5000, 
    initialPayment: 12500,
    monthlyRate: 2500
  },
  { 
    id: 't2', 
    name: 'Retail-Giant-X', 
    contactEmail: 'mike.r@retailx.io', 
    serviceAgreementDate: '2026-03-01', 
    onboardedHours: 2000, 
    initialPayment: 5000,
    monthlyRate: 1000
  },
  { 
    id: 't3', 
    name: 'FinTech-Solutions', 
    contactEmail: 'alex.k@fintech.com', 
    serviceAgreementDate: '2025-11-20', 
    onboardedHours: 10000, 
    initialPayment: 25000,
    monthlyRate: 5000
  },
  { 
    id: 't4', 
    name: 'Health-Tech-Systems', 
    contactEmail: 'dr.smith@healthtech.org', 
    serviceAgreementDate: '2026-02-10', 
    onboardedHours: 3500, 
    initialPayment: 8500,
    monthlyRate: 1800
  },
  { 
    id: 't5', 
    name: 'Edu-Cloud-Global', 
    contactEmail: 'admin@educloud.edu', 
    serviceAgreementDate: '2025-12-05', 
    onboardedHours: 1500, 
    initialPayment: 4000,
    monthlyRate: 800
  },
];

export const MOCK_JOBS: Job[] = [
  // Tenant 1: Global-Enterprise-01
  {
    id: '1',
    tenantId: 't1',
    projectId: 'p1',
    name: 'Daily Sales Aggregation',
    status: 'Completed',
    hardwareId: 'medium',
    threads: 15,
    startTime: '2026-04-13T08:00:00Z',
    endTime: '2026-04-13T08:15:00Z',
    executionTime: 900,
    logs: ['Starting job...', 'Connecting to DB...', 'Processed 1.2M records', 'Job completed successfully'],
    createdAt: '2026-04-13T07:55:00Z'
  },
  {
    id: '2',
    tenantId: 't1',
    projectId: 'p1',
    name: 'User Behavior Analysis',
    status: 'Running',
    hardwareId: 'large',
    threads: 80,
    startTime: '2026-04-13T12:00:00Z',
    executionTime: 0,
    logs: ['Initializing threads...', 'Loading data into memory...', 'Processing batch 45/100'],
    createdAt: '2026-04-13T11:50:00Z'
  },
  {
    id: 't1-j3',
    tenantId: 't1',
    projectId: 'p1',
    name: 'Customer Churn Prediction',
    status: 'Initialising',
    hardwareId: 'xlarge',
    threads: 120,
    executionTime: 0,
    logs: ['Allocating GPU resources...', 'Downloading model weights...'],
    createdAt: '2026-04-13T13:30:00Z'
  },
  {
    id: 't1-j4',
    tenantId: 't1',
    projectId: 'p1',
    name: 'Real-time Fraud Detection',
    status: 'Queueing',
    hardwareId: 'medium',
    threads: 10,
    executionTime: 0,
    logs: ['Waiting for stream buffer...'],
    createdAt: '2026-04-13T13:40:00Z'
  },

  // Tenant 2: Retail-Giant-X
  {
    id: '3',
    tenantId: 't2',
    projectId: 'p2',
    name: 'Inventory Sync',
    status: 'Errored out',
    hardwareId: 'small',
    threads: 5,
    startTime: '2026-04-13T10:00:00Z',
    endTime: '2026-04-13T10:02:00Z',
    executionTime: 120,
    logs: ['Starting job...', 'ERROR: Connection timeout to SAP endpoint', 'Retrying...', 'FATAL: Max retries exceeded'],
    createdAt: '2026-04-13T09:55:00Z'
  },
  {
    id: '4',
    tenantId: 't2',
    projectId: 'p3',
    name: 'Log Cleanup Service',
    status: 'Cancelled',
    hardwareId: 'small',
    threads: 2,
    startTime: '2026-04-13T11:00:00Z',
    endTime: '2026-04-13T11:05:00Z',
    executionTime: 300,
    logs: ['Starting cleanup...', 'User requested cancellation', 'Gracefully shutting down'],
    createdAt: '2026-04-13T10:55:00Z'
  },
  {
    id: 't2-j5',
    tenantId: 't2',
    projectId: 'p2',
    name: 'Supply Chain Optimization',
    status: 'Running',
    hardwareId: 'xxlarge',
    threads: 380,
    startTime: '2026-04-13T13:00:00Z',
    executionTime: 0,
    logs: ['Running linear programming solver...', 'Optimizing routes for 500 nodes'],
    createdAt: '2026-04-13T12:45:00Z'
  },
  {
    id: 't2-j6',
    tenantId: 't2',
    projectId: 'p2',
    name: 'Price Elasticity Model',
    status: 'Completed',
    hardwareId: 'large',
    threads: 50,
    startTime: '2026-04-13T09:00:00Z',
    endTime: '2026-04-13T10:30:00Z',
    executionTime: 5400,
    logs: ['Loading historical sales data...', 'Training regression model...', 'Exporting coefficients'],
    createdAt: '2026-04-13T08:50:00Z'
  },

  // Tenant 3: FinTech-Solutions
  {
    id: '5',
    tenantId: 't3',
    projectId: 'p1',
    name: 'Monthly Financial Report',
    status: 'Queueing',
    hardwareId: 'xxlarge',
    threads: 350,
    executionTime: 0,
    logs: ['Job submitted to queue', 'Waiting for resource availability'],
    createdAt: '2026-04-13T12:15:00Z'
  },
  {
    id: '6',
    tenantId: 't3',
    projectId: 'p2',
    name: 'Legacy Data Migration',
    status: 'Timeout',
    hardwareId: 'xlarge',
    threads: 150,
    startTime: '2026-04-13T01:00:00Z',
    endTime: '2026-04-13T05:00:00Z',
    executionTime: 14400,
    logs: ['Migration started', 'Transferring table: orders_history', 'Job exceeded maximum runtime of 4 hours'],
    createdAt: '2026-04-13T00:55:00Z'
  },
  {
    id: 't3-j7',
    tenantId: 't3',
    projectId: 'p1',
    name: 'Risk Assessment Engine',
    status: 'Running',
    hardwareId: 'large',
    threads: 90,
    startTime: '2026-04-13T13:15:00Z',
    executionTime: 0,
    logs: ['Calculating Monte Carlo simulations...', 'Iteration 5000/10000'],
    createdAt: '2026-04-13T13:00:00Z'
  },
  {
    id: 't3-j8',
    tenantId: 't3',
    projectId: 'p1',
    name: 'Compliance Audit Scan',
    status: 'Errored out',
    hardwareId: 'medium',
    threads: 20,
    startTime: '2026-04-13T11:30:00Z',
    endTime: '2026-04-13T11:35:00Z',
    executionTime: 300,
    logs: ['Scanning transaction logs...', 'FATAL: Unauthorized access to encrypted vault detected', 'Security alert triggered'],
    createdAt: '2026-04-13T11:20:00Z'
  }
];
