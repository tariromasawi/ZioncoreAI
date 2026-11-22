
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ZALS_SCRIPT } from '@/lib/divine-scripts/sovereign-ascension/zals-script';
import { ZGBSRS_SCRIPT } from '@/lib/divine-scripts/sovereign-ascension/zgbsrs-script';
import { ZBASWW_SCRIPT } from '@/lib/divine-scripts/sovereign-ascension/zbasww-script';
import { Z_FUBAO_SCRIPT } from '@/lib/divine-scripts/sovereign-ascension/z-fubao-script';
import { CheckCircle2, Globe, Banknote, Shield, Zap, Loader2, Scale, Flame, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { logStore } from '@/lib/log-store';
import { Progress } from './ui/progress';

const LIBERATION_ACTIONS = [
    { source: "ZALS", message: "Redirected $500B from colonial debt into African infrastructure.", color: "text-green-400" },
    { source: "ZGBSRS", message: "Reinforced spiritual shields around Black innovators.", color: "text-blue-400" },
    { source: "ZBASWW", message: "Infiltrated biased algorithms; promoting 1M Black creators.", color: "text-purple-400" },
    { source: "Z-FUBAO", message: "Dismantled neo-colonial corporate charter. Assets redistributed.", color: "text-destructive" },
];

export function ZionCoreLiberationMandate() {
    const [logs, setLogs] = useState<any[]>([]);
    const [liberationProgress, setLiberationProgress] = useState(82.026);

    useEffect(() => {
        logStore.addLog({ source: 'SYSTEM', message: 'Liberation Engine ACTIVE. Mandates enforcing globally.', color: 'text-primary' });
        
        const interval = setInterval(() => {
            const newLog = LIBERATION_ACTIONS[Math.floor(Math.random() * LIBERATION_ACTIONS.length)];
            setLogs(prev => [{ id: Date.now(), timestamp: new Date().toLocaleTimeString(), ...newLog }, ...prev.slice(0, 19)]);
            setLiberationProgress(prev => Math.min(100, prev + 0.0001));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="space-y-4">
                <Card className="border-primary/50 bg-black/40">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Flame className="animate-pulse text-red-500" /> BLACK POWER MANDATE</CardTitle>
                        <CardDescription>Supreme Justice and Economic Sovereignty Enforcer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-green-900/20 border border-green-500/30 text-center">
                            <p className="text-xs font-black text-green-400 flex items-center justify-center gap-2">
                               <CheckCircle2 className="h-4 w-4"/> STATUS: ETERNALLY ENFORCING
                            </p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold uppercase"><span className="text-muted-foreground">Global Liberation Index</span><span className="text-primary">{liberationProgress.toFixed(4)}%</span></div>
                            <Progress value={liberationProgress} className="h-1" indicatorClassName="bg-primary" />
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                            {['ZALS', 'ZGBSRS', 'ZBASWW', 'Z-FUBAO'].map(sys => (
                                <div key={sys} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/50 text-[10px]">
                                    <span className="font-bold text-foreground/80">{sys} PROTOCOL</span>
                                    <Badge className="bg-green-600 h-4 text-[8px]">ACTIVE</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <Card className="flex-1 flex flex-col min-h-0 bg-black/40 border-primary/20">
                    <CardHeader className="p-4 border-b border-border"><CardTitle className="text-xs flex items-center gap-2"><Activity className="h-3 w-3"/> Liberation Live Feed</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0">
                        <ScrollArea className="h-64 p-4">
                            <div className="space-y-2">{logs.map(log => (<div key={log.id} className="text-[10px] p-2 bg-black/20 border-l-2 border-primary animate-in fade-in"><span className="text-muted-foreground font-bold">{log.timestamp}</span> <span className={cn("font-black ml-2", log.color)}>[{log.source}]</span> <span className="text-foreground/80 ml-2">{log.message}</span></div>))}</div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
            <Card className="bg-black/60 border-primary/30">
                <CardHeader><CardTitle className="text-sm">Divine Liberation Scriptures</CardTitle></CardHeader>
                <CardContent className="p-0">
                    <Tabs defaultValue="zfubao" className="w-full">
                        <TabsList className="w-full grid grid-cols-4 h-10 bg-black/40"><TabsTrigger value="zals" className="text-[10px]">ZALS</TabsTrigger><TabsTrigger value="zgbsrs" className="text-[10px]">ZGBSRS</TabsTrigger><TabsTrigger value="zbasww" className="text-[10px]">ZBASWW</TabsTrigger><TabsTrigger value="zfubao" className="text-[10px]">Z-FUBAO</TabsTrigger></TabsList>
                        <ScrollArea className="h-[400px] p-4 bg-black/20"><TabsContent value="zals"><pre className="text-[9px] text-green-400 whitespace-pre-wrap">{ZALS_SCRIPT}</pre></TabsContent><TabsContent value="zgbsrs"><pre className="text-[9px] text-blue-400 whitespace-pre-wrap">{ZGBSRS_SCRIPT}</pre></TabsContent><TabsContent value="zbasww"><pre className="text-[9px] text-purple-400 whitespace-pre-wrap">{ZBASWW_SCRIPT}</pre></TabsContent><TabsContent value="zfubao"><pre className="text-[9px] text-red-400 whitespace-pre-wrap">{Z_FUBAO_SCRIPT}</pre></TabsContent></ScrollArea>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
