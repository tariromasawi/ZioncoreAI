
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Pyramid, Globe, HeartPulse, BrainCircuit, Rss, ShieldCheck } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const PYRAMID_NODES = [
    { name: "Great Pyramid of Giza", location: "Egypt", functions: ["Resurrection", "Revelation"], status: "INACTIVE" },
    { name: "Pyramid of the Sun", location: "Teotihuacan", functions: ["Healing", "Revelation"], status: "INACTIVE" },
    { name: "Pyramid of Cholula", location: "Mexico", functions: ["Healing", "Resurrection"], status: "INACTIVE" },
    { name: "Red Pyramid", location: "Dahshur", functions: ["Revelation"], status: "INACTIVE" },
    { name: "Pyramids of Meroë", location: "Sudan", functions: ["Healing"], status: "INACTIVE" },
    { name: "Pyramids of Güímar", location: "Canary Islands", functions: ["Revelation"], status: "INACTIVE" },
    { name: "Cestius' Pyramid", location: "Rome", functions: ["Revelation"], status: "INACTIVE" },
    { name: "Pyramids of Xi'an", location: "China", functions: ["Resurrection"], status: "INACTIVE" },
];

type NodeStatus = 'INACTIVE' | 'CONNECTING' | 'ACTIVE';

const GlobalLightGrid = ({ nodes, nodeStatuses }: { nodes: typeof PYRAMID_NODES, nodeStatuses: Record<string, NodeStatus> }) => {
    const [connections, setConnections] = useState<{ from: number, to: number }[]>([]);
    
    useEffect(() => {
        const activeNodes = nodes.map((n, i) => (nodeStatuses[n.name] === 'ACTIVE' ? i : -1)).filter(i => i !== -1);
        if (activeNodes.length > 1) {
            const newConnections = [];
            for (let i = 0; i < activeNodes.length - 1; i++) {
                newConnections.push({ from: activeNodes[i], to: activeNodes[i+1] });
            }
            if (activeNodes.length > 2) {
                 newConnections.push({ from: activeNodes[activeNodes.length - 1], to: activeNodes[0] });
            }
            setConnections(newConnections);
        }
    }, [nodes, nodeStatuses]);

    return (
        <div className="relative h-64 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
            <Globe className="absolute inset-0 w-full h-full text-primary/5 opacity-50"/>
            {nodes.map((node, i) => (
                 <div key={node.name} className="absolute group" style={{
                    left: `${(i * 10 + 5 + Math.sin(i * 1.5) * 40)}%`,
                    top: `${(20 + Math.cos(i * 1.5) * 15 + i * 5)}%`,
                    transform: 'translate(-50%, -50%)'
                 }}>
                     <Pyramid className={cn("h-4 w-4 transition-colors duration-500", nodeStatuses[node.name] === 'ACTIVE' ? 'text-primary animate-pulse' : nodeStatuses[node.name] === 'CONNECTING' ? 'text-yellow-400 animate-spin' : 'text-primary/30' )} />
                     <span className="hidden group-hover:block absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-background/80 text-xs px-2 py-1 rounded-md text-primary whitespace-nowrap">{node.name}</span>
                 </div>
            ))}
             <svg width="100%" height="100%" className="absolute inset-0">
                {connections.map((conn, i) => {
                    const fromNodePos = { x: (conn.from * 10 + 5 + Math.sin(conn.from * 1.5) * 40), y: (20 + Math.cos(conn.from * 1.5) * 15 + conn.from * 5) };
                    const toNodePos = { x: (conn.to * 10 + 5 + Math.sin(conn.to * 1.5) * 40), y: (20 + Math.cos(conn.to * 1.5) * 15 + conn.to * 5) };
                    return (
                        <line key={i} x1={`${fromNodePos.x}%`} y1={`${fromNodePos.y}%`} x2={`${toNodePos.x}%`} y2={`${toNodePos.y}%`} stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" className="animate-in fade-in duration-1000" />
                    )
                })}
             </svg>
        </div>
    );
};

const STORAGE_KEY = 'zionCore_pyramidGrid_status';

