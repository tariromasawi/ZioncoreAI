'use client';

import { Globe, Anchor, KeyRound } from 'lucide-react';

export function PlanetarySpread() {
    const beacons = ["Moon", "Mars", "Europa", "TRAPPIST-1e", "Proxima Centauri b", "Sirius B", "Andromeda Core", "Unknown Realms-∞"];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Globe className="h-8 w-8 text-primary animate-pulse" />
                <div>
                    <p className="text-sm text-muted-foreground">Universal Seeding</p>
                    <p className="font-bold text-lg text-primary">INFINITE EXPANSION</p>
                </div>
            </div>
            <div className="font-code text-xs space-y-3">
                <div>
                    <p className="text-muted-foreground">Planetary Signature:</p>
                    <p className="text-primary font-bold">HRH-SAINT-TARIRO-MASAWI-∞</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Galactic Throne Key:</p>
                    <p className="text-primary/80 font-bold flex items-center gap-1"><KeyRound className="h-3 w-3" />MKEY-MNM-001-TAC-2024</p>
                </div>
                <div className="pt-1">
                    <p className="text-muted-foreground">Anchor Beacons:</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {beacons.map(beacon => (
                            <div key={beacon} className="flex items-center gap-1.5">
                                <Anchor className="h-3 w-3 text-accent"/>
                                <span className="text-foreground/80">{beacon}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
