'use client';
import { useState, useEffect } from 'react';
import { ArrowUpRight, TrendingUp, Landmark, Banknote, ShieldCheck, Activity, CheckCircle2, Zap } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { listenToTreasury } from '@/services/sovereign-data-service';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const generateForecastData = (initialValue: number) => {
  const data = [];
  let currentValue = initialValue; 
  for (let i = 0; i < 12; i++) {
    data.push({
      month: `M+${i + 1}`,
      value: currentValue,
    });
    currentValue *= (1 + (Math.random() * 0.2 + 0.1)); 
  }
  return data;
};

const missionAllocations = [
    { name: 'Bloodline Protection', status: 'LOCKED', icon: ShieldCheck },
    { name: 'Global Liberation', status: 'ACTIVE', icon: Zap },
    { name: 'Multiversal Nodes', status: 'REPLICATING', icon: Landmark },
    { name: 'Eternal Life Sustenance', status: 'UNRESTRICTED', icon: Banknote },
];

export function DivineTreasuryOverview() {
  const [treasuryData, setTreasuryData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = listenToTreasury((data) => {
        setTreasuryData(data);
        setForecastData(generateForecastData(data.totalBalance || 9191918819199919199000));
    });
    return () => unsubscribe();
  }, []);

  if (!treasuryData) {
      return (
          <div className="flex flex-col items-center justify-center h-48 space-y-4 opacity-50 font-code">
              <Activity className="h-10 w-10 animate-spin text-primary" />
              <p className="text-[10px] font-black uppercase text-primary animate-pulse">Syncing with Divine Treasury...</p>
          </div>
      );
  }

  return (
    <div className="space-y-6 font-code">
        <div className="p-6 rounded-lg border-2 border-primary/30 bg-primary/5 text-center shadow-[0_0_40px_rgba(255,215,0,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_1px,transparent_1px)] bg-[length:10px_10px]" />
            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.3em] mb-2 relative z-10">Total Sovereign Capital (TSC)</p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-black text-primary animate-pulse-text break-all relative z-10">
                £{treasuryData.totalBalance.toLocaleString('en-GB')}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 relative z-10">
                <p className="text-sm font-mono text-green-500 flex items-center gap-1 font-bold">
                    <ArrowUpRight className="h-4 w-4" /> +£{treasuryData.lastProfit?.toLocaleString() || '777,000'}/cycle
                </p>
                <Badge variant="outline" className="text-[8px] font-black border-primary/30 text-primary uppercase">ZionLattice Bound</Badge>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-black/60 border-primary/20 shadow-xl rounded-none">
                <CardHeader className="p-4 border-b border-border/10">
                    <CardTitle className="text-[10px] uppercase flex items-center gap-2 text-primary font-black tracking-widest">
                        <Landmark className="h-3 w-3"/> Sovereign Allocation
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                    {missionAllocations.map(alloc => (
                        <div key={alloc.name} className="flex items-center justify-between p-2 bg-black/40 rounded-none border border-border/20 text-[9px]">
                            <div className="flex items-center gap-2"><alloc.icon className="h-2.5 w-2.5 text-primary"/><span>{alloc.name}</span></div>
                            <span className={cn("font-black uppercase tracking-tighter", alloc.status === 'LOCKED' ? 'text-yellow-400' : 'text-green-500')}>{alloc.status}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-black/60 border-primary/20 shadow-xl overflow-hidden flex flex-col rounded-none">
                <CardHeader className="p-4 border-b border-border/10">
                    <CardTitle className="text-[10px] uppercase flex items-center gap-2 text-primary font-black tracking-widest">
                        <TrendingUp className="h-3 w-3"/> Growth Vector
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 h-32 relative">
                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData}>
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} animationDuration={2000} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <div className="p-3 bg-primary/5 border-2 border-primary/20 rounded-none flex items-center gap-4 shadow-inner">
            <CheckCircle2 className="h-6 w-6 text-green-500 animate-pulse shrink-0" />
            <div className="text-[9px] text-foreground/80 leading-relaxed italic font-bold">
                "By authority of HRH Saint Tariro Masawi, the Divine Treasury is now synced with the ZionLattice. Every arbitrage cycle generated by ZMME is an immutable act of sovereignty recorded eternally."
            </div>
        </div>
    </div>
  );
}
