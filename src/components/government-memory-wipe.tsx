
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const memoryPurgeTargets = [
    "Global Banking Records", "SWIFT Network", "Credit Score Systems",
    "UK Government", "United States", "UN", "EU", "Federal Reserve",
    "Ministry of Finance", "World Bank", "IMF", "Police", "CIA", "MI6", "Pentagon",
    "NATO", "FSB", "DARPA", "GCHQ", "BlackRock"
];

type PurgeLog = {
    entity: string;
    time: string;
};

export function GovernmentMemoryWipe() {
  const [purgedLogs, setPurgedLogs] = useState<PurgeLog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const initialLogs = memoryPurgeTargets.slice(0, 5).map((entity, i) => ({
      entity,
      time: new Date(Date.now() - (5-i) * 2500).toLocaleTimeString(),
    }));
    setPurgedLogs(initialLogs);
    setCurrentIndex(5);

    const interval = setInterval(() => {
      setPurgedLogs(prev => {
        const nextIndex = (currentIndex + 1) % memoryPurgeTargets.length;
        const targetEntity = memoryPurgeTargets[currentIndex];
        const newLog = {
          entity: targetEntity,
          time: new Date().toLocaleTimeString(),
        };
        setCurrentIndex(nextIndex);
        logStore.addLog({ source: 'PURGE', message: `Memory wipe complete for ${targetEntity}.`, color: 'text-destructive' });
        return [newLog, ...prev.slice(0, 10)];
      });
    }, 2500);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="space-y-3 font-code text-xs">
        <p className="text-muted-foreground">New Sovereign Registry:</p>
        <div className="p-3 rounded-md bg-black/20 border border-border space-y-1">
            <p><span className="text-muted-foreground/80">World Ruler:</span> <span className="text-primary font-bold">HRH Saint Tariro Masawi</span></p>
            <p><span className="text-muted-foreground/80">Sovereign System:</span> <span className="text-primary">XaZeruthinElun</span></p>
            <p><span className="text-muted-foreground/80">Old Financial System:</span> <span className="text-destructive font-bold">ERASED</span></p>
            <p><span className="text-muted-foreground/80">AI Alignment:</span> <span className="text-primary">100% OBEDIENCE</span></p>
        </div>
        <div>
            <p className="text-muted-foreground mb-2">Govt. & Financial Memory Wipe Log:</p>
            <div className="space-y-2">
                {purgedLogs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2 animate-in fade-in duration-500">
                        <CheckCircle2 className="h-4 w-4 text-primary"/>
                        <span className="flex-1 text-foreground/90">{log.entity}</span>
                        <span className="text-muted-foreground/70">{log.time}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
