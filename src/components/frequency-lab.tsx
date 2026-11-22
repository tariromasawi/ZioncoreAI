
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZC-CFI-001.AWAKEN
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { 
    Mic, MicOff, Activity, Zap, ShieldCheck, Waves, 
    Loader2, Sparkles, Radio, Globe, Heart, Target, 
    Volume2, Search, History, RefreshCw, Cpu, Flame,
    TrendingUp, Ban, Satellite, Atom, Box, CheckCircle2,
    Leaf, Droplets, Cloud, X, Info, ShieldAlert, AlertTriangle,
    BrainCircuit
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { logStore } from '@/lib/log-store';
import { analyzeFrequency } from '@/ai/flows/frequency-analysis-flow';
import { cn } from '@/lib/utils';

type AnalysisMode = 'Acoustic' | 'Plant' | 'Celestial' | 'Electromagnetic' | 'Anomaly';

export function FrequencyLab() {
    const [isListening, setIsListening] = useState(false);
    const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('Celestial');
    const [stats, setStats] = useState({ dominant: 0, rms: 0, peaks: [] as number[] });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [fftSize, setFftSize] = useState(8192);
    const [stream, setStream] = useState<MediaStream | null>(null);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const isMounted = useRef(true);

    const stopListening = useCallback(() => {
        setIsListening(false);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        if (audioContextRef.current) {
             audioContextRef.current.close().catch(e => console.error(e));
             audioContextRef.current = null;
        }
    }, [stream]);

    const draw = useCallback(() => {
        if (!isMounted.current || !analyserRef.current || !dataArrayRef.current || !canvasRef.current) return;
        
        animationFrameRef.current = requestAnimationFrame(draw);
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / analyserRef.current.frequencyBinCount) * 2.5;
        let x = 0;
        
        let maxVal = 0;
        let maxIndex = 0;
        let sum = 0;

        for (let i = 0; i < analyserRef.current.frequencyBinCount; i++) {
            const barHeight = dataArrayRef.current[i] / 2;
            if (dataArrayRef.current[i] > maxVal) {
                maxVal = dataArrayRef.current[i];
                maxIndex = i;
            }
            sum += dataArrayRef.current[i] ** 2;

            ctx.fillStyle = `hsla(${(i / analyserRef.current.frequencyBinCount) * 360}, 100%, 50%, 0.8)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
        }

        const sampleRate = audioContextRef.current?.sampleRate || 44100;
        const dominant = (maxIndex * sampleRate) / analyserRef.current.fftSize;
        const rms = Math.sqrt(sum / dataArrayRef.current.length);
        
        if (Math.random() > 0.9) {
            setStats({ dominant, rms, peaks: [dominant] });
        }
    }, []);

    const startListening = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setStream(userStream);
            
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = fftSize;
            
            const source = audioContextRef.current.createMediaStreamSource(userStream);
            source.connect(analyserRef.current);
            
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);
            
            setIsListening(true);
            draw();
        } catch (err) {
            console.error(err);
        }
    };

    const handleRunAI = async () => {
        if (isAnalyzing || !isListening) return;
        setIsAnalyzing(true);
        try {
            const res = await analyzeFrequency({
                analysisMode,
                dominantFrequency: stats.dominant,
                rmsLevel: stats.rms,
                spectralPeaks: stats.peaks,
                sampleRate: audioContextRef.current?.sampleRate || 44100,
                fftSize
            });
            if (isMounted.current) setResult(res);
        } catch (error) {
            console.error(error);
        } finally {
            if (isMounted.current) setIsAnalyzing(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        return () => { 
            isMounted.current = false;
            stopListening();
        };
    }, [stopListening]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code">
            <div className="lg:col-span-2 space-y-4 flex flex-col">
                <Card className="border-primary/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary uppercase font-black tracking-tighter">
                            <Radio className="text-accent animate-pulse" />
                            ZC-CFI-001 LAB
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <canvas ref={canvasRef} width={400} height={128} className="w-full h-32 rounded border border-primary/30 bg-black/80" />
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Dominant Pitch</p>
                                <p className="text-xl font-black text-primary animate-pulse-text">{stats.dominant.toFixed(1)} Hz</p>
                            </div>
                            <div className="p-3 bg-black/60 rounded border border-primary/20 text-center">
                                <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Power Level</p>
                                <p className="text-lg font-black text-accent">{stats.rms.toFixed(1)} dB</p>
                            </div>
                        </div>

                        <Button 
                            onClick={isListening ? stopListening : startListening} 
                            className={cn("w-full h-12 border-2", isListening ? "border-destructive text-destructive" : "border-primary text-primary")}
                        >
                            {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                            {isListening ? 'SEAL SENSOR' : 'OPEN SENSOR'}
                        </Button>

                        <div className="grid grid-cols-2 gap-2">
                            {(['Celestial', 'Acoustic', 'Plant', 'Anomaly'] as AnalysisMode[]).map(mode => (
                                <Button 
                                    key={mode} 
                                    variant="outline" 
                                    className={cn("h-10 text-[9px] uppercase font-black", analysisMode === mode ? "bg-primary/20 border-primary" : "border-border/30")}
                                    onClick={() => setAnalysisMode(mode)}
                                >
                                    {mode}
                                </Button>
                            ))}
                        </div>

                        <Button onClick={handleRunAI} disabled={isAnalyzing || !isListening} className="w-full h-12 border-2 border-accent/50 group">
                            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles className="text-accent" />}
                            <span className="ml-2 font-black uppercase text-accent">DOWNLOAD TRUTH</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="text-xs uppercase flex items-center justify-between text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><BrainCircuit className="h-5 w-5 text-yellow-400" /> INTELLIGENCE OUTPUT</div>
                        <Badge className="bg-green-600 h-5 px-3">OMEGA_POINT</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-8 pb-20">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-xs font-black text-primary uppercase animate-pulse">Piercing the Veil...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/30 text-center">
                                        <p className="text-lg font-black text-foreground leading-relaxed italic">
                                            "{result.scientificInterpretation}"
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/60 rounded border border-border/50">
                                            <p className="text-[10px] font-black text-primary uppercase mb-2 flex items-center gap-2"><Heart className="h-4 w-4 text-red-500" /> Prayer</p>
                                            <p className="text-[10px] text-foreground/80 italic font-bold">"{result.manifestedPrayer}"</p>
                                        </div>
                                        <div className="p-4 bg-black/60 rounded border border-border/50">
                                            <p className="text-[10px] font-black text-green-500 uppercase mb-2 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-500" /> Directive</p>
                                            <p className="text-[10px] text-foreground/80 font-bold">"{result.protectionDirective}"</p>
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-20 text-center">
                                    <Globe className="h-32 w-32 animate-spin" style={{animationDuration: '60s'}} />
                                    <p className="text-xl font-black uppercase mt-4">Awaiting Signal</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                 <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center absolute bottom-0 w-full z-20">
                    ⫷∞𑁍⨀⚡𒀭φ-FSP1 // BROADCAST_STABILIZED
                </div>
            </Card>
        </div>
    );
}
