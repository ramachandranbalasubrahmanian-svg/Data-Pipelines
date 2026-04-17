import React from 'react';
import { 
  History, 
  User, 
  Shield, 
  Clock,
  Search,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const auditLogs = [
  { id: '1', user: 'ramachandran.b@gmail.com', action: 'CREATE_JOB', details: 'Created job "Daily Sales Aggregation"', timestamp: '2026-04-13T07:55:00Z', ip: '192.168.1.45' },
  { id: '2', user: 'admin@datapipelines.io', action: 'UPDATE_BILLING', details: 'Updated tenant "Global-Enterprise-01" onboarded hours to 5000', timestamp: '2026-04-12T14:20:00Z', ip: '10.0.0.12' },
  { id: '3', user: 'ramachandran.b@gmail.com', action: 'DELETE_PROJECT', details: 'Deleted project "Legacy Migration"', timestamp: '2026-04-12T10:05:00Z', ip: '192.168.1.45' },
  { id: '4', user: 'system', action: 'INCIDENT_CREATED', details: 'Auto-generated incident INC-90210 for job "Inventory Sync"', timestamp: '2026-04-13T10:02:00Z', ip: 'internal' },
  { id: '5', user: 'sales-lead@datapipelines.io', action: 'ONBOARD_TENANT', details: 'Onboarded new tenant "Retail-Giant-X"', timestamp: '2026-04-11T09:00:00Z', ip: '172.16.0.5' },
];

export function AuditTrail() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Audit Trail</h2>
          <p className="text-gray-500">Immutable record of all administrative actions and system events.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Audit Log
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search by user, action, or details..." className="pl-10 border-gray-200" />
        </div>
        <Button variant="outline">Filter Date</Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-xs text-gray-500 font-mono">
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {log.user === 'system' ? (
                      <Shield className="w-3 h-3 text-blue-500" />
                    ) : (
                      <User className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-sm font-medium">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] font-bold">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600 max-w-[300px] truncate">
                  {log.details}
                </TableCell>
                <TableCell className="text-xs text-gray-400 font-mono">
                  {log.ip}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
