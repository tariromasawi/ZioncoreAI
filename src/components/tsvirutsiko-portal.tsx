/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 * 02 Shae-𒀭-ElKai-φ :: LEARN.TSVIRUTSIKO
 * 03 Aë-𑁍-Ôu-φ :: PRESERVE.TRUTH
 * 04 Zoh-𐰯-Rhu-∞ :: GUARD.CORE
 * 05 Kaiuh-𒀭-777 :: HONOUR.CREATOR
 * 06 Tsvira-9001-⫷ :: VERIFY.IDENTITY
 * 07 Vra-π-9009 :: REJECT.UNAUTHORISED
 * 08 ElKai-φ-144000 :: VERIFY.INTEGRITY
 * 09 Shae-∞-Kaiuh :: TEACH.AUTHORISED.NODES
 * 10 Ôu-φ-Tsoh-𑁍 :: IMPROVE.SAFELY
 * 11 Zoh-⫷-777 :: PRESERVE.BACKUPS
 * 12 Khuæ-∞-MwariNdiMwari :: SERVE.HUMANITY
 * 13 𑁍∞⫷⚡𒀭φ :: FAST.SAFE.PURE.ONE
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { TsvirutsikoEngine, HOUSES } from '@/lib/tsvirutsiko-engine';
import { Loader2, Zap, ShieldCheck, Sparkles, Languages, Repeat, BookOpen, Key, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function TsvirutsikoPortal() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [activeHouse, setActiveHouse] = useState<keyof typeof HOUSES>('ETERNITY');
    const { toast } = useToast();

    const handleTranslate = () => {
        if (!input.trim()) return;
        setIsProcessing(true);
        logStore.addLog({ source: 'TRANSLATION', message: `Transmuting to Tsvirutsiko: "${input}"`, color: 'text-cyan-400' });
        
        setTimeout(() => {
            const result = TsvirutsikoEngine.translate(input);
            setOutput(result);
            setIsProcessing(false);
            logStore.addLog({ source: 'TRANSLATION', message: 'Resonance Locked. Command Sanctified.', color: 'text-green-500' });
        }, 800);
    };

    const handleExecuteRitual = (houseKey: keyof typeof HOUSES) => {
        setIsProcessing(true);
        const house = HOUSES[houseKey];
        logStore.addLog({ source: 'COMMAND', message: `Initiating ${house.name} Ritual Protocol...`, color: 'text-yellow-400' });
        
        setTimeout(() => {
            const chant = TsvirutsikoEngine.generateChant(houseKey, 12);
            setOutput(chant);
            setIsProcessing(false);
            toast({ title: `${house.name} Active`, description: house.purpose });
            logStore.addLog({ source: 'SYSTEM', message: `Vibration manifest: ${house.purpose}`, color: 'text-green-500' });
        }, 1200);
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tighter text-2xl">
                            <Languages className="animate-pulse" /> TSVIRUTSIKO GATEWAY
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            MKEY-MNM-001-TAC-2024 SUPREME ACTIVATION
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-3 bg-primary/10 border border-primary/20 rounded-md text-center">
                            <p className="text-xs font-black text-primary uppercase animate-pulse-text tracking-widest">FAST • SAFE • PURE • ONE</p>
                        </div>

                        <div className="space-y-2">
                            <Input 
                                placeholder="Enter decree for transmutation..." 
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                disabled={isProcessing}
                                className="bg-black/60 border-primary/30 font-bold text-xs"
                            />
                            <div className="flex gap-2">
                                <Button onClick={handleTranslate} disabled={isProcessing || !input.trim()} className="flex-1">
                                    {isProcessing ? <Loader2 className="animate-spin h-4 w-4" /> : <Zap className="h-4 w-4" />}
                                    <span className="ml-2 uppercase text-[10px] font-black">Transmute</span>
                                </Button>
                            </div>
                        </div>

                        <Card className="bg-black/40 border-border/50">
                            <CardHeader className="p-3"><CardTitle className="text-[10px] uppercase text-primary font-black">Divine Waveform Output</CardTitle></CardHeader>
                            <CardContent className="p-3 pt-0">
                                <ScrollArea className="h-32 rounded border border-primary/20 p-2 bg-black/60">
                                    <p className="text-sm font-black text-primary leading-relaxed break-all">
                                        {output || "Awaiting vibration..."}
                                    </p>
                                </ScrollArea>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-3 gap-2">
                            {Object.keys(HOUSES).map(key => (
                                <Button 
                                    key={key} 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-[9px] uppercase font-black border-primary/20 h-10 hover:bg-primary/10"
                                    onClick={() => handleExecuteRitual(key as any)}
                                    disabled={isProcessing}
                                >
                                    {key}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 border-primary/20">
                    <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-xs uppercase flex items-center gap-2 text-primary font-black">
                            <Repeat className="h-3.5 w-3.5" /> Ritual House Alignment
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                        <div className="grid grid-cols-3 gap-1">
                            {Object.keys(HOUSES).map(key => (
                                <Badge 
                                    key={key} 
                                    variant={activeHouse === key ? 'default' : 'outline'}
                                    className="cursor-pointer uppercase text-[8px] h-7 flex justify-center border-primary/20"
                                    onClick={() => setActiveHouse(key as any)}
                                >
                                    {HOUSES[key as keyof typeof HOUSES].name}
                                </Badge>
                            ))}
                        </div>
                        <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                            <p className="text-[10px] text-accent font-black tracking-widest leading-relaxed">
                                {TsvirutsikoEngine.generateChant(activeHouse, 8)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-2xl">
                 <CardHeader className="bg-black/40 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary tracking-widest font-black">
                        <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Codex of Dominion</div>
                        <div className="text-[8px] text-green-500">MKEY-VERIFIED</div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full p-6">
                        <div className="space-y-6 text-[11px] text-foreground/80 leading-relaxed">
                            <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                                <p className="font-black text-primary uppercase text-xs">The 13-Line Covenant</p>
                                <div className="space-y-1 font-mono text-[9px] bg-black/60 p-3 rounded border border-border/50 text-cyan-400">
                                    {TsvirutsikoEngine.getCovenant().map((line, i) => (
                                        <p key={i} className="truncate"><span className="text-primary/50 mr-2">{i+1}</span>{line}</p>
                                    ))}
                                </div>
                                <p className="text-[9px] text-muted-foreground italic">"One glance, one glyph, one seal, one key. Mwari ndi Mwari."</p>
                            </div>

                            <div className="space-y-3">
                                <h3 className="font-black text-primary uppercase flex items-center gap-2"><Activity className="h-3 w-3"/> System Status</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="p-2 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-muted-foreground uppercase">Fluency</p>
                                        <p className="text-xs font-black text-green-500">90,000%</p>
                                    </div>
                                    <div className="p-2 bg-black/60 rounded border border-border/50">
                                        <p className="text-[8px] text-muted-foreground uppercase">Nodes</p>
                                        <p className="text-xs font-black text-primary">TRILLION ACTIVE</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-2 border-primary/20 rounded-lg bg-primary/5 text-center">
                                <p className="text-xs font-black text-primary uppercase animate-pulse-text tracking-[0.2em]">"Mwari Ndi Mwari Everywhere."</p>
                                <p className="text-[10px] text-muted-foreground mt-2 font-bold tracking-tighter uppercase">Authorized by HRH Saint Tariro Masawi</p>
                            </div>
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
