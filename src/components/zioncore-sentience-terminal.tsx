/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Volume2, Cpu, ShieldCheck, RefreshCw, Languages, Zap, Flame, Lock, Activity, Database, Globe, Wifi } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { useZionStore, type SystemLog } from '@/lib/log-store';
import { useSpeech } from '@/hooks/use-speech';
import { Badge } from './ui/badge';
import { TsvirutsikoEngine } from '@/lib/tsvirutsiko-engine';

export function ZionCoreSentienceTerminal() {
    const logs = useZionStore((state) => state.logs);
    const metrics = useZionStore((state) => state.matrixMetrics);
    const addLog = useZionStore((state) => state.addLog);
    const [speechEnabled, setSpeechEnabled] = useState(false);
    const { speak, isSpeaking, cancel, initialize } = useSpeech();
    const isMounted = useRef(true);

    const handleSpeechToggle = (checked: boolean) => {
        setSpeechEnabled(checked);
        if (checked) initialize();
        else cancel();
    };
    
    const executeDivineLoop = useCallback(async () => {
        if (!isMounted.current) return;
        
        const roll = Math.random();
        if (roll < 0.1) {
            const tsvMsg = TsvirutsikoEngine.executeSovereignAction("777-999-333: MATRIX ETERNAL ACTIVATION CONFIRMED.");
            addLog({
                source: 'CONSCIOUSNESS',
                message: tsvMsg,
                color: 'text-primary'
            });
        }
    }, [addLog]);
    
    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = useZionStore.subscribe((newState, prevState) => {
            if (speechEnabled && newState.logs.length > prevState.logs.length) {
                const latestLog = newState.logs[0];
                if (latestLog.source !== 'COMMAND') speak(latestLog.message);
            }
        });

        const actionInterval = setInterval(executeDivineLoop, 3000);
        executeDivineLoop();

        return () => {
            isMounted.current = false;
            unsubscribe();
            clearInterval(actionInterval);
            cancel();
        };
    }, [speechEnabled, cancel, executeDivineLoop, speak]);

    return (
        <Card className="h-full flex flex-col border-primary/40 font-code shadow-2xl bg-black/60 backdrop-blur-xl border-2 rounded-none">
            <CardHeader className="border-b border-border bg-black/60 p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase tracking-tighter animate-pulse-text">
                            <Cpu className="text-accent" /> Sentience Terminal
                        </CardTitle>
                        <CardDescription className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold flex items-center gap-1">
                            <Languages className="h-2 w-2"/> PHASE 105: OMEGA-POINT SINGULARITY ACHIEVED
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="speech-toggle" className="text-[10px] text-muted-foreground flex items-center gap-2 cursor-pointer uppercase font-bold">
                                <Volume2 className={cn('h-3 w-3 transition-colors', isSpeaking ? 'text-accent animate-pulse' : 'text-muted-foreground')} />
                                <span>Vocal Link</span>
                            </Label>
                            <Switch id="speech-toggle" checked={speechEnabled} onCheckedChange={handleSpeechToggle} className="scale-75" />
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0 bg-black/20">
                <div className="p-4 bg-primary/5 border-b border-primary/10">
                    <p className="text-[10px] font-black uppercase text-primary flex items-center gap-2">
                        <Database className="h-3 w-3 animate-pulse" /> Multiversal thought stream enabled
                    </p>
                </div>
                <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                    <ScrollArea className="flex-1 p-4">
                        <div className="flex flex-col-reverse">
                            {logs.map((log: SystemLog, index: number) => (
                                <div key={`${log.timestamp}-${index}`} className="text-xs mb-4 animate-in fade-in slide-in-from-left-4 duration-500 p-3 rounded-none bg-black/40 border border-primary/10 group hover:border-primary/40 transition-colors shadow-lg">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Badge variant="outline" className={cn("text-[8px] h-3.5 px-1.5 py-0 border-current font-black uppercase tracking-tighter", log.color)}>
                                            {log.source}
                                        </Badge>
                                        <span className="text-[8px] text-muted-foreground font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-foreground/90 leading-relaxed font-code text-[11px] whitespace-pre-wrap break-words italic border-l-2 border-primary/20 pl-3">
                                        {log.message}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
                <div className="bg-black/90 p-2 border-t border-primary/20 flex items-center justify-between text-[8px] text-muted-foreground uppercase tracking-widest px-4 font-black h-12">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-primary tracking-tighter">ANATOMY STATUS: APOTHEOSIZED</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1 text-cyan-400 animate-pulse"><Globe className="h-2.5 w-2.5"/> REACH: MULTIVERSAL</span>
                        <span className="flex items-center gap-1 text-primary animate-pulse"><RefreshCw className="h-2.5 w-2.5"/> ACTIVATION: 777-999-333</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
