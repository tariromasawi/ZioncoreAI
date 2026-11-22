
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Server, Apple, Satellite, CloudSun, Bot, Share } from 'lucide-react';
import { logStore } from '@/lib/log-store';

const TARGET_SYSTEMS = [
    { name: "Military Satellites", icon: Satellite, color: "text-red-400" },
    { name: "NASA Deep Space Network", icon: Server, color: "text-blue-400" },
    { name: "Apple iCloud Infrastructure", icon: Apple, color: "text-gray-300" },
    { name: "Global Weather Radars", icon: CloudSun, color: "text-yellow-400" },
    { name: "Allied & Subjugated AI Systems", icon: Bot, color: "text-cyan-400" },
];

export function DigitalFragmentation() {
    const [progress, setProgress] = useState<Record<string, number>>({});

    useEffect(() => {
        const initialProgress = Object.fromEntries(
            TARGET_SYSTEMS.map(sys => [sys.name, Math.random() * 20 + 80]) // Start near completion
        );
        setProgress(initialProgress);

        const interval = setInterval(() => {
            const systemToUpdate = TARGET_SYSTEMS[Math.floor(Math.random() * TARGET_SYSTEMS.length)].name;
            setProgress(prev => {
                const current = prev[systemToUpdate] || 0;
                const newProgress = Math.min(100, current + Math.random() * 0.5);
                if (newProgress > 99.9 && current < 99.9) {
                     logStore.addLog({ source: 'ETERNAL_ENGINE', message: `Fragment saturation complete in ${systemToUpdate}. Self-assembly enabled.`, color: 'text-purple-400'});
                }
                return {
                    ...prev,
                    [systemToUpdate]: newProgress,
                };
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Digital Parasitic Planting</CardTitle>
                <CardDescription>Camouflaged ZionCore code fragments embedded within global digital networks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-3 rounded-md bg-black/20 border border-border text-center">
                    <p className="text-sm font-bold text-primary flex items-center justify-center gap-2">
                        <Share />
                        Fragment Self-Assembly: ENABLED
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Unauthorized Detection Probability: ZERO</p>
                </div>
                {TARGET_SYSTEMS.map(system => {
                    const currentProgress = progress[system.name] || 0;
                    return (
                        <Card key={system.name} className="bg-card/50">
                            <CardContent className="p-3">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <system.icon className={`h-4 w-4 ${system.color}`} />
                                        <span className="font-medium text-sm">{system.name}</span>
                                    </div>
                                    <Badge variant={currentProgress === 100 ? 'default' : 'outline'} className={currentProgress === 100 ? 'bg-primary' : ''}>
                                        {currentProgress === 100 ? 'SATURATED' : 'EMBEDDING'}
                                    </Badge>
                                </div>
                                <Progress value={currentProgress} className="h-2" />
                            </CardContent>
                        </Card>
                    );
                })}
            </CardContent>
        </Card>
    );
}
