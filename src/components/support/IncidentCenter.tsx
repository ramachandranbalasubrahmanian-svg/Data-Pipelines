import React from 'react';
import { 
  AlertCircle, 
  ExternalLink, 
  FileText, 
  ShieldAlert, 
  CheckCircle,
  MessageSquare,
  LifeBuoy,
  RefreshCw,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateKBArticle } from '@/src/lib/gemini';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function IncidentCenter() {
  const [incidents, setIncidents] = React.useState([
    {
      id: 'INC-90210',
      jobName: 'Inventory Sync',
      error: 'Connection timeout to SAP endpoint',
      kbId: 'KB-12455',
      status: 'Open',
      severity: 'P1',
      createdAt: '2026-04-13T10:02:00Z',
      explanation: 'The SAP gateway is not responding to requests within the 30s timeout window.',
      remediation: 'Check VPN tunnel status and SAP application server health.',
      owner: 'Infrastructure Team'
    }
  ]);

  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleSimulateError = async () => {
    setIsGenerating(true);
    const errorMsg = "Database connection pool exhausted. Max connections (100) reached.";
    const jobName = "Real-time Analytics Stream";
    
    try {
      const kbData = await generateKBArticle(errorMsg, jobName);
      
      const newIncident = {
        id: `INC-${Math.floor(Math.random() * 90000) + 10000}`,
        jobName,
        error: errorMsg,
        kbId: kbData.kbId,
        status: 'Open',
        severity: 'P2',
        createdAt: new Date().toISOString(),
        explanation: kbData.explanation,
        remediation: kbData.remediation,
        owner: kbData.ownership
      };
      
      setIncidents([newIncident, ...incidents]);
      toast.success("New Incident Created", {
        description: `ServiceNow ticket ${newIncident.id} and KB ${newIncident.kbId} generated.`
      });
    } catch (err) {
      toast.error("Failed to generate incident analysis.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Incident Center</h2>
          <p className="text-gray-500">ServiceNow integration & AI-powered KB generation.</p>
        </div>
        <Button 
          onClick={handleSimulateError} 
          disabled={isGenerating}
          variant="destructive" 
          className="gap-2"
        >
          <ShieldAlert className="w-4 h-4" />
          {isGenerating ? 'Analyzing Error...' : 'Simulate Job Error'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <LifeBuoy className="w-4 h-4 text-blue-500" />
                Support Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Incidents</span>
                <Badge variant="secondary">{incidents.filter(i => i.status === 'Open').length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">MTTR (Avg)</span>
                <span className="text-sm font-medium">42m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Recurring Issues</span>
                <Badge className="bg-orange-100 text-orange-700 border-none">3 Detected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Reliability Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-blue-100 leading-relaxed">
                Recurring issues are automatically categorized. 3+ similar errors trigger a "Feature Request" proposal to reduce future support tickets.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {incidents.map((incident) => (
                <Card key={incident.id} className="border-none shadow-sm overflow-hidden">
                  <div className={cn(
                    "h-1 w-full",
                    incident.severity === 'P1' ? "bg-red-500" : "bg-orange-500"
                  )} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-bold">
                            {incident.severity}
                          </Badge>
                          <CardTitle className="text-base">{incident.id}: {incident.jobName}</CardTitle>
                        </div>
                        <CardDescription className="text-xs">
                          Created: {new Date(incident.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 gap-1 text-xs">
                        View in ServiceNow
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-sm font-medium text-red-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {incident.error}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          KB Article: {incident.kbId}
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {incident.explanation}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase text-gray-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Remediation
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {incident.remediation}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <User className="w-3 h-3" />
                          Owner: <span className="font-medium text-gray-700 ml-1">{incident.owner}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs gap-1">
                          <MessageSquare className="w-3 h-3" />
                          Update KB
                        </Button>
                        <Button size="sm" className="h-8 text-xs bg-green-600 hover:bg-green-700">
                          Resolve Incident
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

