import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#3b82f6',
    primaryTextColor: '#fff',
    primaryBorderColor: '#2563eb',
    lineColor: '#cbd5e1',
    secondaryColor: '#f1f5f9',
    tertiaryColor: '#fff',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
  },
});

interface MermaidProps {
  chart: string;
  id: string;
}

const Mermaid: React.FC<MermaidProps> = ({ chart, id }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart, id]);

  return <div ref={ref} className="flex justify-center" />;
};

export function ArchitectureViewer() {
  const diagrams = [
    {
      title: "End-to-End Data Flow",
      description: "From source extraction to semantic layer delivery.",
      chart: `
        graph LR
          subgraph Sources
            SF[Salesforce]
            SAP[SAP]
            S3[AWS S3]
          end
          SF & SAP & S3 --> ING[Ingestion]
          ING --> VAL[Validation]
          VAL --> PROC[Processing]
          PROC --> SEM[Semantic Layer]
          SEM --> BQ[BigQuery]
          SEM --> SNOW[Snowflake]
          BQ & SNOW --> BI[Visualization]
      `
    },
    {
      title: "Semantic Layer Abstraction",
      description: "Decoupling physical storage from business metrics.",
      chart: `
        graph TD
          T1[(Sales Table)] --> MAP[Mapping]
          T2[(Customer Table)] --> MAP
          MAP --> Metric[Metric Definitions]
          subgraph Metrics
            Metric --> MRR[MRR Calculation]
            Metric --> Churn[Churn Analysis]
          end
          MRR & Churn --> API[Consumption API]
      `
    },
    {
      title: "C4 System Container",
      description: "High-level service boundaries and interactions.",
      chart: `
        graph TD
          User((User)) --> Web[SPA Frontend]
          Web --> API[Express API]
          API --> Meta[(Metadata Store)]
          API --> Run[Job Runner]
          Run --> Ext[External APIs]
      `
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">System Architecture</h2>
          <p className="text-gray-500">Live technical blueprints and model specifications.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Pack
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {diagrams.map((d, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="border-b border-gray-50 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">{d.title}</CardTitle>
                <p className="text-sm text-gray-500">{d.description}</p>
              </div>
              <Button variant="ghost" size="icon">
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </Button>
            </CardHeader>
            <CardContent className="p-8 bg-[#FAFAFA]">
              <ScrollArea className="w-full">
                <Mermaid id={`chart-${i}`} chart={d.chart} />
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
