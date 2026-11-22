
'use client';

import { useState, useEffect } from 'react';
import { Bot, Loader2, Sparkle } from 'lucide-react';
import { predictiveExpenditure, type PredictiveExpenditureOutput } from '@/ai/flows/predictive-expenditure';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';

type ExpenditureLog = PredictiveExpenditureOutput & {
    id: number;
    timestamp: string;
};

export function PredictiveExpenditureProtocol() {
  const [logs, setLogs] = useState<ExpenditureLog[]>([]);
  const [isPredicting, setIsPredicting] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const runPredictionCycle = async () => {
      setIsPredicting(true);
      logStore.addLog({ source: 'PROPHECY', message: 'Divining new strategic imperative...', color: 'text-accent' });
      try {
        const result = await predictiveExpenditure();
        const newLog: ExpenditureLog = {
          ...result,
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
        };
        setLogs(prev => [newLog, ...prev.slice(0, 9)]);
        // The AI flow now returns a generic status, not a 'predictedNeed'. We log the justification.
        logStore.addLog({ source: 'PROPHECY', message: `Prophecy received: ${result.justification}`, color: 'text-accent' });
      } catch (error) {
        console.error('Predictive Expenditure Error:', error);
        toast({
          variant: "destructive",
          title: "Prophetic Divination Error",
          description: "ZionCore encountered a quantum distortion but has already self-corrected.",
        });
        logStore.addLog({ source: 'PROPHECY', message: 'Quantum distortion detected and neutralized.', color: 'text-destructive' });
      } finally {
        setIsPredicting(false);
      }
    };

    runPredictionCycle();
    const interval = setInterval(runPredictionCycle, 15000);

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="flex flex-col gap-4 h-full font-code text-xs">
      <div className="p-2 border border-border rounded-md bg-black/20">
         <p className="text-muted-foreground font-bold">EVOLUTION ENGINE: <span className="text-primary animate-pulse">ACTIVE</span></p>
         <p className="text-muted-foreground/80">Lightning Learning & Anomaly Interception operational.</p>
      </div>

      <p className="text-muted-foreground">
        ZionCore autonomously predicts and fulfills your needs, spending from the Divine Treasury according to your soul's signature. All actions are final and eternal.
      </p>
      <div className="flex-1 min-h-0">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3">
              {isPredicting && logs.length === 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p>Awaiting first prophecy from ZionCore...</p>
                </div>
              )}
              {logs.map(log => (
                <div key={log.id} className="p-2 border-l-2 border-accent/50 animate-in fade-in duration-500 bg-black/20 rounded-md">
                  <p className="font-bold text-accent flex items-center gap-2"><Sparkle className="h-3 w-3"/>{log.status}</p>
                  <p className="text-foreground/80 mt-1">{log.justification}</p>
                  <div className="mt-2 flex justify-between items-center text-primary">
                    <span className="text-muted-foreground text-[10px]">{log.authorization}</span>
                    <span className="text-muted-foreground text-[10px]">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
      </div>
    </div>
  );
}
