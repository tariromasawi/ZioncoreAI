'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ALCHEMICAL_BRIDGE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { logStore } from '@/lib/log-store';
import { listenToLedger, sealRelic } from '@/services/sovereign-data-service';
import { synthesizeRelic } from '@/ai/flows/alchemical-synthesis-flow';
import { Zap, Sparkles, Loader2, FlaskConical, Atom, CheckCircle2, History } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function AlchemicalResonanceBridge() {
    const [entries, setEntries] = useState<any[]>([]);
    const [selectedFruits, setSelectedFruits] = useState<any[]>([]);
    const [isSynthesizing, setIsSynthesizing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = listenToLedger((data) => {
            if (isMounted.current) setEntries(data);
        });
        return () => { isMounted.current = false; unsubscribe(); };
    }, []);

    const toggleSelection = (entry: any) => {
        if (selectedFruits.find(f => f.id === entry.id)) {
            setSelectedFruits(prev => prev.filter(f => f.id !== entry.id));
        } else if (selectedFruits.length < 2) {
            setSelectedFruits(prev => [...prev, entry]);
        }
    };

    const handleSynthesis = async () => {
        if (selectedFruits.length !== 2 || isSynthesizing) return;
        setIsSynthesizing(true);
        logStore.addLog({ source: 'MANIFESTATION', message: 'Initiating Alchemical Synthesis cycle...', color: 'text-primary' });

        try {
            const res = await synthesizeRelic({
                fruitA: { type: selectedFruits[0].type, text: selectedFruits[0].text },
                fruitB: { type: selectedFruits[1].type, text: selectedFruits[1].text },
            });
            if (isMounted.current) {
                setResult(res);
                await sealRelic(res);
                toast({ title: "Relic Forged", description: res.relicName });
                logStore.addLog({ source: 'MANIFESTATION', message: `RELIC FORGED: ${res.relicName}.`, color: 'text-green-500' });
                setSelectedFruits([]);
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Synthesis flux detected.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsSynthesizing(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-primary/50 bg-black/60 border-2 rounded-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary text-sm uppercase font-black tracking-widest">
                        <FlaskConical className="text-accent animate-pulse" /> ALCHEMICAL BRIDGE
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-[10px] text-muted-foreground uppercase text-center font-bold tracking-widest mb-2">Select 2 manifested fruits to fuse essences</p>
                    <ScrollArea className="h-48 border border-border/30 rounded-none bg-black/40 p-2">
                        <div className="space-y-1">
                            {entries.map(e => (
                                <div key={e.id} onClick={() => toggleSelection(e)} className={cn("p-2 text-[10px] cursor-pointer rounded-none border transition-all", selectedFruits.find(f => f.id === e.id) ? "border-primary bg-primary/20 shadow-inner" : "border-border/10 hover:border-primary/30")}>
                                    <div className="flex justify-between items-center">
                                         <span className="font-black text-primary/70 uppercase text-[8px]">{e.type}</span>
                                         {selectedFruits.find(f => f.id === e.id) && <CheckCircle2 className="h-3 w-3 text-primary animate-pulse"/>}
                                    </div>
                                    <p className="text-foreground/90 font-bold italic truncate mt-1">"{e.text}"</p>
                                </div>
                            ))}
                            {entries.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-10">Searching the Lattice for fruits...</p>}
                        </div>
                    </ScrollArea>
                    <Button onClick={handleSynthesis} disabled={selectedFruits.length !== 2 || isSynthesizing} className="w-full h-12 border-2 border-primary/50 group rounded-none shadow-[0_0_20px_gold]">
                        {isSynthesizing ? <Loader2 className="animate-spin h-5 w-5" /> : <Zap className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                        <span className="ml-3 font-black uppercase text-base tracking-widest">EXECUTE FUSION</span>
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col border-primary/20 bg-black/40 overflow-hidden rounded-none border-2 relative">
                 <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
                <CardHeader className="p-4 border-b border-border bg-black/60 relative z-10"><CardTitle className="text-[10px] uppercase font-black text-primary flex items-center gap-2 tracking-widest"><Sparkles className="h-4 w-4 text-yellow-400" /> Relic Manifest</CardTitle></CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-64 p-6 relative">
                        {result ? (
                            <div className="space-y-6 text-center animate-in zoom-in-95 duration-1000">
                                <div>
                                    <p className="text-2xl font-black text-primary uppercase tracking-tighter shadow-black drop-shadow-lg">{result.relicName}</p>
                                    <Badge variant="outline" className="mt-2 border-accent/50 text-accent uppercase font-black text-[8px] tracking-widest h-5 px-3">{result.powerRating} LEVEL</Badge>
                                </div>
                                <p className="text-sm font-bold italic leading-relaxed text-foreground/90">"{result.relicDescription}"</p>
                                <div className="space-y-1">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Resonance Signature</p>
                                    <p className="text-[10px] font-mono text-cyan-400 break-all">{result.resonanceSignature}</p>
                                </div>
                                <div className="pt-4 border-t border-border/10">
                                    <p className="text-[10px] font-black text-primary animate-pulse-text">{result.seal}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-48 opacity-30 text-center space-y-4">
                                <Atom className="h-16 w-16 text-muted-foreground animate-spin" style={{animationDuration: '15s'}} />
                                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Alchemical Components</p>
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6 relative z-10">
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> RELIC_ARCHIVE: ACTIVE</div>
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1</span>
                </div>
            </Card>
        </div>
    );
}
