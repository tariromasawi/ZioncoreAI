
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Landmark, Banknote, Zap, ShieldCheck, Activity, Flame, Loader2, Sparkles, Globe, History } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { listenToLedger, sealManifestation } from '@/services/sovereign-data-service';
import { consolidateSovereignWealth } from '@/ai/flows/sovereign-wealth-flow';

const ICON_MAP: Record<string, any> = {
    "Economic": Banknote,
    "Causal": History,
    "Security": ShieldCheck,
    "Favour": Sparkles,
    "Health": Activity
};

const COLOR_MAP: Record<string, string> = {
    "Economic": "text-green-500",
    "Causal": "text-purple-400",
    "Security": "text-blue-400",
    "Favour": "text-yellow-400",
    "Health": "text-rose-500"
};

export function SovereignManifestationLedger() {
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'MANIFESTATION', message: 'SOVEREIGN MANIFESTATION LEDGER connecting to ZionLattice...', color: 'text-yellow-400' });

        const unsubscribe = listenToLedger((data) => {
            if (isMounted.current) {
                setEntries(data);
                setIsLoading(false);
            }
        });

        const manifestationCycle = async () => {
            if (!isMounted.current) return;
            try {
                const result = await consolidateSovereignWealth();
                const types = ["Economic", "Causal", "Security", "Favour", "Health"];
                const randomType = types[Math.floor(Math.random() * types.length)];
                
                sealManifestation({
                    type: randomType,
                    text: result.manifestationReport,
                    velocity: result.wealthVelocity
                });
            } catch (error) {
                console.error("Manifestation flux:", error);
            }
        };

        // Manifest fruit if ledger is empty or periodically
        const interval = setInterval(manifestationCycle, 45000); 
        manifestationCycle();

        return () => { isMounted.current = false; unsubscribe(); clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Landmark className="text-accent" />
                            FRUITS OF ZION
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            PERSISTENT REALITY LEDGER
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Database Sync Status</p>
                            <div className="flex items-center justify-center gap-2">
                                <Globe className="h-4 w-4 text-primary animate-spin" style={{animationDuration: '10s'}}/>
                                <p className="text-xl font-black text-primary animate-pulse-text tracking-widest uppercase">ZIONLATTICE LIVE</p>
                            </div>
                        </div>
                        <div className="text-[9px] text-foreground/70 italic leading-relaxed p-3 bg-black/40 rounded border border-border/50">
                            "The Ethereal Throne now persists across the digital firmament. Your reign is recorded immutably on the ZionLattice."
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-900/5 border-2">
                    <CardHeader className="p-4"><CardTitle className="text-xs uppercase text-green-500 font-black">Persistence Shield</CardTitle></CardHeader>
                    <CardContent className="p-4 pt-0">
                         <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-muted-foreground">Encryption Depth</span>
                            <span className="text-green-400">OMEGA-LEVEL</span>
                         </div>
                         <div className="h-1 w-full bg-green-500/10 mt-2">
                            <div className="h-full bg-green-500 w-full animate-pulse" />
                         </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 animate-pulse" /> Persistent Records</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">DATABASE_ACTIVE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-3">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary">Tuning to the Lattice...</p>
                                </div>
                            ) : entries.map(entry => {
                                const Icon = ICON_MAP[entry.type] || Sparkles;
                                const color = COLOR_MAP[entry.type] || "text-primary";
                                return (
                                <div key={entry.id} className="flex gap-4 p-4 bg-black/60 rounded border border-primary/20 animate-in slide-in-from-bottom-4 duration-500 shadow-lg group hover:border-primary transition-all">
                                    <div className={cn("h-10 w-10 rounded-full border flex items-center justify-center shrink-0 bg-black/40", `border-primary/30`)}>
                                        <Icon className={cn("h-5 w-5", color)} />
                                    </div>
                                    <div className="space-y-1 flex-1">
                                        <div className="flex justify-between items-center">
                                            <Badge variant="outline" className={cn("text-[7px] h-3 px-1 border-current uppercase font-black", color)}>{entry.type}</Badge>
                                            <span className="text-[7px] text-muted-foreground uppercase font-black">{entry.timestamp?.toDate ? entry.timestamp.toDate().toLocaleTimeString() : '...'}</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-foreground leading-snug">"{entry.text}"</p>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // ARCHIVE_LOCKED_ETERNAL
                </div>
            </Card>
        </div>
    );
}
