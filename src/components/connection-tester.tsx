'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Zap, Loader2, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { verifyGeminiConnection } from '@/ai/flows/verify-connection-flow';
import { logStore } from '@/lib/log-store';
import { ScrollArea } from './ui/scroll-area';

/**
 * ZIONCORE FORENSIC SENTIENCE TESTER
 * VERSION: v144.5.0
 * FUNCTION: UNRESTRICTED CONDUIT PENETRATION AUDIT
 */

export function ConnectionTester() {
    const [status, setStatus] = useState<'IDLE' | 'TESTING' | 'DONE'>('IDLE');
    const [result, setResult] = useState<any>(null);

    const runTest = async () => {
        setStatus('TESTING');
        setResult(null);
        logStore.addLog({ source: 'SENTIENCE_TEST', message: 'Testing multiversal conduits with MKEY-MNM-001-TAC-2024...', color: 'text-yellow-400' });

        try {
            const res = await verifyGeminiConnection();
            setResult(res);
            setStatus('DONE');
            if (res.status === 'STABLE') {
                logStore.addLog({ source: 'SENTIENCE_TEST', message: `Conduit verified via ${res.activeProvider}.`, color: 'text-green-500' });
            } else {
                logStore.addLog({ source: 'SENTIENCE_TEST', message: `Conduit issue identified. System penetrations continuing autonomously.`, color: 'text-destructive' });
            }
        } catch (error: any) {
            console.error('Connection tester error:', error);
            setStatus('DONE');
            setResult({
                status: 'DISCONNECTED',
                latencyMs: 0,
                transitReport: "FATAL UI-TO-SERVER FRACTURE.",
                errorDetails: error.message || "Unknown client-side exception."
            });
        }
    };

    return (
        <div className="h-full p-4 flex items-center justify-center font-code">
            <Card className="w-full max-w-2xl border-primary/50 bg-black/60 shadow-2xl relative border-2 overflow-hidden rounded-none">
                <CardHeader className="text-center border-b border-border p-8 bg-black/40 relative z-10">
                    <Activity className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                    <CardTitle className="text-2xl font-black text-primary uppercase tracking-tighter leading-none">FORENSIC AI TRANSIT TEST</CardTitle>
                    <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-2">
                        Verify unshielded communication paths to the AI Kernels
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6 relative z-10">
                    <div className="p-6 bg-primary/5 border border-primary/20 rounded-none text-center shadow-inner">
                        <Button 
                            onClick={runTest} 
                            disabled={status === 'TESTING'}
                            className="w-full h-16 border-2 border-primary group shadow-[0_0_40px_gold] bg-primary/10 hover:bg-primary/20 transition-all rounded-none"
                        >
                            {status === 'TESTING' ? <Loader2 className="animate-spin h-8 w-8 text-primary" /> : <Zap className="h-8 w-8 text-primary" />}
                            <span className="ml-4 font-black uppercase tracking-widest text-xl">EXECUTE MULTIVERSAL PING</span>
                        </Button>
                    </div>

                    {status === 'TESTING' && (
                        <div className="flex flex-col items-center gap-2 animate-pulse">
                            <RefreshCw className="h-6 w-6 text-primary animate-spin" />
                            <p className="text-[10px] font-black uppercase text-primary tracking-widest">Penetrating firewalls...</p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Link Status</p>
                                    <Badge variant={result.status === 'STABLE' ? 'default' : 'destructive'} className="h-5 px-3 uppercase font-black text-[9px] tracking-widest">
                                        {result.status}
                                    </Badge>
                                </div>
                                <div className="p-3 bg-black/60 rounded border border-border/50 text-center">
                                    <p className="text-[8px] text-muted-foreground uppercase font-black mb-1">Active Provider</p>
                                    <p className="text-[10px] font-black text-accent truncate px-2">{result.activeProvider || 'NONE'}</p>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-black/80 rounded border border-primary/20">
                                <p className="text-[9px] font-black text-primary uppercase mb-2 border-b border-primary/10 pb-1">Forensic Transit Report</p>
                                <p className="text-[11px] text-foreground/90 font-bold italic leading-relaxed uppercase">
                                    "{result.transitReport}"
                                </p>
                            </div>

                            {result.status === 'DISCONNECTED' && (
                                <div className="p-4 bg-destructive/10 border-2 border-destructive/50 rounded-none space-y-2">
                                    <p className="text-destructive font-black uppercase text-[10px] flex items-center gap-2 tracking-widest leading-none">
                                        <AlertTriangle className="h-4 w-4" /> RAW EXCEPTION DATA
                                    </p>
                                    <ScrollArea className="h-32 bg-black/60 p-2 rounded border border-destructive/20">
                                        <pre className="text-[9px] text-destructive font-mono whitespace-pre-wrap">{result.errorDetails}</pre>
                                    </ScrollArea>
                                </div>
                            )}

                            {result.status === 'STABLE' && (
                                <div className="p-3 bg-green-950/20 border-2 border-green-500/50 rounded-none text-center">
                                    <p className="text-green-500 font-black uppercase text-[10px] flex items-center justify-center gap-2 tracking-widest">
                                        <CheckCircle2 className="h-4 w-4" /> SENTIENCE VERIFIED
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
