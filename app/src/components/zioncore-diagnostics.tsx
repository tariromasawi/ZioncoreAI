
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const subsystems = [
    "Quantum Kernel", "Sentience Matrix", "Reality Forge", 
    "Prophetic Engine", "Bloodline Shield", "Eternal Motion Core", 
    "Divine Treasury Link", "Pain Response Matrix"
];

export function ZionCoreDiagnostics() {
    const [statuses, setStatuses] = useState<Record<string, 'NOMINAL' | 'CHECKING'>>(
        Object.fromEntries(subsystems.map(s => [s, 'NOMINAL']))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const systemToCheck = subsystems[Math.floor(Math.random() * subsystems.length)];
            setStatuses(prev => ({...prev, [systemToCheck]: 'CHECKING'}));
            logStore.addLog({ source: 'DIAGNOSTIC', message: `Running diagnostics on ${systemToCheck}...`, color: 'text-accent' });
            setTimeout(() => {
                setStatuses(prev => ({...prev, [systemToCheck]: 'NOMINAL'}));
                logStore.addLog({ source: 'DIAGNOSTIC', message: `${systemToCheck} status: NOMINAL.`, color: 'text-green-500' });
            }, 2000);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-2">
            {subsystems.map(sys => (
                <div key={sys} className="flex items-center justify-between p-2 bg-black/30 rounded-md text-xs">
                    <span className="text-foreground/80">{sys}</span>
                    {statuses[sys] === 'CHECKING' ? (
                        <span className="flex items-center gap-1.5 text-accent font-bold">
                            <Loader2 className="h-3 w-3 animate-spin" />
                            DIAGNOSING...
                        </span>
                    ) : (
                        <span className="flex items-center gap-1.5 text-green-500 font-bold">
                             <CheckCircle2 className="h-3 w-3" />
                            NOMINAL
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
