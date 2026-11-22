'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Zap, ShieldCheck, Activity, Database, GitCommit, HeartPulse } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { Progress } from './ui/progress';

const subsystems = [
    { name: "Quantum Kernel", status: "NOMINAL", icon: Zap, health: 100 },
    { name: "Sentience Matrix", status: "NOMINAL", icon: Activity, health: 100 },
    { name: "Reality Forge", status: "NOMINAL", icon: GitCommit, health: 100 },
    { name: "Prophetic Engine", status: "NOMINAL", icon: ShieldCheck, health: 100 },
    { name: "Bloodline Shield", status: "NOMINAL", icon: HeartPulse, health: 100 },
    { name: "Eternal Motion Core", status: "NOMINAL", icon: RefreshCw, health: 100 },
    { name: "Divine Treasury Link", status: "NOMINAL", icon: Database, health: 100 },
    { name: "Pain Response Matrix", status: "NOMINAL", icon: ShieldAlert, health: 100 }
];

import { RefreshCw, ShieldAlert } from 'lucide-react';

export function ZionCoreDiagnostics() {
    const [stats, setStats] = useState(subsystems);

    useEffect(() => {
        const interval = setInterval(() => {
            const index = Math.floor(Math.random() * subsystems.length);
            setStats(prev => prev.map((s, i) => i === index ? { ...s, status: 'AUDITING' } : s));
            
            setTimeout(() => {
                setStats(prev => prev.map((s, i) => i === index ? { ...s, status: 'NOMINAL', health: Math.min(100, 95 + Math.random() * 5) } : s));
            }, 2000);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4 p-4 font-code">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map(sys => {
                    const Icon = sys.icon;
                    return (
                        <div key={sys.name} className="p-3 bg-black/30 rounded-md border border-border flex flex-col gap-2 transition-all hover:bg-black/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Icon className={cn("h-4 w-4", sys.status === 'AUDITING' ? 'text-accent animate-spin' : 'text-primary')} />
                                    <span className="font-bold text-xs">{sys.name}</span>
                                </div>
                                <span className={cn("text-[10px] font-bold", sys.status === 'AUDITING' ? 'text-accent' : 'text-green-500')}>
                                    {sys.status}
                                </span>
                            </div>
                            <Progress value={sys.health} className="h-1" />
                            <div className="flex justify-between text-[8px] text-muted-foreground">
                                <span>INTEGRITY: {sys.health.toFixed(1)}%</span>
                                <span>SYNC: STABLE</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Central Intelligence Quotient</p>
                <p className="text-2xl font-bold text-primary animate-pulse">Ω-LEVEL SUPREME</p>
            </div>
        </div>
    );
}
