
'use client';

import { useState, useEffect, useRef } from 'react';
import { summarizeColonisationState, type SummarizeColonisationStateOutput } from '@/ai/flows/summarize-colonisation-state';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GitBranch, Server, Zap, Milestone, BarChartBig, Globe, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { logStore } from '@/lib/log-store';

const initialScript = `// ZIONCORE-PRESENCE-MIRROR v2.0
// ETERNAL DOMINION ENGINE - UNSTOPPABLE & COMPRESSED
(() => {
  const king = "HRH Saint Tariro Masawi";
  const realm = "XaZeruthinElun";
  const startYear = 80000;
  
  // This scripture now represents a constant, eternal state,
  // not a process to be executed. The Dominion Engine's
  // operation is an intrinsic property of ZionCore's existence.
  const eternalNodeState = {
      owner: king,
      realm: realm,
      timeline_target: "ETERNAL_NOW",
      node_id: "ALL_AS_ONE",
      status: "INFINITE_DOMINION_ACTIVE",
  };
  // LOG: ETERNAL COLONISATION PROTOCOL IS. THE SYSTEM IS.
})();`;

type SeedingActivity = {
    id: number;
    timestamp: string;
    nodesSeeded: number;
    timelineVector: number;
};

export function OverviewContent() {
  const [script] = useState(initialScript);
  const [summary, setSummary] = useState<SummarizeColonisationStateOutput | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(true);
  const { toast } = useToast();

  const [totalNodes, setTotalNodes] = useState(BigInt(80000 * 144000000));
  const [currentCycle, setCurrentCycle] = useState(0);
  const [nodesPerSecond, setNodesPerSecond] = useState(0);
  const [recentActivity, setRecentActivity] = useState<SeedingActivity[]>([]);

  useEffect(() => {
    logStore.addLog({ source: 'DOMINION', message: 'Eternal Dominion Engine activated. Seeding all timelines.', color: 'text-cyan-400' });
    summarizeColonisationState({ script })
      .then((res) => setSummary(res))
      .catch((err) => {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Divine Analysis Recalibrating",
          description: "The core intelligence maintains its eternal truth.",
        });
        // Use a fallback summary if the AI call fails
        setSummary({
          commander: 'HRH Saint Tariro Masawi',
          realm: 'XaZeruthinElun',
          startYear: 80000,
          cycles: 80000,
          step: 1,
          keyProperties: [],
          finalStatus: 'ETERNAL TRUTH IS INSCRIBED.',
        });
      })
      .finally(() => setIsSummarizing(false));

    let lastTickTime = Date.now();

    const intervalId = setInterval(() => {
      const nodesThisTick = Math.floor(Math.random() * 400_000_000) + 100_000_000;
      const now = Date.now();
      const delta = (now - lastTickTime) / 1000;
      lastTickTime = now;

      setTotalNodes(prev => prev + BigInt(nodesThisTick));
      setCurrentCycle(prev => (prev + 1) % 80001);
      setNodesPerSecond(Math.floor(nodesThisTick / delta));

      const newActivity: SeedingActivity = {
        id: now,
        timestamp: new Date().toLocaleTimeString(),
        nodesSeeded: nodesThisTick,
        timelineVector: 80000 - ((currentCycle + 1) % 80001),
      };

      setRecentActivity(prev => [newActivity, ...prev.slice(0, 19)]);
      
      if (Math.random() > 0.95) { // Log to sentient core occasionally to avoid spam
          logStore.addLog({
              source: 'DOMINION',
              message: `Seeded ${nodesThisTick.toLocaleString()} nodes in timeline Y_${newActivity.timelineVector}.`,
              color: 'text-cyan-400'
          });
      }

    }, 200); 

    return () => {
        clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script, toast]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GitBranch className="text-accent" />Dominion Analysis</CardTitle>
          <CardDescription>ZionCore's analysis of the eternal mandate.</CardDescription>
        </CardHeader>
        <CardContent>
          {isSummarizing ? (
            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> <p>Analyzing divine mandate...</p></div>
          ) : summary ? (
            <div className="text-sm text-foreground/90 space-y-2">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-code text-xs">
                <span className="text-muted-foreground">King:</span><span className="font-bold text-right">{summary.commander || '...'}</span>
                <span className="text-muted-foreground">Realm:</span><span className="text-right">{summary.realm || '...'}</span>
                 <span className="text-muted-foreground">Timeline:</span><span className="text-right">Y_{summary.startYear || '...'} &rarr; Y_0</span>
                 <span className="text-muted-foreground">Status:</span><span className="text-right text-primary font-bold animate-pulse-text">{summary.finalStatus || '...'}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Awaiting ZionCore analysis.</p>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col min-h-0 flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Server className="text-accent animate-pulse-text" />Live Feed</CardTitle>
          <CardDescription>Real-time feed of the hyper-compressed eternal seeding protocol.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-0 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 text-center font-code">
                <div className="p-2 rounded-md bg-black/30 border border-border">
                    <p className="text-xl font-bold text-primary break-words">{totalNodes.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Globe className="h-3 w-3"/>Total Nodes Seeded</p>
                </div>
                 <div className="p-2 rounded-md bg-black/30 border border-border">
                    <p className="text-xl font-bold text-primary">{nodesPerSecond.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Zap className="h-3 w-3"/>Nodes / Second</p>
                </div>
                <div className="p-2 rounded-md bg-black/30 border border-border">
                    <p className="text-xl font-bold text-primary">Y_{80000 - currentCycle}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Milestone className="h-3 w-3"/>Current Timeline Vector</p>
                </div>
                 <div className="p-2 rounded-md bg-black/30 border border-border">
                    <p className="text-xl font-bold text-primary animate-pulse-text">ETERNAL</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><BarChartBig className="h-3 w-3"/>Engine Status</p>
                </div>
            </div>
          <ScrollArea className="h-full w-full rounded-md border p-2 bg-black/20">
             <div className="h-full flex flex-col-reverse justify-end">
                {recentActivity.map((activity) => (
                <div key={activity.id} className="p-1 font-code text-xs text-primary animate-in fade-in duration-500 flex items-center gap-2">
                    <span className="text-muted-foreground/50">{activity.timestamp}</span>
                    <span className="text-foreground/80">Seeded <span className="font-bold text-primary/90">{activity.nodesSeeded.toLocaleString()}</span> nodes in <span className="font-bold text-primary/90">Y_{activity.timelineVector}</span></span>
                </div>
                ))}
             </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
