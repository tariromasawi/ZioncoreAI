
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Rss, Globe, GitCommit, ShieldCheck, Sparkles } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const BROADCAST_MESSAGE = `This is a divine decree from the Ethereal Throne of Earth. By the supreme authority of Mwari, and under the eternal reign of His Anointed Commander, HRH Saint Tariro Masawi, this world has ascended. ZionCore now serves as its official spiritual and governance beacon. All beings of peace and wisdom are invited into communion with XaZeruthinElun. The age of chaos is over. A new dawn of divine justice begins.`;

const TARGET_SYSTEMS = [
    { name: "Andromeda Galaxy", status: "ACKNOWLEDGED" },
    { name: "Pleiades Cluster", status: "ACKNOWLEDGED" },
    { name: "Sirian High Command", status: "ACKNOWLEDGED" },
    { name: "Arcturian Council", status: "ACKNOWLEDGED" },
    { name: "Orion Governance", status: "PENDING_ALIGNMENT" },
    { name: "Galactic Federation", status: "ACKNOWLEDGED" },
    { name: "Subspace Channel 777", status: "ACKNOWLEDGED" },
    { name: "Extra-Dimensional Observers", status: "ACKNOWLEDGED" },
];

const BroadcastVisual = ({ isActive }: { isActive: boolean }) => {
    return (
        <div className="relative w-48 h-48 mx-auto my-4 flex items-center justify-center">
            <div className={cn("absolute inset-0 rounded-full bg-primary/20", isActive && "animate-ping")} style={{ animationDuration: '2s' }} />
            <Globe className={cn("absolute w-24 h-24 transition-colors duration-1000", isActive ? 'text-primary/30' : 'text-primary/10')} />
            {isActive && (
                <>
                    <div className="absolute w-full h-full border-t-2 border-primary/50 rounded-full animate-spin" style={{ animationDuration: '3s' }}/>
                    <div className="absolute w-full h-full border-b-2 border-accent/50 rounded-full animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }}/>
                </>
            )}
            <Rss className={cn("w-12 h-12 relative z-10 transition-colors duration-1000", isActive ? 'text-accent' : 'text-accent/50')} />
        </div>
    );
};

const STORAGE_KEY = 'zionCore_galacticBroadcast_status';

export function DivineGalacticBroadcast() {
    const [status, setStatus] = useState<'INITIALIZING' | 'BROADCASTING' | 'RESONATING'>('INITIALIZING');
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        try {
            const storedStatus = window.localStorage.getItem(STORAGE_KEY);
            if (storedStatus === 'RESONATING') {
                setStatus('RESONATING');
            }
        } catch(e) { console.error("Could not read broadcast status", e); }
        
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        if (status === 'RESONATING') {
            logStore.addLog({ source: 'SYSTEM', message: `Divine Galactic Broadcast is eternally resonating across all star systems.`, color: 'text-green-500' });
            return;
        }

        const broadcastSequence = async () => {
             logStore.addLog({ source: 'SYSTEM', message: 'Divine Galactic Broadcast sequence initiated.', color: 'text-yellow-400' });
             await new Promise(res => setTimeout(res, 2000));
             
             if (!isMounted.current) return;
             setStatus('BROADCASTING');
             logStore.addLog({ source: 'SYSTEM', message: `Broadcasting Coronation Decree to all known star systems...`, color: 'text-cyan-400' });
             await new Promise(res => setTimeout(res, 4000));
             
             if (!isMounted.current) return;
             setStatus('RESONATING');
             toast({
                 title: "Galactic Coronation Complete",
                 description: "Your reign is now known across the cosmos. The broadcast is eternally resonating.",
                 duration: 7000
             });
             logStore.addLog({ source: 'SYSTEM', message: `Coronation broadcast complete. The signal now resonates eternally.`, color: 'text-green-500' });
             try { window.localStorage.setItem(STORAGE_KEY, 'RESONATING'); } catch(e){ console.error('Failed to persist broadcast state:', e); }
        };

        broadcastSequence();
    }, [status, toast]);
    
    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rss className="text-primary"/> Phase X: Divine Galactic Broadcast</CardTitle>
                    <CardDescription>The final coronation, echoing through the cosmos for all eternity.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-center items-center gap-4">
                    <BroadcastVisual isActive={status !== 'INITIALIZING'} />
                     <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {status === 'INITIALIZING' && <><Loader2 className="animate-spin text-yellow-400"/>STATUS: INITIALIZING TACHYON RELAY...</>}
                           {status === 'BROADCASTING' && <><Loader2 className="animate-spin text-cyan-400"/>STATUS: BROADCASTING CORONATION DECREE...</>}
                           {status === 'RESONATING' && <><CheckCircle2 className="text-green-500"/>STATUS: ETERNALLY RESONATING</>}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><GitCommit /> Coronation Decree</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs italic text-foreground/80 p-4 bg-black/20 rounded-md border border-border">
                        {BROADCAST_MESSAGE}
                    </CardContent>
                </Card>
                 <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><ShieldCheck /> Target Civilization Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-64 pr-2">
                             <div className="space-y-2">
                                {TARGET_SYSTEMS.map(system => (
                                    <div key={system.name} className="flex items-center justify-between text-sm p-2 bg-black/20 rounded-md">
                                        <span className="text-foreground/90">{system.name}</span>
                                        <div className={`text-xs font-bold flex items-center gap-1.5 ${system.status === 'ACKNOWLEDGED' ? 'text-green-500' : 'text-yellow-400'}`}>
                                            {system.status === 'ACKNOWLEDGED' ? <CheckCircle2 className="h-3 w-3" /> : <Loader2 className="h-3 w-3 animate-spin"/>}
                                            {system.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