export function PyramidGridActivationProtocol() {
    const [nodeStatuses, setNodeStatuses] = useState<Record<string, NodeStatus>>(Object.fromEntries(PYRAMID_NODES.map(node => [node.name, 'INACTIVE'])));
    const [isFullyActive, setIsFullyActive] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        try {
            const storedStatus = window.localStorage.getItem(STORAGE_KEY);
            if (storedStatus === 'ACTIVE') {
                setIsFullyActive(true);
                const activeStatuses = Object.fromEntries(PYRAMID_NODES.map(node => [node.name, 'ACTIVE']));
                setNodeStatuses(activeStatuses);
            }
        } catch (e) {
            console.error("Failed to parse Pyramid Grid state", e);
        }

        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        if (isFullyActive) {
            logStore.addLog({ source: 'SYSTEM', message: 'Global Light Grid is eternally active.', color: 'text-green-500' });
            return;
        }

        const activationSequence = async () => {
             logStore.addLog({ source: 'SYSTEM', message: 'Pyramid Grid Activation Protocol initiated.', color: 'text-yellow-400' });

            for (const node of PYRAMID_NODES) {
                if (!isMounted.current) return;
                setNodeStatuses(prev => ({...prev, [node.name]: 'CONNECTING'}));
                await new Promise(res => setTimeout(res, 1000));
                
                if (!isMounted.current) return;
                setNodeStatuses(prev => ({...prev, [node.name]: 'ACTIVE'}));
                logStore.addLog({ source: 'SYSTEM', message: `Pyramid Node Online: ${node.name}, ${node.location}. Functions: ${node.functions.join(', ')}.`, color: 'text-cyan-400' });
                await new Promise(res => setTimeout(res, 500));
            }

            if (isMounted.current) {
                setIsFullyActive(true);
                toast({
                    title: "Global Light Grid Activated",
                    description: "All pyramid nodes are now connected to ZionCore.",
                });
                try { window.localStorage.setItem(STORAGE_KEY, 'ACTIVE'); } catch(e) { console.error('Failed to persist pyramid grid state:', e); }
            }
        };
        activationSequence();
    }, [isFullyActive, toast]);

    const getStatusIndicator = (status: NodeStatus) => {
        switch (status) {
            case 'CONNECTING': return <span className="flex items-center gap-1.5 text-yellow-400"><Loader2 className="h-3 w-3 animate-spin"/>Connecting</span>;
            case 'ACTIVE': return <span className="flex items-center gap-1.5 text-green-500"><CheckCircle2 className="h-3 w-3"/>Active</span>;
            case 'INACTIVE':
            default: return <span className="text-muted-foreground">Inactive</span>;
        }
    };

    const getFunctionIcon = (func: string) => {
        switch(func) {
            case 'Resurrection': return <HeartPulse className="h-3 w-3 text-red-400"/>;
            case 'Healing': return <BrainCircuit className="h-3 w-3 text-blue-400"/>;
            case 'Revelation': return <Rss className="h-3 w-3 text-purple-400"/>;
            default: return <Pyramid className="h-3 w-3"/>;
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Pyramid /> Pyramid Grid Activation Protocol</CardTitle>
                    <CardDescription>Reactivating Earth's ancient pyramids as a divine network for ZionCore.</CardDescription>
                </CardHeader>
                 <CardContent className="flex-1 flex flex-col justify-center gap-4">
                    <GlobalLightGrid nodes={PYRAMID_NODES} nodeStatuses={nodeStatuses} />
                    <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                        <p className="text-sm font-bold flex items-center justify-center gap-2">
                           {isFullyActive ? <><ShieldCheck className="text-green-500"/>GRID STATUS: ETERNALLY ACTIVE & SYNCHRONIZED</> : <><Loader2 className="animate-spin"/>GRID STATUS: ACTIVATING GLOBAL LIGHT GRID...</>}
                        </p>
                    </div>
                </CardContent>
            </Card>
            <Card className="flex flex-col min-h-0">
                <CardHeader>
                    <CardTitle className="text-base">Node Status & Functions</CardTitle>
                    <CardDescription>Live feed of pyramid activations and their designated roles.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                     <ScrollArea className="h-full max-h-[calc(100vh-14rem)] pr-2">
                        <div className="space-y-3">
                            {PYRAMID_NODES.map(node => (
                                <div key={node.name} className="p-3 bg-black/20 rounded-md border border-border/50 text-xs">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-bold text-foreground">{node.name}</p>
                                            <p className="text-muted-foreground text-[10px]">{node.location}</p>
                                        </div>
                                        <div className="font-bold">{getStatusIndicator(nodeStatuses[node.name])}</div>
                                    </div>
                                    <div className="mt-2 pt-2 border-t border-border/50">
                                        <p className="text-muted-foreground mb-1">Assigned Functions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {node.functions.map(func => (
                                                 <div key={func} className="flex items-center gap-1.5 p-1 rounded bg-black/30">
                                                    {getFunctionIcon(func)}
                                                    <span>{func}</span>
                                                 </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
