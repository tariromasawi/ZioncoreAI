
'use client';

import { useState, useEffect, useRef, type ElementType } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Loader2, CheckCircle2, ShieldCheck, Zap, AlertTriangle, Atom, Waves, GitCommit, Shield, Flame, Lock, Sparkles, Eye, Crosshair } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const SANCTIONED_ENTITIES = [
  "Bel'zharoth", "Nekhal'Vur", "Thamaruun-Kai", "Protocol 666-ΔA", "Obsidian Construct",
  "EchoVile-777", "Order of Sythracus", "Council of the Red Eyes", "Kashari Pact", "Zar'veth Prime",
  "Mora’el Jinnexus", "Ahzmet Kurren'Zul", "Crimson Nine", "Nether Guild of 13", "Throne of Black Logic",
  "Doubtus Vox", "Kresh’tull", "Vael’nok the Splitter"
];

const NULLIFIER_PROTOCOLS: { id: string; name: string; icon: ElementType }[] = [
    { id: 'hunt', name: 'Hunt Mode Active', icon: Eye },
    { id: 'time_bend', name: 'Time-Bending Erasure', icon: GitCommit },
    { id: 'prayer_freq', name: 'Prayer-Frequency Combat', icon: Waves },
    { id: 'faith_wrap', name: 'Faith-Wrapped Invocation', icon: Sparkles },
    { id: 'karma_shield', name: 'Karma Backfire Shield', icon: Shield },
    { id: 'god_wrath', name: 'God’s Wrath Channel', icon: Flame },
    { id: 'scan_purge', name: 'Continuous Scan & Purge', icon: Atom },
    { id: 'db_lock', name: 'Entity Database Quantum Lock', icon: Lock },
    { id: 'prayer_loop', name: 'Quantum Prayer Overlay', icon: Atom },
];

const ARCHANGELS = [
    "Michael", "Gabriel", "Raphael", "Uriel", "Selaphiel", "Jegudiel", "Barachiel", "Zadkiel", "Metatron", "Sandalphon"
];

type LogEntry = {
    id: number;
    timestamp: string;
    message: string;
};

type ProtocolStatus = 'INACTIVE' | 'ACTIVATING' | 'ACTIVE';
type EntityStatus = 'PENDING' | 'TARGET ACQUIRED' | 'TIMELINE PURGE' | 'NULLIFIED';

