import React from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Mail, 
  Download,
  FileText,
  AlertTriangle,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { MOCK_TENANTS } from '@/src/constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function BillingOverview() {
  const [isSending, setIsSending] = React.useState(false);
  const [selectedTenantId, setSelectedTenantId] = React.useState<string>(MOCK_TENANTS[0].id);
  const [expandedSection, setExpandedSection] = React.useState<'overage' | 'under' | null>(null);
  
  const activeTenant = MOCK_TENANTS.find(t => t.id === selectedTenantId) || MOCK_TENANTS[0];

  const getUsageForTenant = (id: string) => {
    const usageData: Record<string, { current: number, lastMonth: number, dailyAvg: number }> = {
      't1': { current: 6120, lastMonth: 5800, dailyAvg: 408 }, // Overage (Limit 5000)
      't2': { current: 1500, lastMonth: 1800, dailyAvg: 100 }, // Under (Limit 2000)
      't3': { current: 8500, lastMonth: 8200, dailyAvg: 566 }, // Under (Limit 10000)
      't4': { current: 4200, lastMonth: 3900, dailyAvg: 280 }, // Overage (Limit 3500)
      't5': { current: 1200, lastMonth: 1100, dailyAvg: 80 },  // Under (Limit 1500)
    };
    return usageData[id] || { current: 0, lastMonth: 0, dailyAvg: 0 };
  };

  const tenantsWithStats = MOCK_TENANTS.map(t => {
    const stats = getUsageForTenant(t.id);
    const daysPassed = 15; // Assuming today is April 15th
    const daysInMonth = 30;
    const projected = Math.round((stats.current / daysPassed) * daysInMonth);
    const trend = projected > stats.lastMonth ? 'increasing' : 'decreasing';

    return {
      ...t,
      actualUsage: stats.current,
      lastMonthUsage: stats.lastMonth,
      dailyAvg: stats.dailyAvg,
      projectedUsage: projected,
      trend,
      isOverage: stats.current > t.onboardedHours
    };
  });

  const overageTenants = tenantsWithStats.filter(t => t.isOverage);
  const underTenants = tenantsWithStats.filter(t => !t.isOverage);

  const tenantData = {
    name: activeTenant.name,
    onboardedHours: activeTenant.onboardedHours,
    actualUsage: getUsageForTenant(activeTenant.id).current,
    monthlyRate: activeTenant.monthlyRate,
    overageRate: 3.5, // per hour
  };

  const overage = Math.max(0, tenantData.actualUsage - tenantData.onboardedHours);
  const overageCost = overage * tenantData.overageRate;
  const totalBill = tenantData.monthlyRate + overageCost;
  const usagePercent = (tenantData.actualUsage / tenantData.onboardedHours) * 100;

  const handleSendReport = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      toast.success("Usage reports sent to Sales, Engineering, and Product teams.", {
        description: "Automated email chain initiated for billing adjustment."
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Billing & Usage</h2>
          <p className="text-gray-500">Track execution hours and manage tenant subscriptions.</p>
        </div>
        <div className="flex gap-3">
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
          <Button variant="outline" className="gap-2 h-9 mt-4">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button 
            onClick={handleSendReport} 
            disabled={isSending}
            className="bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Mail className="w-4 h-4" />
            {isSending ? 'Sending Reports...' : 'Generate & Send Reports'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={cn(
            "border-none shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-red-500/20",
            expandedSection === 'overage' ? "ring-2 ring-red-500" : ""
          )}
          onClick={() => setExpandedSection(expandedSection === 'overage' ? null : 'overage')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Clients in Overage</p>
                  <h3 className="text-2xl font-bold text-red-600">{overageTenants.length}</h3>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-700 border-none">Action Required</Badge>
            </div>
            {expandedSection === 'overage' && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                {overageTenants.map(t => (
                  <div key={t.id} className="p-3 bg-red-50/50 rounded-lg border border-red-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900">{t.name}</span>
                      <Badge className="bg-red-600 text-white border-none">
                        +{t.actualUsage - t.onboardedHours} hrs over
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
                      <div className="space-y-1">
                        <p className="text-gray-500 uppercase font-bold">Last Month</p>
                        <p className="text-sm font-medium">{t.lastMonthUsage.toLocaleString()} hrs</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 uppercase font-bold">Current (MTD)</p>
                        <p className="text-sm font-medium text-red-600">{t.actualUsage.toLocaleString()} hrs</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 uppercase font-bold">Daily Avg</p>
                        <p className="text-sm font-medium">{t.dailyAvg.toLocaleString()} hrs/day</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-gray-500 uppercase font-bold">Projected</p>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-bold">{t.projectedUsage.toLocaleString()} hrs</p>
                          {t.trend === 'increasing' ? (
                            <ArrowUpRight className="w-3 h-3 text-red-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-green-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-red-100/50">
                      <p className="text-[10px] text-red-700 font-medium italic">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        Prediction: Usage is likely to {t.trend === 'increasing' ? 'increase' : 'decrease'} by ~{Math.abs(Math.round(((t.projectedUsage - t.lastMonthUsage) / t.lastMonthUsage) * 100))}% next month based on current velocity.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card 
          className={cn(
            "border-none shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-green-500/20",
            expandedSection === 'under' ? "ring-2 ring-green-500" : ""
          )}
          onClick={() => setExpandedSection(expandedSection === 'under' ? null : 'under')}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Clients Within Limits</p>
                  <h3 className="text-2xl font-bold text-green-600">{underTenants.length}</h3>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700 border-none">Healthy</Badge>
            </div>
            {expandedSection === 'under' && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 animate-in slide-in-from-top-2 duration-200">
                {underTenants.map(t => (
                  <div key={t.id} className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-green-600 font-medium">{t.actualUsage} / {t.onboardedHours} hrs</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-white/10 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">Current Month</Badge>
            </div>
            <div>
              <p className="text-blue-100 text-sm">Estimated Total Bill</p>
              <h3 className="text-3xl font-bold">${totalBill.toLocaleString()}</h3>
            </div>
            <div className="pt-4 flex items-center gap-2 text-sm text-blue-100">
              <ArrowUpRight className="w-4 h-4" />
              <span>+${overageCost.toLocaleString()} in overage fees</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Usage Tracking</CardTitle>
            <CardDescription>Execution hours vs. Onboarded capacity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Total Execution Time</span>
                <span className="text-gray-500">{tenantData.actualUsage} / {tenantData.onboardedHours} hrs</span>
              </div>
              <Progress value={usagePercent} className="h-2" />
              <div className="flex justify-between items-center pt-1">
                {usagePercent > 100 ? (
                  <div className="flex items-center gap-1 text-xs text-red-600 font-medium">
                    <AlertTriangle className="w-3 h-3" />
                    Overage detected ({(usagePercent - 100).toFixed(1)}%)
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Within limits
                  </div>
                )}
                <span className="text-xs text-gray-400">Resets in 12 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Billing Scenarios & Actions</CardTitle>
          <CardDescription>Automated workflows based on usage trends.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50 space-y-3">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <ArrowDownRight className="w-5 h-5" />
                Scenario A: Under-utilization
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                If usage is consistently below 80% of onboarded capacity, the system triggers a "Right-sizing" notification to Sales and the Tenant.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                <li>Update monthly billing to lower tier</li>
                <li>Notify Product team for feature adoption analysis</li>
                <li>Update service agreement in database</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-orange-100 bg-orange-50/50 space-y-3">
              <div className="flex items-center gap-2 text-orange-700 font-semibold">
                <ArrowUpRight className="w-5 h-5" />
                Scenario B: Overage Detected
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Usage has exceeded onboarded hours. Automated invoice generation and follow-up chain initiated.
              </p>
              <ul className="text-xs text-gray-500 space-y-1 list-disc pl-4">
                <li>Calculate processing time fees</li>
                <li>Notify Sales, Engineering, Infra, GTS, SRE</li>
                <li>Sales follow-up with Product/Infra for upsell</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
