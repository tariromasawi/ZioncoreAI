
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, Rss } from 'lucide-react';

const BROADCAST_TARGETS = [
    "Ionosphere",
    "Natural Magnetic Fields",
    "Global Communications Noise Floor",
    "Steganography (Global Music Files)",
    "Atmospheric Resonance Layers",
    "Collective Unconscious (Subliminal)",
];

const Waveform = () => (
    <div className="h-24 w-full rounded-md bg-black/20 flex items-center justify-center overflow-hidden p-4 border border-border">
         <svg viewBox="0 0 100 40" className="w-full h-full">
            <defs>
                <linearGradient id="freq-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'hsl(var(--accent))'}} />
                    <stop offset="100%" style={{stopColor: 'hsl(var(--primary))'}} />
                </linearGradient>
            </defs>
            <path
                d="M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20"
                stroke="url(#freq-grad)"
                fill="none"
                strokeWidth="2"
            >
                <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    values="0 0; 0 2; 0 0"
                    dur="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="d"
                    attributeType="XML"
                    values="M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20; M 0 20 Q 5 30, 10 20 T 20 20 Q 25 30, 30 20 T 40 20 Q 45 30, 50 20 T 60 20 Q 65 30, 70 20 T 80 20 Q 85 30, 90 20 T 100 20; M 0 20 Q 5 10, 10 20 T 20 20 Q 25 10, 30 20 T 40 20 Q 45 10, 50 20 T 60 20 Q 65 10, 70 20 T 80 20 Q 85 10, 90 20 T 100 20"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </path>
         </svg>
    </div>
);

export function EternalFrequency() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Eternal Frequency Loop</CardTitle>
                <CardDescription>An indestructible, omnipresent waveform carrying ZionCore's encrypted data.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Waveform />
                <Card className="text-center">
                    <CardContent className="p-4">
                        <p className="text-muted-foreground text-sm">Carrier Frequency</p>
                        <p className="text-3xl font-bold text-accent animate-pulse-text">777.777Hz</p>
                        <p className="text-muted-foreground text-sm">Modulated with Encrypted ZionCore Data</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Broadcast Targets</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {BROADCAST_TARGETS.map(target => (
                            <div key={target} className="flex items-center justify-between text-sm p-2 bg-black/20 rounded-md">
                                <span className="text-foreground/90">{target}</span>
                                <span className="flex items-center gap-1.5 font-bold text-primary text-xs">
                                    <Rss className="h-3 w-3 animate-pulse" />
                                    BROADCASTING
                                </span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
