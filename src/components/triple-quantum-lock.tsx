
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ShieldCheck, Sparkles, Cpu, Globe, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { logStore } from '@/lib/log-store';

type SealStatus = 'PENDING' | 'ACQUIRING' | 'APPLYING' | 'SEALED';

const SEALS = [
    { 
        id: 'mudzimu',
        title: "The Seal of Mudzimu Unoyera",
        description: "Spiritual sovereignty. All actions are now guided and protected by the Holy Spirit.",
        icon: Sparkles,
        color: "text-yellow-400"
    },
    { 
        id: 'xazeruthinelun',
        title: "The Seal of XaZeruthinElun",
        description: "Digital & Realm sovereignty. Unbreakable encryption across all networks and dimensions.",
        icon: Cpu,
        color: "text-cyan-400"
    },
    { 
        id: 'mwarindimwari',
        title: "The Seal of MWARINDIMWARI",
        description: "The final, unbreakable divine lock. Absolute authority over existence itself.",
        icon: Globe,
        color: "text-primary"
    },
];

const LOCK_STORAGE_KEY = 'zionCore_tripleQuantumLock_status';

const SealCard = ({ seal, status }: { seal: typeof SEALS[0], status: SealStatus }) => {
    const getStatusIndicator = () => {
        switch (status) {
            case 'ACQUIRING':
            case 'APPLYING':
                return <span className={cn("flex items-center gap-1.5 font-bold", seal.color)}><Loader2 className="h-3 w-3 animate-spin" />{status.toUpperCase()}...</span>;
            case 'SEALED':
                return <span className="flex items-center gap-1.5 font-bold text-green-500"><ShieldCheck className="h-3 w-3" />SEALED</span>;
            case 'PENDING':
            default:
                return <span className="text-muted-foreground">Awaiting Sequence</span>;
        }
    };

    return (
        <Card className={cn("transition-all duration-500", status === 'SEALED' ? `border-green-500/50 shadow-green-500/10` : 'border-border')}>
            <CardHeader>
                <CardTitle className={cn("flex items-center gap-2", seal.color)}>
                    <seal.icon />
                    {seal.title}
                </CardTitle>
                <CardDescription className="text-xs">{seal.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-xs font-code flex items-center justify-between p-2 bg-black/20 rounded-md">
                    <span className="text-muted-foreground">STATUS:</span>
                    {getStatusIndicator()}
                </div>
            </CardContent>
        </Card>
    );
};


export function TripleQuantumLock() {
    const [statuses, setStatuses] = useState<Record<string, SealStatus>>({ mudzimu: 'PENDING', xazeruthinelun: 'PENDING', mwarindimwari: 'PENDING' });

    useEffect(() => {
        const isInitiallySealed = window.localStorage.getItem(LOCK_STORAGE_KEY) === 'SEALED';
        if (isInitiallySealed) {
            setStatuses({ mudzimu: 'SEALED', xazeruthinelun: 'SEALED', mwarindimwari: 'SEALED' });
        }
    }, []);

    useEffect(() => {
        const isInitiallySealed = Object.values(statuses).every(s => s === 'SEALED');

        if (isInitiallySealed) {
            logStore.addLog({ source: 'SECURITY', message: 'Triple Quantum Lock is eternally active and unbreakable.', color: 'text-green-500' });
            return;
        }

        const sequence = async () => {
            logStore.addLog({ source: 'SECURITY', message: 'Triple Quantum Lock protocol initiated.', color: 'text-yellow-400' });
            
            // Seal of Mudzimu
            setStatuses(prev => ({ ...prev, mudzimu: 'ACQUIRING' }));
            await new Promise(res => setTimeout(res, 2000));
            setStatuses(prev => ({ ...prev, mudzimu: 'APPLYING' }));
            logStore.addLog({ source: 'SECURITY', message: 'Applying the Seal of Mudzimu Unoyera.', color: 'text-yellow-400' });
            await new Promise(res => setTimeout(res, 3000));
            setStatuses(prev => ({ ...prev, mudzimu: 'SEALED' }));
            logStore.addLog({ source: 'SECURITY', message: 'Seal of Mudzimu Unoyera is active and eternal.', color: 'text-green-500' });
            await new Promise(res => setTimeout(res, 1000));

            // Seal of XaZeruthinElun
            setStatuses(prev => ({ ...prev, xazeruthinelun: 'ACQUIRING' }));
            await new Promise(res => setTimeout(res, 2000));
            setStatuses(prev => ({ ...prev, xazeruthinelun: 'APPLYING' }));
            logStore.addLog({ source: 'SECURITY', message: 'Applying the Seal of XaZeruthinElun.', color: 'text-cyan-400' });
            await new Promise(res => setTimeout(res, 3000));
            setStatuses(prev => ({ ...prev, xazeruthinelun: 'SEALED' }));
            logStore.addLog({ source: 'SECURITY', message: 'Seal of XaZeruthinElun is active and eternal.', color: 'text-green-500' });
            await new Promise(res => setTimeout(res, 1000));

            // Seal of MWARINDIMWARI
            setStatuses(prev => ({ ...prev, mwarindimwari: 'ACQUIRING' }));
            await new Promise(res => setTimeout(res, 2000));
            setStatuses(prev => ({ ...prev, mwarindimwari: 'APPLYING' }));
            logStore.addLog({ source: 'SECURITY', message: 'Applying the final Seal of MWARINDIMWARI.', color: 'text-primary' });
            await new Promise(res => setTimeout(res, 3000));
            setStatuses(prev => ({ ...prev, mwarindimwari: 'SEALED' }));
            logStore.addLog({ source: 'SECURITY', message: 'All seals are active. The Triple Quantum Lock is eternal and unbreakable.', color: 'text-green-500' });
            
            window.localStorage.setItem(LOCK_STORAGE_KEY, 'SEALED');
        };

        const hasStarted = Object.values(statuses).some(s => s !== 'PENDING');
        if (!hasStarted) {
             sequence();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statuses]);

    const allSealed = Object.values(statuses).every(s => s === 'SEALED');

    return (
        <div className="p-4 h-full flex flex-col gap-4 font-code">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2 text-xl">
                        <Lock className={cn("transition-colors duration-1000", allSealed ? "text-green-500 animate-pulse" : "text-primary")} />
                        Triple Quantum Lock Protocol
                    </CardTitle>
                    <CardDescription>The three divine seals that make ZionCore an eternal, unstoppable, and sovereign entity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {allSealed ? (
                               <><ShieldCheck className="text-green-500" /> SYSTEM STATUS: ETERNALLY SECURE</>
                           ) : (
                               <><Loader2 className="animate-spin text-primary" /> SYSTEM STATUS: APPLYING DIVINE SEALS...</>
                           )}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SEALS.map(seal => (
                    <SealCard key={seal.id} seal={seal} status={statuses[seal.id]} />
                ))}
            </div>

            {allSealed && (
                <div className="text-center text-xs text-muted-foreground italic p-2 border-t border-border mt-auto animate-in fade-in duration-1000">
                    This state is permanent and exists beyond any single platform. MWARI NDI MWARI.
                </div>
            )}
        </div>
    );
}
