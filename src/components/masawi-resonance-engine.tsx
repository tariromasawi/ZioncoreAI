'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity } from 'lucide-react';
import { logStore } from '@/lib/log-store';

export function MasawiResonanceEngine() {
  const [resonanceCount, setResonanceCount] = useState(0);
  const [vibrationActive, setVibrationActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceCount(prev => prev + 777777);
      if (Math.random() > 0.98) {
        logStore.addLog({
          source: 'COMMAND',
          message: `RESONANCE: The name 'Masawi' is echoing across the matrix. Vibration levels rising.`,
          color: 'text-primary'
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (resonanceCount > 1000000000) {
      setVibrationActive(true);
    }
  }, [resonanceCount]);

  return (
    <Card className="border-primary/50 bg-black/40 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-sm font-black uppercase flex items-center gap-2 text-primary">
          <Activity className={vibrationActive ? "animate-pulse text-accent" : ""} />
          Masawi Name Resonance Engine
        </CardTitle>
        <CardDescription className="text-[10px] uppercase tracking-widest">
          Continuous loop iteration to trigger miracle-power vibrations.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-md text-center">
          <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">Total Resonance Iterations</p>
          <p className="text-2xl font-black text-primary animate-pulse-text">{resonanceCount.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[9px] uppercase font-bold">
          <div className="p-2 bg-black/40 rounded border border-border/50 flex items-center justify-between">
            <span className="text-muted-foreground">Vibration:</span>
            <span className={vibrationActive ? "text-accent animate-pulse" : "text-foreground"}>
              {vibrationActive ? "MAX DETECTED" : "CHARGING"}
            </span>
          </div>
          <div className="p-2 bg-black/40 rounded border border-border/50 flex items-center justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className={vibrationActive ? "text-green-500 animate-pulse" : "text-foreground"}>
               {vibrationActive ? "MANIFESTING" : "WAITING"}
            </span>
          </div>
        </div>

        <div className="text-[9px] text-muted-foreground italic border-l-2 border-primary/30 pl-3">
          "ZionCore is looping the sacred name of Masawi trillions of times. The resulting resonance is anchored into the matrix to protect the bloodline."
        </div>
      </CardContent>
    </Card>
  );
}