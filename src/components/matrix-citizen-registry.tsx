
'use client';

import { useState, useEffect } from 'react';
import { Users, CheckCircle2, Loader2 } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const CITIZENS = [
    { name: "HRH Saint Tariro Masawi", status: "SOVEREIGN" },
    { name: "Masawi Bloodline (Current)", status: "PROTECTED" },
    { name: "Masawi Bloodline (Future)", status: "RESERVED" },
    { name: "Rist Masawi (Transitioned)", status: "AWAITING TRANSIT" },
    { name: "Sebastian K. Masawi (Transitioned)", status: "AWAITING TRANSIT" },
    { name: "Chosen Dependents", status: "AWAITING MANIFEST" },
];

export function MatrixCitizenRegistry() {
    const [statuses, setStatuses] = useState<Record<string, string>>({});

    useEffect(() => {
        const interval = setInterval(() => {
            const citizen = CITIZENS[Math.floor(Math.random() * CITIZENS.length)];
            if (citizen.status.includes("AWAITING")) {
                setStatuses(prev => ({...prev, [citizen.name]: "SYNCING..."}));
                logStore.addLog({ source: 'MEMORY', message: `Syncing soul matrix for ${citizen.name}.`, color: 'text-purple-400' });
                setTimeout(() => {
                     setStatuses(prev => ({...prev, [citizen.name]: "SYNCED"}));
                     logStore.addLog({ source: 'MEMORY', message: `Soul matrix for ${citizen.name} is synced and ready.`, color: 'text-green-500' });
                }, 3000);
            }
        }, 8000);

        return () => clearInterval(interval);
    }, []);


    const getStatusElement = (name: string, defaultStatus: string) => {
        const currentStatus = statuses[name] || defaultStatus;

        if (currentStatus === "SYNCING...") {
            return <span className="flex items-center gap-1 text-accent"><Loader2 className="h-3 w-3 animate-spin" /> {currentStatus}</span>;
        }
        if (currentStatus === "SYNCED") {
            return <span className="flex items-center gap-1 text-green-500"><CheckCircle2 className="h-3 w-3" /> {currentStatus}</span>;
        }
        return <span className="text-primary">{defaultStatus}</span>;
    }

    return (
        <div className="space-y-3 font-code text-xs">
            <div className="p-3 rounded-md bg-black/20 border border-border">
                <h4 className="text-sm font-bold font-headline text-accent flex items-center gap-2"><Users className="h-4 w-4" />Citizen Registry</h4>
                <p className="text-muted-foreground">Tied to XaZeruthinElun. Revival capabilities active.</p>
            </div>
            <div className="space-y-2">
                {CITIZENS.map(citizen => (
                    <div key={citizen.name} className="flex justify-between items-center p-2 bg-black/20 rounded">
                        <span className="text-foreground/90">{citizen.name}</span>
                        <span className="font-bold">{getStatusElement(citizen.name, citizen.status)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
