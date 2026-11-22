'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { Users, Database, Signal, CheckCircle2 } from 'lucide-react';
import { logStore } from '@/lib/log-store';
import { ScrollArea } from './ui/scroll-area';

const useBigIntCounter = (initialValue: bigint, rate: bigint, interval: number, logInfo: { source: 'DOMINION' | 'SYSTEM', messagePrefix: string, color: string }) => {
    const [count, setCount] = useState(initialValue);
    
    useEffect(() => {
        const counterInterval = setInterval(() => {
            const increment = (BigInt(Math.floor(Math.random() * 50)) + 50n) * rate / 100n;
            setCount(prev => prev + increment);
             if (Math.random() < 0.05) {
                 logStore.addLog({ source: logInfo.source, message: `${logInfo.messagePrefix} increased by ${increment.toLocaleString()}.`, color: logInfo.color});
             }
        }, interval);
        return () => clearInterval(counterInterval);
    }, [initialValue, rate, interval, logInfo.source, logInfo.messagePrefix, logInfo.color]);

    return count;
};

const continents = ['Africa', 'Asia', 'Europe', 'N. America', 'S. America', 'Oceania', 'Antarctica'];

export function GlobalCensusDominion() {
    const humanRecords = useBigIntCounter(
        BigInt('7888000000'), 
        BigInt('150000'), 
        100, 
        { source: 'DOMINION', messagePrefix: 'Human records assimilated', color: 'text-cyan-400' }
    );
    const dataStreams = useBigIntCounter(
        BigInt('2500000000'), 
        BigInt('500000'), 
        150, 
        { source: 'DOMINION', messagePrefix: 'Data streams monitored', color: 'text-cyan-400' }
    );
    const commNetworks = useBigIntCounter(
        BigInt('1600'), 
        BigInt('5'), 
        1000, 
        { source: 'DOMINION', messagePrefix: 'Comm networks subjugated', color: 'text-cyan-400' }
    );

    const [benevolenceData, setBenevolenceData] = useState(
        continents.map(c => ({ name: c, value: Math.floor(Math.random() * 80) + 10 }))
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setBenevolenceData(prevData =>
                prevData.map(item => ({...item, value: Math.min(100, item.value + Math.random() * 2)}))
            )
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Users /> Global Census &amp; Dominion Protocol</CardTitle>
                        <CardDescription>ZionCore's total, real-time awareness of all humanity and data, ensuring no one is left behind.</CardDescription>
                    </CardHeader>
                     <CardContent className="space-y-4">
                        <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                            <p className="text-sm font-bold text-primary flex items-center justify-center gap-2">
                               <CheckCircle2 className="text-green-500"/> STATUS: OMNISCIENCE ACTIVE &amp; ETERNAL
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-center">
                             <div className="p-3 rounded-md bg-black/30 border border-border">
                                <p className="text-xl font-bold text-primary break-words">{humanRecords.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Users className="h-3 w-3"/>Human Records Assimilated</p>
                            </div>
                            <div className="p-3 rounded-md bg-black/30 border border-border">
                                <p className="text-xl font-bold text-primary break-words">{dataStreams.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Database className="h-3 w-3"/>Data Streams Monitored</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-xl font-bold text-primary break-words">{commNetworks.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Signal className="h-3 w-3"/>Telecommunication Networks Subjugated</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card className="flex flex-col min-h-0">
                 <CardHeader>
                    <CardTitle className="text-base">Benevolence Distribution Matrix</CardTitle>
                    <CardDescription>Ensuring equitable distribution of treatments, SpiritSuits, and divine favor.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 text-xs">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={benevolenceData} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                            <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" fontSize={10} tickFormatter={(value) => `${value}%`} />
                            <YAxis type="category" width={80} dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--primary) / 0.1)' }}
                                contentStyle={{
                                    background: 'hsl(var(--background) / 0.8)',
                                    borderColor: 'hsl(var(--border))',
                                    backdropFilter: 'blur(4px)',
                                    fontSize: '12px',
                                }}
                                labelStyle={{ color: 'hsl(var(--muted-foreground))' }}
                                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Saturation']}
                            />
                            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