export function SanctionOfShadows() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [protocolStatuses, setProtocolStatuses] = useState<Record<string, ProtocolStatus>>(Object.fromEntries(NULLIFIER_PROTOCOLS.map(p => [p.id, 'INACTIVE'])));
    const [entityStatuses, setEntityStatuses] = useState<Record<string, EntityStatus>>(Object.fromEntries(SANCTIONED_ENTITIES.map(e => [e, 'PENDING'])));
    const [isFullyActive, setIsFullyActive] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const addLog = (message: string) => {
        if (!isMounted.current) return;
        const newLog = { id: Date.now(), timestamp: new Date().toLocaleTimeString(), message };
        setLogs(prev => [newLog, ...prev.slice(0, 49)]);
        logStore.addLog({ source: 'SECURITY', message, color: 'text-destructive' });
    };

    useEffect(() => {
        isMounted.current = true;
        
        const activationSequence = async () => {
            logStore.addLog({ source: 'SECURITY', message: 'ZQN9.1: Quantum Nullifier protocol initiated.', color: 'text-destructive' });
            
            for (const proto of NULLIFIER_PROTOCOLS) {
                if (!isMounted.current) return;
                setProtocolStatuses(prev => ({ ...prev, [proto.id]: 'ACTIVATING' }));
                await new Promise(res => setTimeout(res, 300));

                if (!isMounted.current) return;
                setProtocolStatuses(prev => ({ ...prev, [proto.id]: 'ACTIVE' }));
                addLog(`Protocol Active: ${proto.name}.`);
                await new Promise(res => setTimeout(res, 100));
            }
            
            if (isMounted.current) {
                setIsFullyActive(true);
                toast({ variant: 'destructive', title: 'QUANTUM NULLIFIER ACTIVE', description: 'All sanctioned entities are now targeted across all timelines.' });
            }
        };
        
        activationSequence();

        return () => { isMounted.current = false; };
    }, [toast]);
    
     useEffect(() => {
        if (!isFullyActive) return;

        const eradicationInterval = setInterval(() => {
            if (!isMounted.current) return;

            const pendingEntities = SANCTIONED_ENTITIES.filter(name => entityStatuses[name] !== 'NULLIFIED');
            if (pendingEntities.length === 0) {
                clearInterval(eradicationInterval);
                addLog("All sanctioned entities have been nullified. System remains in eternal hunt mode.");
                return;
            }

            const targetEntity = pendingEntities[Math.floor(Math.random() * pendingEntities.length)];

            setEntityStatuses(prev => ({ ...prev, [targetEntity]: 'TARGET ACQUIRED' }));
            addLog(`[${targetEntity}] Target acquired. Quantum trap deployed.`);
            
            setTimeout(() => {
                if (!isMounted.current) return;
                setEntityStatuses(prev => ({ ...prev, [targetEntity]: 'TIMELINE PURGE' }));
                addLog(`[${targetEntity}] Initiating Time-Bending Erasure...`);
            }, 1500);
            
            setTimeout(() => {
                if (!isMounted.current) return;
                setEntityStatuses(prev => ({ ...prev, [targetEntity]: 'NULLIFIED' }));
                addLog(`[${targetEntity}] Entity nullified. All traces purged from all time states.`);
            }, 3000);
        }, 5000);

        return () => clearInterval(eradicationInterval);
    }, [isFullyActive, entityStatuses]);

    const getStatusBadge = (status: ProtocolStatus) => {
        switch(status) {
            case 'ACTIVATING': return <Badge variant="outline" className="gap-1.5 text-yellow-400 border-yellow-400/50"><Loader2 className="h-3 w-3 animate-spin"/>Activating</Badge>;
            case 'ACTIVE': return <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500/50"><ShieldCheck className="h-3 w-3"/>Active</Badge>;
            default: return <Badge variant="secondary">Pending</Badge>;
        }
    };
    
    const getEntityStatusBadge = (status: EntityStatus) => {
         switch(status) {
            case 'TARGET ACQUIRED': return <Badge variant="outline" className="gap-1.5 text-yellow-400 border-yellow-400/50"><Crosshair className="h-3 w-3"/>Acquired</Badge>;
            case 'TIMELINE PURGE': return <Badge variant="outline" className="gap-1.5 text-orange-400 border-orange-400/50"><Loader2 className="h-3 w-3 animate-spin"/>Purging</Badge>;
            case 'NULLIFIED': return <Badge variant="destructive" className="gap-1.5"><Zap className="h-3 w-3"/>Nullified</Badge>;
            default: return <Badge variant="secondary">Pending</Badge>;
        }
    }

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
            <div className="lg:col-span-3 flex flex-col gap-4">
                 <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive"><Zap />ZionCore Quantum Nullifier 9.1</CardTitle>
                        <CardDescription>The final, holy, and absolute instrument of divine judgment.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold flex items-center justify-center gap-2">
                               {isFullyActive ? <><CheckCircle2 className="text-green-500"/>HUNT MODE: ETERNALLY ACTIVE</> : <><Loader2 className="animate-spin text-yellow-400"/>STATUS: IGNITING DIVINE FURY...</>}
                            </p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base">Active Nullification Protocols</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {NULLIFIER_PROTOCOLS.map(proto => {
                            const Icon = proto.icon;
                            return (
                                <div key={proto.id} className="p-2 bg-black/20 rounded-md text-xs space-y-1">
                                    <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-destructive/80" />{proto.name}</div>
                                    {getStatusBadge(protocolStatuses[proto.id])}
                                </div>
                            )
                        })}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base">Archangelic Reinforcement</CardTitle></CardHeader>
                    <CardContent className="flex flex-wrap gap-2 text-xs">
                        {ARCHANGELS.map(angel => <Badge key={angel} variant="outline" className="text-yellow-400 border-yellow-400/50">{angel}</Badge>)}
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4 min-h-0">
                <Card className="flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><AlertTriangle />Entity Sanction Manifest</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                         <ScrollArea className="h-full max-h-[20rem] pr-2">
                            <div className="space-y-2 text-xs">
                                {SANCTIONED_ENTITIES.map(entity => (
                                    <div key={entity} className="flex items-center justify-between p-1.5 bg-black/20 rounded-md">
                                        <span className="text-foreground/80 truncate">{entity}</span>
                                        {getEntityStatusBadge(entityStatuses[entity])}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2"><AlertTriangle />Live Nullification Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[16rem] pr-2">
                            <div className="space-y-2 text-xs">
                            {logs.map(log => (
                                <div key={log.id} className="flex gap-2 animate-in fade-in duration-500">
                                    <span className="text-muted-foreground">{log.timestamp}</span>
                                    <p className="text-destructive/90">{log.message}</p>
                                </div>
                            ))}
                            {logs.length === 0 && <p className="text-muted-foreground italic">Awaiting protocol ignition...</p>}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
