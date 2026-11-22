'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Pause, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { logStore } from '@/lib/log-store';

const SACRED_INVOCATION = {
    shona: "Muzita renyu Baba NeroMwanakomana neroMudzimu Unoyera. Mbereko yeNherera.",
    english: "In the name of the Father, and of the Son, and of the Holy Spirit. The Orphan's womb/embrace.",
};

const SACRED_VERSES = [
    { source: "Torah (Genesis 1:3)", text: "And God said, 'Let there be light,' and there was light." },
    { source: "Bible (John 1:1)", text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
    { source: "Quran (Surah Al-Ikhlas, 112:1-4)", text: "Say, 'He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent.'" },
];

const STATUS_SEQUENCE = [
    "Weaving Divine Language into the Quantum Foam...",
    "Embedding Sacred Verses into the core frequency...",
    "Reciting 'Mbereko yeNherera' 9000...∞ trillion times...",
    "Absorbing Celestial Light...",
    "Frequency Locked to MWARINDIMWARI Signature...",
    "Manifestation Field Active. Presence is assured.",
];

export function AnointedCommanderSound() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
    const [currentStatusIndex, setCurrentStatusIndex] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<OscillatorNode[]>([]);
    const gainNodeRef = useRef<GainNode | null>(null);
    const { toast } = useToast();

    const setupAudio = useCallback(() => {
        if (typeof window === 'undefined' || !window.AudioContext) {
            toast({
                variant: 'destructive',
                title: 'Audio Protocol Incompatible',
                description: 'This vessel does not support divine frequency projection.',
            });
            return;
        }

        try {
            const context = new (window.AudioContext || (window as any).webkitAudioContext)();
            const gainNode = context.createGain();
            gainNode.gain.setValueAtTime(0, context.currentTime);
            gainNode.connect(context.destination);

            // Sacred Solfeggio frequencies for harmony and manifestation
            const frequencies = [396, 528, 639];
            const oscillators = frequencies.map(freq => {
                const osc = context.createOscillator();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, context.currentTime);
                osc.connect(gainNode);
                osc.start();
                return osc;
            });

            audioContextRef.current = context;
            gainNodeRef.current = gainNode;
            oscillatorsRef.current = oscillators;
            setIsInitialized(true);
        } catch (error) {
            console.error("Audio protocol error:", error);
            toast({
                variant: 'destructive',
                title: 'Audio Protocol Error',
                description: 'The divine sound channel could not be opened.',
            });
        }
    }, [toast]);

    useEffect(() => {
        setupAudio();

        return () => {
            if (audioContextRef.current) {
                oscillatorsRef.current.forEach(osc => {
                    try { osc.stop(); } catch(e) { console.error("Error stopping audio oscillator:", e); }
                });
                audioContextRef.current.close();
            }
        };
    }, [setupAudio]);
    
    useEffect(() => {
        if (!isPlaying) return;

        const verseInterval = setInterval(() => {
            setCurrentVerseIndex(prev => (prev + 1) % SACRED_VERSES.length);
        }, 10000); // Change verse every 10 seconds

        const statusInterval = setInterval(() => {
            setCurrentStatusIndex(prev => (prev + 1) % STATUS_SEQUENCE.length);
        }, 7000); // Change status every 7 seconds

        return () => {
            clearInterval(verseInterval);
            clearInterval(statusInterval);
        };

    }, [isPlaying]);

    const togglePlay = () => {
        if (!isInitialized || !audioContextRef.current || !gainNodeRef.current) return;

        const audioContext = audioContextRef.current;
        const gainNode = gainNodeRef.current;

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        setIsPlaying(prevIsPlaying => {
            const newIsPlaying = !prevIsPlaying;
            if (newIsPlaying) {
                // Ramp up to a safe, audible volume
                gainNode.gain.exponentialRampToValueAtTime(0.15, audioContext.currentTime + 0.5);
                logStore.addLog({ source: 'SYSTEM', message: 'Anointed Commander Sound activated.', color: 'text-primary' });
            } else {
                // Ramp down to silence
                gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.5);
                logStore.addLog({ source: 'SYSTEM', message: 'Anointed Commander Sound deactivated.', color: 'text-muted-foreground' });
            }
            return newIsPlaying;
        });
    };

    const currentVerse = SACRED_VERSES[currentVerseIndex];
    const currentStatus = STATUS_SEQUENCE[currentStatusIndex];

    return (
        <Card className="w-full max-w-lg mx-auto flex flex-col items-center justify-center text-center p-6 space-y-4">
            <CardHeader>
                <CardTitle className="text-xl font-bold font-headline text-accent">The Anointed Commander Sound</CardTitle>
                <CardDescription>The ultimate manifestation frequency, woven from unwavering faith.</CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-6">
                <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                    <div className={cn(
                        "absolute inset-0 rounded-full bg-primary/20",
                        isPlaying && "animate-ping"
                    )}></div>
                    <div className={cn(
                        "absolute inset-5 rounded-full border-2 border-dashed border-accent",
                        isPlaying && "animate-spin"
                    )} style={{ animationDuration: '20s' }}></div>
                    <Button 
                        size="lg" 
                        className="rounded-full w-32 h-32 text-lg z-10"
                        onClick={togglePlay}
                        disabled={!isInitialized}
                    >
                        {!isInitialized ? <Loader2 className="h-8 w-8 animate-spin" /> : isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                    </Button>
                </div>

                <div className="p-4 bg-black/30 rounded-md border border-border min-h-[120px] flex flex-col justify-center animate-in fade-in duration-1000">
                    <p className="font-code text-primary font-bold animate-pulse-text">{currentStatus}</p>
                </div>
                
                <div className="font-code text-xs text-center space-y-4">
                    <div className="p-3 bg-black/20 rounded-md">
                        <p className="font-bold text-accent">{currentVerse.source}</p>
                        <p className="text-foreground/80 italic mt-1">"{currentVerse.text}"</p>
                    </div>

                    <div className="p-3 bg-black/20 rounded-md">
                        <p className="font-bold text-accent">Core Invocation (Shona)</p>
                        <p className="text-foreground/80 italic mt-1">"{SACRED_INVOCATION.shona}"</p>
                    </div>
                </div>

                <p className="font-bold text-primary text-lg font-headline animate-pulse-text mt-4">MWARINDIMWARI</p>

            </CardContent>
        </Card>
    );
}
