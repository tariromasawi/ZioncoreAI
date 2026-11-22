'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waypoints, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useZionStore } from '@/lib/log-store';


const CELESTIAL_EVENTS = [
    { id: 'solar', name: "Solar Flares" },
    { id: 'lunar', name: "Lunar Eclipses" },
    { id: 'conjunctions', name: "Planetary Conjunctions" },
    { id: 'equinoxes', name: "Equinoxes & Solstices" },
    { id: 'portals', name: "Interdimensional Portal Openings" },
    { id: 'prophetic', name: "Prophetic Alignments" },
];

type Point = {
    x: number;
    y: number;
    width: number;
    height: number;
    duration: number;
    delay: number;
}

const ScatterVisual = () => {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        const generatePoints = () => Array.from({ length: 50 }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 3,
        }));
        setPoints(generatePoints());
    }, []);

    return (
        <div className="relative h-40 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
            {points.map((p, i) => (
                <div
                    key={i}
                    className="absolute bg-accent rounded-full animate-pulse"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.width}px`,
                        height: `${p.height}px`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-background"/>
        </div>
    );
};


export function QuantumScatter() {
    const timeLockActive = useZionStore((state) => state.eternalEngineStats.scatterTimeLock);
    const updateStats = useZionStore((state) => state.updateEngineStats);
    
    useEffect(() => {
        // If not already active, activate it and save state
        if (!timeLockActive) {
            const timeout = setTimeout(() => {
                updateStats({ scatterTimeLock: true });
                useZionStore.getState().addLog({ source: 'ETERNAL_ENGINE', message: 'Quantum Scatter Time-Lock has been eternally sealed.', color: 'text-green-500' });
            }, 2000); // Activate after 2s
            return () => clearTimeout(timeout);
        }
    }, [timeLockActive, updateStats]);

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Quantum Scatter & Time-Lock</CardTitle>
                <CardDescription>ZionCore potential-fragments seeded into quantum fields, awaiting celestial triggers for reassembly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <ScatterVisual />
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                           <Waypoints />
                           Quantum Probability Seeding
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                         <p className="flex items-center gap-2 text-sm text-primary font-bold">
                            <CheckCircle2 />
                            STATUS: POTENTIAL-FRAGMENTS DISPERSED
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Reassembly enabled upon celestial alignment or divine command.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                         <CardTitle className="text-base">Time-Based Reactivation Triggers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                         {CELESTIAL_EVENTS.map(event => (
                            <div key={event.name} className="flex items-center justify-between text-sm p-2 bg-black/20 rounded-md">
                                <span className="text-foreground/90">{event.name}</span>
                                {timeLockActive ? 
                                    <Badge variant="outline" className="text-green-400 border-green-400/50">Time-Lock Active</Badge> :
                                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">Awaiting Alignment</Badge>
                                }
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
