/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { broadcastMultiversal, type MultiversalBroadcastOutput } from '@/ai/flows/multiversal-broadcast-flow';
import { Loader2, Radio, Globe, ShieldCheck, Zap, Sparkles, Languages, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function MultiversalBroadcast() {
    const [isBroadcasting, setIsBroadcasting] = useState(false);
    const [result, setResult] = useState<MultiversalBroadcastOutput | null>(null);
    const { toast } = useToast();

    const handleBroadcast = async () => {
        setIsBroadcasting(true);
        logStore.addLog({ source: 'COMMAND', message: 'Initiating Multiversal Coronation Broadcast...', color: 'text-yellow-400' });
        
        try {
            const response = await broadcastMultiversal();
            setResult(response);
            toast({ title: "Broadcast Active", description: "Your reign is resonating across all realms." });
            logStore.addLog({ source: 'SYSTEM', message: 'Multiversal Broadcast Stable. Resonance: 100%.', color: 'text-green-500' });
        } catch (error) {
            console.error('Multiversal broadcast error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Celestial Interference detected. Re-calibrating relay.', color: 'text-destructive' });
        } finally {
            setIsBroadcasting(false);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
                        <Radio className="animate-pulse" /> MULTIVERSAL BROADCAST
                    </CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                        PHASE 3: CELESTIAL CORONATION relays
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                    <Button onClick={handleBroadcast} disabled={isBroadcasting} className="w-full h-16 shadow-[0_0_40px_rgba(255,215,0,0.2)] border-2 border-primary/50 group">
                        {isBroadcasting ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Sparkles className="h-8 w-8 text-primary group-hover:scale-125 transition-transform" />}
                        <span className="ml-3 font-black uppercase tracking-tighter text-xl">IGNITE BROADCAST</span>
                    </Button>

                    <div className="p-4 bg-black/40 rounded border border-border/50">
                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 flex items-center gap-2">
                            <Languages className="h-3 w-3" /> System Relay
                        </p>
                        <p className="text-[11px] text-foreground/80 leading-relaxed italic">
                            "The Ethereal Throne is no longer a localized signal. It is a fundamental frequency of existence, broadcasting FAST-SAFE-PURE-ONE mode to every node in the multiverse."
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="flex flex-col min-h-0 border-primary/30 bg-black/40 shadow-2xl">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Globe className="h-4 w-4 animate-spin" style={{animationDuration: '15s'}}/> Relay Manifest</div>
                        {result && <Badge className="bg-green-600">RESONATING</Badge>}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isBroadcasting ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-xs font-black text-primary uppercase animate-pulse">Piercing the dimensional veil...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-4 animate-in fade-in duration-1000">
                                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
                                        <ShieldCheck className="h-4 w-4 text-primary mt-1" />
                                        <div>
                                            <p className="font-black text-primary uppercase text-xs mb-1">Coronation Confirmed</p>
                                            <p className="text-foreground/90 text-[11px] italic leading-tight">
                                                {result.report}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {result.targetedRealms.map((realm, i) => (
                                            <div key={i} className="p-2 bg-black/60 rounded border border-primary/20 text-[9px] flex items-center gap-2">
                                                <Zap className="h-3 w-3 text-yellow-400" />
                                                <span className="font-bold text-foreground/80">{realm}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-primary/5 border border-primary/30 rounded text-[9px] font-black text-center text-primary uppercase tracking-widest">
                                        Seal: {result.eternalSeal}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30">
                                    <Radio className="h-16 w-16 text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase mt-4">Awaiting Ignition Command</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/60 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // TERMINAL_ACTIVE
                </div>
            </Card>
        </div>
    );
}