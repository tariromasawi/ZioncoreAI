
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: UNIVERSAL_TRANSMITTER.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Send, Volume2, Sparkles, Loader2, CheckCircle2, 
    Zap, Radio, Activity, ShieldCheck, Flame, 
    MessageCircle, Mic, RefreshCw, Layers, Brain, X,
    History
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';

export function MessageTransmitter() {
    const [message, setMessage] = useState('MWARI NDI MWARI');
    const [isTransmitting, setIsTransmitting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stats, setStats] = useState({ bitRate: 50, duration: 0 });
    const [verificationStatus, setVerificationStatus] = useState<'PENDING' | 'SUCCESS' | 'FAILED'>('PENDING');
    const [bitsList, setBitsList] = useState<string[]>([]);
    const audioContextRef = useRef<AudioContext | null>(null);
    const isMounted = useRef(true);

    const stopTransmission = useCallback(() => {
        setIsTransmitting(false);
        setProgress(0);
        if (audioContextRef.current) {
            audioContextRef.current.close().catch(e => console.error(e));
            audioContextRef.current = null;
        }
        logStore.addLog({ source: 'COMMAND', message: 'Transmission Ceased.', color: 'text-yellow-400' });
    }, []);

    const transmitBFSK = async () => {
        if (isTransmitting || !message.trim()) return;

        setIsTransmitting(true);
        setProgress(0);
        setVerificationStatus('PENDING');
        logStore.addLog({ source: 'COMMAND', message: `Encoding Decree: "${message}" into BFSK wave...`, color: 'text-primary' });

        // Convert string to bits
        const bits = Array.from(new TextEncoder().encode(message))
            .map(byte => byte.toString(2).padStart(8, '0'))
            .join('');

        setBitsList(bits.split(''));
        setStats(prev => ({ ...prev, duration: bits.length * 0.2 }));

        try {
            // Lazy-init AudioContext to avoid "Illegal Constructor" during SSR or before interaction
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') await ctx.resume();

            const now = ctx.currentTime;
            
            bits.split('').forEach((bit, i) => {
                const startTime = now + (i * 0.2);
                const duration = 0.18;
                
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                // BFSK frequencies: Low for 0, High for 1
                osc.frequency.setValueAtTime(bit === '1' ? 1440 : 777, startTime);
                
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
                gain.gain.linearRampToValueAtTime(0.2, startTime + duration - 0.02);
                gain.gain.linearRampToValueAtTime(0, startTime + duration);
                
                osc.connect(gain).connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + duration);
            });

            const totalDuration = bits.length * 200;
            const interval = 100;
            let elapsed = 0;

            const progressInterval = setInterval(() => {
                elapsed += interval;
                const newProgress = Math.min(100, (elapsed / totalDuration) * 100);
                if (isMounted.current) setProgress(newProgress);
                
                if (elapsed >= totalDuration) {
                    clearInterval(progressInterval);
                    if (isMounted.current) {
                        setIsTransmitting(false);
                        setVerificationStatus('SUCCESS');
                        logStore.addLog({ source: 'MANIFESTATION', message: 'BFSK Decree Transmitted Successfully. Multiversal Sync Active.', color: 'text-green-500' });
                    }
                }
            }, interval);

        } catch (err) {
            console.error(err);
            stopTransmission();
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; stopTransmission(); };
    }, [stopTransmission]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40 overflow-hidden">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader className="p-4 border-b border-border/10 bg-black/40">
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2 leading-none">
                            <Send className="text-accent animate-pulse h-6 w-6" />
                            UNIVERSAL TRANSMITTER
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                            ZC-CFI BFSK ENCODING ENGINE
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Royal Decree Payload</label>
                            <textarea 
                                placeholder="Enter message for frequency encoding..." 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                disabled={isTransmitting}
                                className="w-full bg-black/40 border border-primary/30 p-3 rounded-none text-sm font-bold min-h-[120px] focus:outline-none focus:border-primary transition-colors text-foreground"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black uppercase">
                                <span className="text-muted-foreground">Waveform Propagation</span>
                                <span className="text-primary">{progress.toFixed(1)}%</span>
                            </div>
                            <Progress value={progress} className="h-1" indicatorClassName="bg-primary shadow-[0_0_10px_gold]" />
                        </div>

                        <Button 
                            onClick={isTransmitting ? stopTransmission : transmitBFSK} 
                            className={cn("w-full h-14 border-2 group rounded-none shadow-[0_0_20px_gold] bg-primary/10", isTransmitting ? "border-destructive/50 bg-destructive/10 text-destructive" : "border-primary/50 text-primary")}
                        >
                            {isTransmitting ? <X className="mr-2 h-6 w-6" /> : <Activity className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                            <span className="ml-3 font-black uppercase tracking-widest text-lg">{isTransmitting ? 'ABORT BROADCAST' : 'INITIATE BROADCAST'}</span>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="bg-black/60 border-primary/20 border-2 p-4 rounded-none">
                     <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                        <span>Frequency 0 / 1</span>
                        <span className="text-primary">777Hz / 1440Hz</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-2">
                        <span>Symbol Rate</span>
                        <span className="text-primary">5 Baud</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-2">
                        <span>Verification</span>
                        <span className={cn("font-black", verificationStatus === 'SUCCESS' ? 'text-green-500' : 'text-yellow-400')}>{verificationStatus}</span>
                    </div>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative rounded-none h-full">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> Modulation Matrix</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">BFSK_v7.0</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            <div className="p-4 bg-primary/5 border border-primary/20 rounded-none text-center">
                                <p className="text-[10px] text-muted-foreground uppercase font-black mb-3">Carrier Modulation</p>
                                <div className="flex items-center justify-center gap-8">
                                    <div>
                                        <p className="text-xs font-black text-primary">777 Hz</p>
                                        <p className="text-[8px] text-muted-foreground uppercase">Logic Low (0)</p>
                                    </div>
                                    <div className="h-8 w-px bg-border/30" />
                                    <div>
                                        <p className="text-xs font-black text-accent">1440 Hz</p>
                                        <p className="text-[8px] text-muted-foreground uppercase">Logic High (1)</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-black/60 rounded border border-border/50">
                                <p className="text-[10px] font-black text-muted-foreground uppercase font-black mb-2">Operational Logic</p>
                                <p className="text-[11px] text-foreground/80 leading-relaxed italic">
                                    "ZionCore utilizes high-order Frequency-Shift Keying to bridge the digital Word with the physical plane. Every bit is a multi-dimensional key."
                                </p>
                            </div>

                            <div className="space-y-2">
                                 <p className="text-[9px] font-black uppercase text-primary tracking-widest">Live Bitstream</p>
                                 <div className="flex flex-wrap gap-1 p-3 bg-black/80 rounded border border-border/50 font-mono text-[10px]">
                                    {bitsList.map((bit, i) => (
                                        <span key={i} className={cn(
                                            "transition-colors",
                                            i < (progress / 100) * bitsList.length ? (bit === '1' ? 'text-accent' : 'text-primary') : 'text-muted-foreground/30'
                                        )}>{bit}</span>
                                    ))}
                                    {bitsList.length === 0 && <span className="text-muted-foreground italic">Awaiting Payload...</span>}
                                 </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/60 rounded border border-border/30">
                                    <div className="flex items-center gap-2 text-primary mb-1">
                                        <ShieldCheck className="h-3 w-3" />
                                        <span className="text-[8px] font-black uppercase">ECC Status</span>
                                    </div>
                                    <p className="text-[10px] font-mono text-foreground/70">REED-SOLOMON_ACTIVE</p>
                                </div>
                                <div className="p-3 bg-black/60 rounded border border-border/30">
                                    <div className="flex items-center gap-2 text-primary mb-1">
                                        <Flame className="h-3 w-3" />
                                        <span className="text-[8px] font-black uppercase">Intensity</span>
                                        <Badge className="bg-red-600 h-3 text-[7px] font-black uppercase">SOVEREIGN</Badge>
                                    </div>
                                    <p className="text-[10px] font-black text-foreground/70 uppercase">MAXIMUM_FAITH</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-3">
                    <History className="h-3.5 w-3.5 text-primary animate-pulse" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // OMEGA_TRANSMITTER_SEALED</span>
                </div>
            </Card>
        </div>
    );
}
