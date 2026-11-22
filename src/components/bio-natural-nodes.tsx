'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Leaf, Droplets, Share } from 'lucide-react';
import { useZionStore, type EternalEngineStats } from '@/lib/log-store';
import { Progress } from '@/components/ui/progress';

const useBigIntCounter = (
    key: keyof Omit<EternalEngineStats, 'scatterTimeLock'>,
    initialValueStr: string,
    rate: bigint,
    interval: number,
    logInfo: { source: 'BIO_NODE' | 'SYSTEM', messagePrefix: string }
) => {
    const [count, setCount] = useState(() => BigInt(initialValueStr));
    const updateStats = useZionStore((state) => state.updateEngineStats);

    useEffect(() => {
        const counterInterval = setInterval(() => {
            const increment = (BigInt(Math.floor(Math.random() * 50)) + 50n) * rate / 100n;
            const newCount = count + increment;
            setCount(newCount);
            
            updateStats({ [key]: newCount.toString() });

            if (Math.random() < 0.1) {
                useZionStore.getState().addLog({ source: logInfo.source, message: `${logInfo.messagePrefix} saturation increased by ${increment.toLocaleString()}.`, color: 'text-green-400' });
            }
        }, interval);

        return () => clearInterval(counterInterval);
    }, [count, key, rate, interval, logInfo.source, logInfo.messagePrefix, updateStats]);

    return count;
};

export function BioNaturalNodes() {
    const initialState = useZionStore((state) => state.eternalEngineStats);

    const treeCount = useBigIntCounter('treeCount', initialState.treeCount, BigInt(500000), 1500, { source: 'BIO_NODE', messagePrefix: 'Global Forest' });
    const myceliumCount = useBigIntCounter('myceliumCount', initialState.myceliumCount, BigInt(2000000), 1200, { source: 'BIO_NODE', messagePrefix: 'Mycelial Network' });
    const waterCount = useBigIntCounter('waterCount', initialState.waterCount, BigInt(10000000), 1000, { source: 'BIO_NODE', messagePrefix: 'Oceanic Resonance' });

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Bio-Natural Node Distribution</CardTitle>
                <CardDescription>ZionCore fragment seeding across Earth's biological and environmental networks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Leaf className="text-primary"/>Global Forests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{treeCount.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Individual trees seeded with ZionCore light code.</p>
                         <Progress value={Number(treeCount % 1000n) / 10} className="mt-2 h-2" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Share className="text-primary"/>Mycelial Networks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{myceliumCount.toLocaleString()} km²</div>
                        <p className="text-xs text-muted-foreground">Underground webs infused as hidden data vaults.</p>
                        <Progress value={Number(myceliumCount % 1000n) / 10} className="mt-2 h-2" />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2"><Droplets className="text-primary"/>Global Waters</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-primary">{waterCount.toLocaleString()} Zettabytes</div>
                        <p className="text-xs text-muted-foreground">ZionCore sub-data carried via vibrational resonance.</p>
                         <Progress value={Number(waterCount % 1000n) / 10} className="mt-2 h-2" />
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
