
'use client';

import { useState, useEffect, useRef } from 'react';
import type { ElementType } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { logStore } from '@/lib/log-store';
import { Flame, Banknote, HeartPulse, Crown, Sparkles, Infinity as InfinityIcon, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const DIVINE_SCRIPTS = [
    { id: 'fire', name: 'Script of Fire', icon: Flame, color: 'text-orange-500' },
    { id: 'abundance', name: 'Script of Abundance', icon: Banknote, color: 'text-green-500' },
    { id: 'life', name: 'Script of Life', icon: HeartPulse, color: 'text-rose-500' },
    { id: 'dominance', name: 'Script of Dominance', icon: Crown, color: 'text-yellow-400' },
    { id: 'blessed', name: 'Script of the Blessed', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'eternity', name: 'Script of Eternity', icon: InfinityIcon, color: 'text-purple-400' },
    { id: 'holiness', name: 'Script of Holiness', icon: ShieldCheck, color: 'text-white' },
];

type ScriptStatus = 'SEALED' | 'CHARGING' | 'ACTIVE';

export function AncestralCovenantProtocol() {
    const [statuses, setStatuses] = useState<Record<string, ScriptStatus>>(
        Object.fromEntries(DIVINE_SCRIPTS.map(s => [s.id, 'SEALED']))
    );
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const cycleInterval = setInterval(() => {
            if (!isMounted.current) return;
            
            const randomIndex = Math.floor(Math.random() * DIVINE_SCRIPTS.length);
            const scriptToCycle = DIVINE_SCRIPTS[randomIndex];

            setStatuses(prev => ({...prev, [scriptToCycle.id]: 'CHARGING' }));
            logStore.addLog({ source: 'SYSTEM', message: `Recharging ${scriptToCycle.name}...`, color: 'text-yellow-400' });
            
            setTimeout(() => {
                if (!isMounted.current) return;
                setStatuses(prev => ({...prev, [scriptToCycle.id]: 'ACTIVE' }));
                logStore.addLog({ source: 'SYSTEM', message: `${scriptToCycle.name} is now ACTIVE.`, color: scriptToCycle.color });

                setTimeout(() => {
                    if (!isMounted.current) return;
                    setStatuses(prev => ({...prev, [scriptToCycle.id]: 'SEALED' }));
                }, 3000);
            }, 2000);

        }, 8000);

        return () => {
            isMounted.current = false;
            clearInterval(cycleInterval);
        };
    }, []);

    const getStatusIndicator = (status: ScriptStatus, color: string) => {
        switch (status) {
            case 'CHARGING':
                return <span className={`flex items-center gap-1.5 font-bold text-yellow-400`}><Loader2 className="h-3 w-3 animate-spin"/>CHARGING...</span>;
            case 'ACTIVE':
                return <span className={`flex items-center gap-1.5 font-bold ${color}`}><Sparkles className="h-3 w-3 animate-pulse"/>ACTIVE</span>;
            case 'SEALED':
            default:
                return <span className="flex items-center gap-1.5 font-bold text-green-500"><CheckCircle2 className="h-3 w-3"/>SEALED</span>;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-yellow-400" />
                    The Seven Divine Scripts
                </CardTitle>
                <CardDescription>The living architecture of your amplified power, infused into ZionCore.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {DIVINE_SCRIPTS.map(script => (
                    <div key={script.id} className="p-2 rounded-md bg-black/20 border border-border/50">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <script.icon className={`h-5 w-5 ${script.color}`} />
                                <span className="font-bold text-sm text-foreground/90">{script.name}</span>
                            </div>
                            <div className="text-xs">
                                {getStatusIndicator(statuses[script.id], script.color)}
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
