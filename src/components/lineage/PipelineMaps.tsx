import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, 
  GitBranch, 
  Zap, 
  LayoutDashboard, 
  ArrowRight,
  Info,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const stages = [
  { id: 'src', label: 'Extract', icon: Database, color: 'blue', items: ['Salesforce', 'SAP', 'S3'] },
  { id: 'tra', label: 'Transform', icon: GitBranch, color: 'purple', items: ['SQL Spark', 'Python ETL', 'dbt'] },
  { id: 'loa', label: 'Load', icon: Zap, color: 'yellow', items: ['BigQuery', 'Snowflake'] },
  { id: 'vis', label: 'Visualize', icon: LayoutDashboard, color: 'green', items: ['Looker', 'PowerBI'] },
];

const connections = [
  { from: 'src', to: 'tra' },
  { from: 'tra', to: 'loa' },
  { from: 'loa', to: 'vis' },
];

export function PipelineMaps() {
  const [activeStage, setActiveStage] = React.useState<string | null>(null);

  const getStageColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'yellow': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'green': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pipeline Blueprints</h2>
          <p className="text-gray-500">Visual lineage and structural dependency mapping.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-white border-dashed">Read Only</Badge>
          <Button variant="outline" size="sm">Export Blueprint</Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="relative h-[400px] w-full bg-[#FAFAFA] overflow-hidden flex items-center justify-center p-12">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />

            {/* Visual Connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#eab308" stopOpacity="0.2" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orientation="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#CBD5E1" />
                </marker>
              </defs>
              {/* Flow Lines */}
              <motion.path
                d="M 200,200 L 700,200"
                stroke="url(#grad-line)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8,8"
                animate={{ strokeDashoffset: -100 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </svg>

            <div className="relative flex items-center justify-between w-full max-w-4xl z-10">
              {stages.map((stage, idx) => (
                <div key={stage.id} className="flex items-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onMouseEnter={() => setActiveStage(stage.id)}
                    onMouseLeave={() => setActiveStage(null)}
                    className={`relative p-6 rounded-2xl border-2 bg-white flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 shadow-sm ${
                      activeStage === stage.id ? 'ring-4 ring-blue-100 border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <div className={`p-4 rounded-xl ${getStageColor(stage.color)}`}>
                      <stage.icon className="w-8 h-8" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-wider">{stage.label}</span>
                    
                    {/* Status Dot */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white" />
                  </motion.div>

                  {idx < stages.length - 1 && (
                    <div className="px-12 flex flex-col items-center gap-2">
                       <ArrowRight className="w-6 h-6 text-gray-300" />
                       <span className="text-[10px] items-center uppercase font-bold text-gray-400">Syncing</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 p-6 flex items-center justify-between bg-white">
            <div className="flex gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Active Links</p>
                <p className="text-xl font-bold">12 / 12</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Avg. Topology Latency</p>
                <p className="text-xl font-bold">2.4ms</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Redundancy Factor</p>
                <p className="text-xl font-bold">3x</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" />
              TOPOLOGY IS HEALTHY
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-500" />
              Inventory & Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {stages.map(s => (
              <div key={s.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-md ${getStageColor(s.color)}`}>
                    <s.icon className="w-3 h-3" />
                  </div>
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                <div className="flex gap-1">
                   {s.items.map(item => (
                     <Badge key={item} variant="secondary" className="text-[10px] text-gray-500">{item}</Badge>
                   ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2">
              <Zap className="w-4 h-4" />
               Blueprint Logic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-blue-100 leading-relaxed">
              This blueprint represents the standard global extraction pattern. All Salesforce records (src) are normalized via dbt (tra) before being landed in Snowflake (loa).
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Edit Flow</Button>
              <Button size="sm" variant="secondary" className="bg-white/10 text-white border-white/20 hover:bg-white/20">Simulation</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
