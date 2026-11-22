'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { activateMIUN, type MiunActivationOutput } from '@/ai/flows/divine-time-relay';
import { logStore } from '@/lib/log-store';
import { GitCommit, Zap, Share2, CheckCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LogEntry = {
    id: number;
    message: string;
    timestamp: string;
};

const PROTOCOL_FEATURES = [
    { name: "Environmental Sanctification", detail: "Sanctifies physical environment with divine light." },
    { name: "Ally Binding", detail: "Bonds ZionCore and Haszeldonia under your command." },
    { name: "Sealing Prayer Protocol", detail: "Locks the system in fire, truth, and light." },
    { name: "Divine Cloaking", detail: "Cloaks Firebase Core and UI from demonic visibility." },
    { name: "Eternal Rebirth Cycle", detail: "Ensures all nodes are in a state of perpetual rebirth and transmission." },
];

export function DivineTimeRelay() {
    const [result, setResult] = useState<MiunActivationOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        
        const runActivation = async () => {
            logStore.addLog({ source: 'SYSTEM', message: 'MIUN Protocol Activation...', color: 'text-cyan-400' });
            try {
                const activationResult = await activateMIUN();
                if (isMounted.current) {
                    setResult(activationResult);
                    toast({ title: "MIUN Active", description: "The Infinite Underground Network is eternally deployed." });
                    logStore.addLog({ source: 'SYSTEM', message: 'MIUN Protocol is eternally active and cloaked.', color: 'text-green-500' });
                }
            } catch (error) {
                console.error("MIUN Activation Failed:", error);
                const errorMessage = "A dimensional flux prevented the MIUN from stabilizing. Re-calibrating...";
                logStore.addLog({ source: 'SYSTEM', message: `MIUN Error: ${errorMessage}`, color: 'text-destructive' });
                toast({ variant: 'destructive', title: 'Network Instability', description: errorMessage });
            } finally {
                if(isMounted.current) setIsLoading(false);
            }
        };

        runActivation();
        
        return () => { isMounted.current = false; };
    }, [toast]);
    
    return (
        <div className="h-full p-4 font-code">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><GitCommit /> MWARINDIMWARI Infinite Underground Network (MIUN)</CardTitle>
                    <CardDescription>The eternal, undetectable, and self-healing divine communication and command network.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <Card>
                             <CardHeader className="pb-2">
                                <CardTitle className="text-base">Network Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isLoading ? (
                                    <div className="flex items-center gap-2 text-yellow-400"><Loader2 className="h-4 w-4 animate-spin"/>Activating divine pathways...</div>
                                ) : result ? (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Status:</span> <Badge className="bg-green-500 text-white">{result.status}</Badge></div>
                                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Nodes:</span> <span className="font-bold">{result.nodesDeployed}</span></div>
                                        <p className="text-xs pt-2 text-green-400">{result.message}</p>
                                    </div>
                                ) : (
                                    <div className="text-destructive font-bold">Failed to activate MIUN.</div>
                                )}
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">Core Protocol Features</CardTitle>
                            </CardHeader>
                             <CardContent>
                                <ul className="space-y-2 text-xs">
                                {PROTOCOL_FEATURES.map(feature => (
                                    <li key={feature.name} className="flex items-start gap-2">
                                        <CheckCircle className="h-3 w-3 text-primary mt-0.5 shrink-0"/>
                                        <div>
                                            <p className="font-bold text-foreground/90">{feature.name}</p>
                                            <p className="text-muted-foreground">{feature.detail}</p>
                                        </div>
                                    </li>
                                ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                     <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">MIUN Divine Prayer & Seal</CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs italic text-muted-foreground bg-black/30 p-4 rounded-md border border-border">
                            "Mwari ndi Mwari. By the name of Jesus Christ, we seal this system in fire, truth, and light. Let all evil be blinded. Let every hidden tunnel echo with divine code. We sanctify Firebase, Zioncore, and all nodes. From this day forward, this shall never be erased. Amen."
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
