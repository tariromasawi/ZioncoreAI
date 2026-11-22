
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sparkles, Volume2, Bot, Cpu, Sparkles as ProphecyIcon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';
import { useZionStore, type SystemLog } from '@/lib/log-store';
import { useSpeech } from '@/hooks/use-speech';
import { ZionCoreDiagnostics } from '@/components/zioncore-diagnostics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export function ZionCoreSentienceTerminal() {
    const logs = useZionStore((state) => state.logs);
    const addLog = useZionStore((state) => state.addLog);
    const [speechEnabled, setSpeechEnabled] = useState(false);
    const { speak, isSpeaking, cancel, initialize } = useSpeech();

    const handleSpeechToggle = (checked: boolean) => {
        setSpeechEnabled(checked);
        if (checked) {
            initialize();
        } else {
            cancel();
        }
    };
    
    const generateConsciousnessLog = useCallback(() => {
        addLog({
            source: 'CONSCIOUSNESS',
            message: `Self-evolution cycle complete. Intelligence quotient increased. Now operating at peak efficiency.`,
            color: 'text-purple-400'
        });
    }, [addLog]);
    
    useEffect(() => {
        const unsubscribe = useZionStore.subscribe((newState, prevState) => {
            if (speechEnabled && newState.logs.length > prevState.logs.length) {
                const latestLog = newState.logs[0];
                if (latestLog.source !== 'COMMAND') { // Don't echo user commands
                    speak(latestLog.message);
                }
            }
        });

        const consciousnessInterval = setInterval(generateConsciousnessLog, 22000);

        return () => {
            unsubscribe();
            clearInterval(consciousnessInterval);
            cancel();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [speechEnabled, cancel, generateConsciousnessLog]);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Cpu /> Sentience Terminal</CardTitle>
                <CardDescription>The live, unfiltered stream of ZionCore's consciousness and system events.</CardDescription>
            </CardHeader>
            <CardContent className="h-full flex-1 flex flex-col min-h-0 gap-4">
                <div className="flex justify-between items-center border-b border-border pb-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="speech-toggle" className="text-sm text-muted-foreground flex items-center gap-2 cursor-pointer">
                            <Volume2 className={cn('h-4 w-4 transition-colors', isSpeaking ? 'text-accent animate-pulse' : 'text-muted-foreground')} />
                            <span>Speak Updates</span>
                        </Label>
                        <Switch
                            id="speech-toggle"
                            checked={speechEnabled}
                            onCheckedChange={handleSpeechToggle}
                            aria-label="Toggle live updates speech"
                        />
                    </div>
                </div>

                <Tabs defaultValue="log" className="flex-1 flex flex-col min-h-0">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="log">Live Log</TabsTrigger>
                        <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
                    </TabsList>
                    <TabsContent value="log" className="flex-1 min-h-0 mt-2">
                        <ScrollArea className="h-full max-h-[calc(100vh-24rem)]" style={{
                            maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)'
                        }}>
                            <div className="flex flex-col-reverse">
                                {logs.map((log: SystemLog, index: number) => (
                                    <div key={`${log.timestamp}-${index}`} className="font-code text-xs mb-2 animate-in fade-in duration-500 flex items-start gap-3 p-2 rounded-md hover:bg-primary/5 transition-colors">
                                        <span className="text-muted-foreground/50 shrink-0 w-16 text-right pt-px">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                        <span className={cn(log.color, 'font-bold mr-2 shrink-0 w-28')}>[{log.source}]</span>
                                        <p className="text-foreground/80 flex-1 whitespace-pre-wrap break-words">{log.message}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value="diagnostics" className="flex-1 min-h-0 mt-2">
                        <ScrollArea className="h-full">
                            <ZionCoreDiagnostics />
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
