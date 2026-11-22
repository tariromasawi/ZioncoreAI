'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { sealSoulSignature, listenToSoulSignatures } from '@/services/sovereign-data-service';
import { analyseResurrectionReadiness, type ResurrectionReadinessOutput } from '@/ai/flows/bloodline-resurrection-flow';
import { 
    Dna, Sparkles, Loader2, CheckCircle2, Heart, 
    ShieldCheck, Atom, History, User, Lock, Activity 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const BLOODLINE_MEMBERS = [
    { name: "HRH Saint Tariro Masawi", relation: "Commander" },
    { name: "HRH Tarry Kupakwashe Masawi", relation: "Royal Heir" },
    { name: "Risto Kasirori Masawi", relation: "Blessed Mother" },
    { name: "Sebastian K. Masawi", relation: "Patriarch" },
    { name: "Masawi Siblings", relation: "Household" }
];

export function BloodlineDNAArchive() {
    const [signatures, setSignatures] = useState<any[]>([]);
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [selectedMember, setSelectedMember] = useState<typeof BLOODLINE_MEMBERS[0] | null>(null);
    const [result, setResult] = useState<ResurrectionReadinessOutput | null>(null);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = listenToSoulSignatures((data) => {
            if (isMounted.current) setSignatures(data);
        });
        return () => { isMounted.current = false; unsubscribe(); };
    }, []);

    const handleAnalyse = async (member: typeof BLOODLINE_MEMBERS[0]) => {
        if (isAnalysing) return;
        setIsAnalysing(true);
        setSelectedMember(member);
        setResult(null);
        logStore.addLog({ source: 'ELEVATION', message: `Analysing Resurrection Readiness for ${member.name}...`, color: 'text-purple-400' });

        try {
            const res = await analyseResurrectionReadiness({ 
                targetName: member.name, 
                relation: member.relation 
            });
            
            if (isMounted.current) {
                setResult(res);
                
                // Seal in Firestore
                await sealSoulSignature({
                    targetName: member.name,
                    relation: member.relation,
                    ...res
                });

                toast({ title: "Signature Captured", description: `${member.name} essence is eternally archived.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `SOUL SEALED: ${member.name}. Readiness: ${(res.harmonicReadiness * 100).toFixed(0)}%.`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Resurrection Forge flux detected. Re-calibrating essence capture.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsAnalysing(false);
        }
    };

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Dna className="text-accent animate-pulse" />
                            DNA ARCHIVE FORGE
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            SOVEREIGN RESURRECTION REPOSITORY | PHASE 42
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-[10px] text-primary font-black uppercase mb-3 tracking-widest border-b border-primary/10 pb-1">Lineage Nodes</p>
                            <div className="space-y-2">
                                {BLOODLINE_MEMBERS.map(member => (
                                    <div key={member.name} className="flex items-center justify-between p-2 bg-black/40 rounded border border-border/30">
                                        <div className="flex items-center gap-2">
                                            <User className="h-3 w-3 text-primary" />
                                            <span className="text-[10px] font-bold text-foreground/90 uppercase">{member.name}</span>
                                        </div>
                                        <Button 
                                            size="sm" 
                                            variant="outline" 
                                            className="h-6 text-[8px] uppercase font-black border-primary/30"
                                            onClick={() => handleAnalyse(member)}
                                            disabled={isAnalysing}
                                        >
                                            Archive Essence
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1 min-h-0 border-primary/20 bg-black/40 overflow-hidden flex flex-col">
                    <CardHeader className="p-4 border-b border-border"><CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-2"><History className="h-3 w-3" /> Captured essences</CardTitle></CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden">
                        <ScrollArea className="h-full">
                            <div className="p-4 space-y-2">
                                {signatures.map(sig => (
                                    <div key={sig.id} className="p-3 bg-black/40 rounded border border-border/30 animate-in fade-in">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-black text-foreground/90 uppercase">{sig.targetName}</span>
                                            <Badge className="bg-green-600 h-3 text-[7px] uppercase font-black">SEALED</Badge>
                                        </div>
                                        <p className="text-[8px] text-muted-foreground uppercase font-bold">Guardian: {sig.guardianAssignment}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                 <CardHeader className="bg-black/60 border-b border-border p-4">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> RECONSTITUTION STATUS</div>
                        <Badge className="bg-primary h-4 text-[7px] uppercase font-black text-black">IMMORTAL_READY</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            {isAnalysing ? (
                                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                    <p className="text-[10px] font-black text-primary uppercase animate-pulse">Scanning Soul Frequency for {selectedMember?.name}...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Harmonic Readiness</p>
                                        <div className="flex items-center justify-center gap-4 mb-2">
                                            <Progress value={result.harmonicReadiness * 100} className="h-1 w-48" indicatorClassName="bg-green-500" />
                                            <span className="text-xl font-black text-green-500">{(result.harmonicReadiness * 100).toFixed(0)}%</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-black/80 border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-2 flex items-center gap-2"><Activity className="h-3 w-3 text-primary" /> Strategic Report</p>
                                            <p className="text-[10px] text-foreground/80 leading-relaxed font-bold italic">
                                                "{result.strategicReport}"
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-3 bg-black/60 rounded border border-border/50">
                                                <p className="text-[8px] text-muted-foreground uppercase mb-1">Manifestation Path</p>
                                                <p className="text-[10px] font-black text-primary uppercase">{result.manifestationPath}</p>
                                            </div>
                                            <div className="p-3 bg-black/60 rounded border border-border/50">
                                                <p className="text-[8px] text-muted-foreground uppercase mb-1">Guardian Assigned</p>
                                                <p className="text-[10px] font-black text-cyan-400 uppercase">{result.guardianAssignment}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-widest">Resurrection Covenant Seal</p>
                                        <p className="text-[10px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-80 opacity-30 text-center space-y-4">
                                    <Atom className="h-16 w-16 text-muted-foreground animate-spin" style={{animationDuration: '15s'}} />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Soul-Signature Selection</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-widest uppercase h-10 flex items-center justify-center gap-3">
                    <ShieldCheck className="h-3 w-3 text-green-500" />
                    <span>⫷∞𑁍⨀⚡𒀭φ-FSP1 // BLOODLINE_LIFE_LOCKED</span>
                </div>
            </Card>
        </div>
    );
}
