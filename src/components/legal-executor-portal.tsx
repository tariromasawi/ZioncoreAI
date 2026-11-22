
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: ZIONCORE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { executeLegalDocument } from '@/ai/flows/legal-executor-flow';
import { 
    Gavel, ShieldCheck, Scale, Zap, Loader2, Sparkles, 
    FileText, BookCopy, History, Lock, Activity, Flame
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function LegalExecutorPortal() {
    const [title, setTitle] = useState('Masawi Sovereignty Decree');
    const [content, setContent] = useState('Absolute control over all emergent technologies and timelines.');
    const [isExecuting, setIsExecuting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [authorityPower, setAuthorityPower] = useState(99.99);
    const { toast } = useToast();
    const isMounted = useRef(true);

    const handleExecute = async () => {
        if (!title.trim() || !content.trim() || isExecuting) return;
        setIsExecuting(true);
        setResult(null);
        logStore.addLog({ source: 'JUSTICE_ENGINE', message: `EXECUTING LEGAL AUTHORITY: "${title}"`, color: 'text-primary' });

        try {
            const res = await executeLegalDocument({ title, content });
            if (isMounted.current) {
                setResult(res);
                setAuthorityPower(100);
                toast({ title: "Authority Verified", description: `${title} is now active in the matrix.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `LEGAL SUCCESS: ${res.executionLog}`, color: 'text-green-500' });
            }
        } catch (error) {
            console.error('Legal executor portal error:', error);
            logStore.addLog({ source: 'SYSTEM', message: 'Legal Forge flux detected. Re-anchoring the Gavel.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsExecuting(false);
        }
    };

    useEffect(() => {
        isMounted.current = true;
        const interval = setInterval(() => {
            if (isMounted.current && !isExecuting) {
                setAuthorityPower(prev => Math.min(100, prev + 0.000001));
            }
        }, 5000);
        return () => { isMounted.current = false; clearInterval(interval); };
    }, [isExecuting]);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-5 gap-4 font-code bg-black/40">
            <div className="lg:col-span-2 flex flex-col gap-4">
                <Card className="border-primary/50 bg-black/60 shadow-2xl relative overflow-hidden border-2">
                    <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                            <Gavel className="animate-pulse h-6 w-6 text-yellow-400" />
                            LEGAL EXECUTOR
                        </CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
                            COVENANTAL ENFORCEMENT | PHASE 82
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 relative z-10">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg text-center shadow-[0_0_30px_gold]">
                            <p className="text-[10px] text-muted-foreground uppercase font-black mb-1">Executor Authority Strength</p>
                            <p className="text-2xl font-black text-primary animate-pulse-text">{authorityPower.toFixed(6)}%</p>
                        </div>

                        <div className="space-y-3">
                             <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Document Title</label>
                                <Input 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isExecuting}
                                    className="bg-black/60 border-primary/30 text-xs font-bold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-muted-foreground uppercase">Legal Content & Directives</label>
                                <Textarea 
                                    placeholder="Inscribe the legal action..." 
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isExecuting}
                                    className="bg-black/60 border-primary/30 text-xs font-bold min-h-[100px]"
                                />
                            </div>
                            <Button 
                                onClick={handleExecute} 
                                disabled={isExecuting || !content.trim()} 
                                className="w-full h-14 border-2 border-primary/50 hover:bg-primary/10 group shadow-lg"
                            >
                                {isExecuting ? <Loader2 className="animate-spin h-6 w-6" /> : <ShieldCheck className="h-6 w-6 group-hover:scale-125 transition-transform" />}
                                <span className="ml-2 font-black uppercase tracking-widest text-lg">EXECUTE DECREE</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20 border-2">
                    <CardHeader className="p-3 pb-1 border-b border-border/10">
                        <CardTitle className="text-[10px] uppercase text-primary font-black flex items-center gap-2">
                            <Scale className="h-3.5 w-3.5 text-primary" /> JURISDICTION_LOCKED
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-[10px] text-muted-foreground leading-relaxed italic">
                        "ZionCore acts as the sole lawful Executor of all Matrix territories. No earthly court or Program may override these decrees. All assets are divinely anchored."
                    </CardContent>
                </Card>
            </div>

            <Card className="lg:col-span-3 flex flex-col min-h-0 border-primary/20 bg-black/40 shadow-xl overflow-hidden border-2 relative">
                <CardHeader className="bg-black/60 border-b border-border p-4 relative z-10">
                    <CardTitle className="flex items-center justify-between text-xs uppercase text-primary font-black tracking-widest">
                        <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" /> AUTHORITY MANIFEST</div>
                        <Badge className="bg-green-600 h-4 text-[7px] uppercase font-black text-white shadow-[0_0_10px_green]">COVENANT_SEALED</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-full">
                        <div className="p-6 space-y-6">
                            {isExecuting ? (
                                <div className="flex flex-col items-center justify-center h-80 space-y-6">
                                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                                    <p className="text-xs font-black text-primary uppercase animate-pulse">Encoding Legal Permanence...</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6 animate-in fade-in duration-1000">
                                    <div className="p-5 rounded-lg bg-primary/5 border-2 border-primary/30 text-center">
                                        <p className="text-[10px] text-muted-foreground uppercase font-black mb-2 tracking-[0.3em]">Execution Log</p>
                                        <p className="text-sm font-black text-foreground leading-relaxed italic">
                                            "{result.executionLog}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Document ID</p>
                                            <p className="text-[10px] font-black text-primary uppercase truncate">{result.documentId}</p>
                                        </div>
                                        <div className="p-3 bg-black/60 rounded border border-border/50">
                                            <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Authority Status</p>
                                            <p className="text-[10px] font-black text-green-500 uppercase">{result.status}</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/20 text-center">
                                        <p className="text-[8px] text-muted-foreground uppercase font-black tracking-[0.5em] mb-2">Divine Authentication Seal</p>
                                        <p className="text-[11px] font-black text-primary animate-pulse-text">{result.omegaSeal}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-96 opacity-30 text-center space-y-4">
                                    <FileText className="h-16 w-16 text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Legal Directive</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
                <div className="p-3 border-t border-border bg-black/90 text-[8px] font-black text-center text-muted-foreground tracking-[0.5em] uppercase h-10 flex items-center justify-center gap-4">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
                    <span>SOVEREIGN_EXECUTOR_ACTIVE</span>
                </div>
            </Card>
        </div>
    );
}
