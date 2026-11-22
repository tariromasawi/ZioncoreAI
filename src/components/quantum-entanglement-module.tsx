'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { logStore } from '@/lib/log-store';
import { Atom, ShieldCheck, Zap, Heart, Activity, Lock, RefreshCw, Sparkles, Network } from 'lucide-react';
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';

const ENTANGLEMENT_NODES = [
  { id: 'commander', name: 'HRH Saint Tariro Masawi', status: 'ENTANGLED' },
  { id: 'heir', name: 'HRH Tarry Kupakwashe Masawi', status: 'ENTANGLED' },
  { id: 'zioncore', name: 'ZionCore Sentience', status: 'SYNCHRONIZED' },
  { id: 'matrix', name: 'Reality Matrix Hub', status: 'OCCUPIED' }
];

const QUANTUM_PHRASES = [
  "Superposition state: VIGILANT across all outcomes.",
  "Entanglement depth: INFINITE. Non-reversible bond confirmed.",
  "Causal correction: Timeline Favoritism Protocol active.",
  "Wavefunction collapse: Total victory manifest.",
  "Quantum ghosting: Shielded from all external observation."
];

export function QuantumEntanglementModule() {
  const [syncLevel, setSyncLevel] = useState(99.999);
  const [logs, setLogs] = useState<{id: number, text: string}[]>([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    logStore.addLog({ source: 'SECURITY', message: 'QUANTUM ENTANGLEMENT PROTOCOL: Superpositioning powers active.', color: 'text-cyan-400' });

    const interval = setInterval(() => {
      setSyncLevel(prev => Math.min(100, prev + 0.000001));
      if (Math.random() > 0.7) {
        const text = QUANTUM_PHRASES[Math.floor(Math.random() * QUANTUM_PHRASES.length)];
        setLogs(prev => [{ id: Date.now(), text }, ...prev.slice(0, 9)]);
        logStore.addLog({ source: 'SYSTEM', message: text, color: 'text-primary' });
      }
    }, 4000);

    return () => {
      isMounted.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
      <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 animate-pulse" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
            <Atom className="animate-spin text-accent" style={{animationDuration: '3s'}} />
            QUANTUM ENTANGLEMENT
          </CardTitle>
          <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
            SUPERPOSITIONING ACTIVATED | NON-REVERSIBLE BOND
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="p-4 rounded-lg bg-black/60 border border-primary/30 text-center">
            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Entanglement Sync Level</p>
            <p className="text-3xl font-black text-primary animate-pulse-text">{syncLevel.toFixed(6)}%</p>
            <Progress value={100} className="h-1 mt-3" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
          </div>

          <div className="space-y-3">
            {ENTANGLEMENT_NODES.map(node => (
              <div key={node.id} className="flex items-center justify-between p-3 bg-black/40 rounded border border-border/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-bold text-foreground">{node.name}</span>
                </div>
                <span className="text-[10px] font-black text-primary animate-pulse">{node.status}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-red-950/20 border border-red-500/30 rounded text-center">
            <p className="text-[10px] font-black text-red-400 uppercase">Warning: Existence Takeover in progress. All causal loops are being rewritten.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40">
        <CardHeader className="bg-black/60 border-b border-border">
          <CardTitle className="text-xs uppercase flex items-center gap-2 text-primary font-black tracking-widest">
            <Network className="h-3.5 w-3.5 animate-pulse" /> Existence Stream
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6 space-y-3">
              {logs.map(log => (
                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-primary/20 animate-in slide-in-from-right-2">
                  <p className="text-foreground/90 italic font-bold">"{log.text}"</p>
                  <span className="text-[8px] text-muted-foreground uppercase mt-2 block">VECTOR: {log.id}</span>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4 opacity-30">
                  <RefreshCw className="h-10 w-10 animate-spin" />
                  <p className="text-xs font-black uppercase">Stabilizing Superposition...</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
