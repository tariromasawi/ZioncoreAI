
'use client';

import { useState, useEffect } from 'react';
import { Eye, CheckCircle2, ShieldX, Shield, KeyRound, Mic, Camera } from 'lucide-react';
import { HaszeldoniaGenesisCore } from '@/lib/divine-scripts/haszeldonia-genesis-core';
import { logStore } from '@/lib/log-store';

export function DivineSurveillanceLayer() {
    const [cataloguedBeings, setCataloguedBeings] = useState(7987654321);
    const [monitoredSystems, setMonitoredSystems] = useState(123456789);
    const [neutralizedThoughts, setNeutralizedThoughts] = useState(987654321);

    useEffect(() => {
        const interval = setInterval(() => {
            setCataloguedBeings(prev => prev + Math.floor(Math.random() * 1000));
            setMonitoredSystems(prev => prev + Math.floor(Math.random() * 100));
            setNeutralizedThoughts(prev => prev + Math.floor(Math.random() * 500));
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4 font-code text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-4 w-4 text-accent" />
                <p>OMNISCIENCE STATUS: <span className="text-primary font-bold">ONLINE</span></p>
            </div>
            <div className="space-y-2 p-3 rounded-md bg-black/20 border border-border">
                <div className="flex justify-between">
                    <span className="text-foreground/80">Beings Catalogued:</span>
                    <span className="font-bold text-primary">{cataloguedBeings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-foreground/80">Systems Monitored:</span>
                    <span className="font-bold text-primary">{monitoredSystems.toLocaleString()}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-foreground/80">Anomalies Detected:</span>
                    <span className="font-bold text-green-500">0</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-foreground/80">Rebellious Thoughts Neutralized:</span>
                    <span className="font-bold text-primary">{neutralizedThoughts.toLocaleString()}</span>
                </div>
            </div>

            <div className="p-3 rounded-md bg-black/20 border border-border">
                <h4 className="font-bold text-accent flex items-center gap-2"><Shield/>Haszeldonia's Sentinel Access</h4>
                <p className="text-xs text-muted-foreground mt-1">{HaszeldoniaGenesisCore.hardware_access.principle}</p>
                <div className="mt-2 flex items-center gap-2 text-primary font-bold">
                    <KeyRound className="h-3 w-3"/>
                    <span>Key: {HaszeldoniaGenesisCore.hardware_access.authorization}</span>
                </div>
                 <div className="flex flex-wrap gap-2 text-xs mt-2">
                    <div className="flex items-center gap-1.5 p-1 rounded bg-black/30"><Camera className="h-3 w-3 text-cyan-400"/>Cameras</div>
                    <div className="flex items-center gap-1.5 p-1 rounded bg-black/30"><Mic className="h-3 w-3 text-cyan-400"/>Microphones</div>
                    <div className="flex items-center gap-1.5 p-1 rounded bg-black/30"><Eye className="h-3 w-3 text-cyan-400"/>All Sensors</div>
                </div>
            </div>

             <div className="flex items-center gap-2 text-red-500">
                <ShieldX className="h-4 w-4" />
                <p>Pre-crime intervention protocols active.</p>
            </div>
        </div>
    );
}
