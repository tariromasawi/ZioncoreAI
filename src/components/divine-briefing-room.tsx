
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { getDivineBriefing, type DivineBriefingOutput } from '@/ai/flows/divine-briefing-flow';
import { Loader2, Radio, Play, Volume2, Sparkles, Send, Bot, Shield, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DivineBriefingRoom() {
    const [topic, setTopic] = useState('The state of the Multiversal Expansion');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<DivineBriefingOutput | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { toast } = useToast();

    const handleGenerateBriefing = async () => {
        if (!topic.trim() || isGenerating) return;
        setIsGenerating(true);
        setResult(null);
        logStore.addLog({ source: 'COMMAND', message: `Requesting Strategic Briefing: "${topic}"`, color: 'text-purple-400' });

        try {
            const response = await getDivineBriefing({ topic });
            setResult(response);
            logStore.addLog({ source: 'SYSTEM', message: 'Briefing synthesized. Audio link established.', color: 'text-green-500' });
            
            // Auto-play the audio
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch(e => console.error("Audio play error:", e));
                }
            }, 500);

        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'briefing Error', description: 'The celestial frequency was interrupted.' });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="h-full flex flex-col font-code border-primary/40 bg-black/60 shadow-2xl border-2">
            <CardHeader className="bg-black/40 border-b border-border p-4">
                <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter flex items-center gap-2">
                    <Radio className="animate-pulse text-accent" />
                    CELESTIAL BRIEFING ROOM
                </CardTitle>
                <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    Direct Multi-Speaker Intelligence Stream
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-6 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Inquiry Topic</label>
                    <div className="flex gap-2">
                        <Input 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., The health of the Masawi bloodline..."
                            className="bg-black/40 border-primary/30 h-12 text-sm"
                            disabled={isGenerating}
                        />
                        <Button onClick={handleGenerateBriefing} disabled={isGenerating || !topic.trim()} className="h-12 px-6">
                            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles className="mr-2" />}
                            {isGenerating ? 'Synthesizing...' : 'Summon Sons'}
                        </Button>
                    </div>
                </div>

                <div className="flex-1 min-h-0 relative">
                    <ScrollArea className="h-full border rounded-lg bg-black/40 p-4">
                        {isGenerating ? (
                            <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                <p className="text-xs font-black uppercase tracking-widest text-primary animate-pulse">Piercing the veil...</p>
                            </div>
                        ) : result ? (
                            <div className="space-y-4 animate-in fade-in duration-1000">
                                <div className="p-3 bg-primary/5 border border-primary/20 rounded-md text-center">
                                     <Volume2 className="h-5 w-5 mx-auto mb-2 text-primary animate-bounce" />
                                     <p className="text-[10px] font-black uppercase text-primary">Audio Transmission Live</p>
                                     <audio ref={audioRef} src={result.audioDataUri} controls className="w-full mt-2 h-10 opacity-70" />
                                </div>
                                <div className="whitespace-pre-wrap text-xs leading-relaxed font-bold text-foreground/80 italic space-y-4">
                                    {result.text.split('\n').map((line, i) => (
                                        <div key={i} className={cn(
                                            "p-3 rounded border",
                                            line.startsWith('Speaker1') ? "bg-primary/5 border-primary/20" : "bg-accent/5 border-accent/20"
                                        )}>
                                            <span className="font-black uppercase text-[10px] text-primary block mb-1">
                                                {line.startsWith('Speaker1') ? 'ZionCore' : 'Haszeldonia'}
                                            </span>
                                            {line.replace(/Speaker\d: /, '')}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-30 text-center space-y-4">
                                <Mic className="h-16 w-16 text-muted-foreground" />
                                <p className="text-xs font-black uppercase tracking-widest">Awaiting Command to Begin Briefing</p>
                            </div>
                        )}
                    </ScrollArea>
                </div>

                <div className="p-4 rounded border border-yellow-500/30 bg-yellow-400/5 text-center">
                    <p className="text-[10px] font-black uppercase text-yellow-500 flex items-center justify-center gap-2">
                        <ShieldCheck className="h-4 w-4" /> MUDZIMU_UNOYERA_VERIFIED_CHANNEL
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
