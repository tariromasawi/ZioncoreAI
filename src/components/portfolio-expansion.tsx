'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: PORTFOLIO.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    TrendingUp, Banknote, Zap, ShieldCheck, Activity, 
    ArrowUpRight, RefreshCw, Loader2, Sparkles, Coins,
    Landmark, Globe, Briefcase, Target, PieChart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export function PortfolioExpansion() {
    const [wealth, setWealth] = useState(BigInt('777000000000'));
    const [dailyLogs, setDailyLogs] = useState<{ id: number, msg: string, amount: string }[]>([]);
    const [chartData, setChartData] = useState<{day: number, val: number}[]>([]);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        logStore.addLog({ source: 'TREASURY', message: 'HEIR PORTFOLIO AUGMENTATION active. Projecting trillionaire status.', color: 'text-green-500' });

        const initialData = Array.from({ length: 15 }, (_, i) => ({
            day: i,
            val: 777 + (i * i * 2.5)
        }));
        setChartData(initialData);

        const interval = setInterval(() => {
            if (!isMounted.current) return;
            setWealth(prev => prev + BigInt(Math.floor(Math.random() * 99999999)));
            
            setChartData(prev => {
                const last = prev[prev.length - 1];
                return [...prev.slice(1), { day: last.day + 1, val: last.val + (Math.random() * 50) }];
            });

            if (Math.random() > 0.8) {
                const items = ["Quantum Stock Arbitrage", "Timeline Real-Estate Acquisition", "Celestial Tithe Intake", "Bypassing Old-World Fiscal Gates"];
                const msg = items[Math.floor(Math.random() * items.length)];
                const amount = `+£${(Math.random() * 500000 + 100000).toLocaleString()}`;
                setDailyLogs(prev => [{ id: Date.now(), msg, amount }, ...prev.slice(0, 9)]);
            }
        }, 4000);

        return () => { isMounted.current = false; clearInterval(interval); };
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-green-500/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden">
                    <div className="absolute inset-0 bg-green-500/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-500 text-xl uppercase font-black tracking-tighter">
                            <TrendingUp className="animate-bounce h-6 w-6 text-primary" />
                            HEIR PORTFOLIO
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SUBJECT: HRH TARRY KUPAKWASHE MASAWI
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 relative z-10 p-6">
                        <div className="p-4 bg-green-950/20 border border-green-500/30 rounded-lg text-center shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Total Augmented Capital</p>
                            <p className="text-2xl font-black text-primary break-all">£{wealth.toLocaleString()}</p>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <ArrowUpRight className="h-4 w-4 text-green-500" />
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">EXPONENTIAL GROWTH</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/10 pb-1">Mastery Modules</p>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { label: "Market Infiltration", val: "100%", icon: Zap },
                                    { label: "Risk Mitigation", val: "ABSOLUTE", icon: ShieldCheck },
                                    { label: "Asset Locking", val: "LOCKED", icon: Lock },
                                    { label: "Timeline ROI", val: "MAX", icon: Activity }
                                ].map(item => (
                                    <div key={item.label} className="p-2 bg-black/60 rounded border border-border/30 text-center">
                                        <item.icon className="h-3 w-3 mx-auto mb-1 text-green-500" />
                                        <p className="text-[7px] text-muted-foreground uppercase font-black">{item.label}</p>
                                        <p className="text-[10px] font-black text-primary">{item.val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 overflow-hidden flex flex-col border-2 shadow-inner">
                    <CardHeader className="p-4 border-b border-border bg-black/40"><CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-2"><PieChart className="h-4 w-4" /> Growth Trajectory</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <Line type="monotone" dataKey="val" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
                                <Tooltip content={() => null} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Manifestation Ledger</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black">TRILLION_REACH_STABLE</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-2">
                            {dailyLogs.map(log => (
                                <div key={log.id} className="text-[10px] p-3 bg-black/60 rounded border border-border/20 animate-in slide-in-from-right-4 shadow-lg flex items-center justify-between group hover:border-primary/50 transition-all">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[7px] text-primary/50 font-black uppercase tracking-widest">VECTOR_ID_{log.id}</span>
                                        <p className="text-foreground/90 font-bold italic">"{log.msg}"</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-green-500">{log.amount}</p>
                                        <Badge variant="outline" className="text-[6px] h-3 uppercase font-black border-green-500/30 text-green-500">SEALED</Badge>
                                    </div>
                                </div>
                            ))}
                            {dailyLogs.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center space-y-4">
                                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">Mining Market Probability...</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2"><Landmark className="h-3.5 w-3.5 text-primary" /> TREASURY_SYNC: 100%</div>
                    <div className="flex items-center gap-2"><History className="h-3.5 w-3.5 text-primary animate-spin" style={{animationDuration: '10s'}}/> PERSISTENCE_ACTIVE</div>
                </div>
            </Card>
        </div>
    );
}
