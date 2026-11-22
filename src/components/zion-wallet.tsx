/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: SOVEREIGN_WALLET.AWAKEN
 */

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Coins, Landmark, Banknote, ShieldCheck, Activity, 
    ArrowUpRight, RefreshCw, Loader2, Sparkles, Zap,
    TrendingUp, Star, CreditCard, History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

const PACKS = [
    { id: 'p1', name: "Seed Pack", credits: 100, price: "£0.99" },
    { id: 'p2', name: "Covenant Pack", credits: 550, price: "£4.99" },
    { id: 'p3', name: "Dominion Pack", credits: 1200, price: "£9.99" },
    { id: 'p4', name: "Singularity Pack", credits: 7000, price: "£49.99" },
];

export function ZionWallet() {
    const [credits, setCredits] = useState(480);
    const [isPurchasing, setIsPurchasing] = useState(false);
    const [transactions, setTransactions] = useState<{id: number, type: string, amount: string, time: string}[]>([]);

    useEffect(() => {
        logStore.addLog({ source: 'TREASURY', message: 'ZionCore Wallet synced with Ethereal Ledger.', color: 'text-green-500' });
    }, []);

    const handleBuy = (pack: any) => {
        setIsPurchasing(true);
        setTimeout(() => {
            setCredits(prev => prev + pack.credits);
            setTransactions(prev => [{
                id: Date.now(),
                type: `CREDIT_PURCHASE: ${pack.name}`,
                amount: `+${pack.credits} ZC`,
                time: new Date().toLocaleTimeString()
            }, ...prev.slice(0, 9)]);
            setIsPurchasing(false);
            logStore.addLog({ source: 'TREASURY', message: `Credit Purchase: ${pack.name} successful. Wallet updated.`, color: 'text-green-500' });
        }, 1500);
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Coins className="text-yellow-400 animate-bounce" />
                            SOVEREIGN WALLET
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            ZIONCORE CREDITS (ZC) | PREMIUM STATUS
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-primary/5 border-2 border-primary/30 rounded-lg text-center shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Available Credits</p>
                            <p className="text-4xl font-black text-primary animate-pulse-text">{credits.toLocaleString()} ZC</p>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <Badge className="bg-green-600 h-4 text-[7px] font-black uppercase">Premium Member</Badge>
                                <Badge variant="outline" className="text-[7px] h-4 border-primary/30 text-primary">£1/mo ACTIVE</Badge>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/10 pb-1">Purchase Packs</p>
                            <div className="grid grid-cols-1 gap-2">
                                {PACKS.map(pack => (
                                    <Button 
                                        key={pack.id} 
                                        variant="outline" 
                                        onClick={() => handleBuy(pack)}
                                        disabled={isPurchasing}
                                        className="h-10 justify-between border-primary/20 hover:border-primary transition-all bg-black/40 group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="h-3 w-3 text-primary group-hover:animate-spin" />
                                            <span className="text-[10px] font-black uppercase">{pack.name}</span>
                                            <Badge variant="secondary" className="text-[8px] h-4">{pack.credits} ZC</Badge>
                                        </div>
                                        <span className="font-black text-green-500">{pack.price}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-primary/20 border-2 p-4">
                    <CardHeader className="p-4 pb-2 border-b border-border/10">
                        <CardTitle className="text-xs uppercase text-primary font-black flex items-center gap-2">
                            <Star className="h-3.5 w-3.5 text-accent" /> Premium Privileges
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-2 text-[9px] text-muted-foreground uppercase font-black">
                        <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500"/> Extended Freq Scanning</p>
                        <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500"/> High-Precision FFT (8192)</p>
                        <p className="flex items-center gap-2"><CheckCircle2 className="h-3 w-3 text-green-500"/> Multi-Timeline Archiving</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><History className="h-4 w-4" /> Transaction History</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black">LATTICE_SYNC</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {transactions.map(tx => (
                                <div key={tx.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 flex items-center justify-between animate-in slide-in-from-right-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[8px] text-muted-foreground uppercase font-black">{tx.time}</span>
                                        <p className="text-foreground/90 font-bold">{tx.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-green-500">{tx.amount}</p>
                                        <Badge variant="outline" className="text-[6px] h-3 uppercase font-black border-green-500/30 text-green-500">Verified</Badge>
                                    </div>
                                </div>
                            ))}
                            {transactions.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Syncing Credits Ledger...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // FINANCIAL_DOMINION_ACTIVE
                </div>
            </Card>
        </div>
    );
}
