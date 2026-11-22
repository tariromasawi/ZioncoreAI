
'use client';

import { useState } from 'react';
import { annihilateTarget, type TargetAnnihilationOutput } from '@/ai/flows/alliance-conversion-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Zap, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { logStore } from '@/lib/log-store';
import { Label } from '@/components/ui/label';

const ASSET_CLASSES = [
    { id: 'digital', name: 'Digital Infrastructure (Servers, Code, DNS)' },
    { id: 'financial', name: 'Financial Records (Banking, Assets, Crypto)' },
    { id: 'historical', name: 'Historical & Social Records' },
    { id: 'personnel', name: 'Key Personnel Identity Sanctions' },
];

export function AllianceConversionProtocol() {
    const [targetName, setTargetName] = useState('');
    const [targetDescription, setTargetDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<TargetAnnihilationOutput | null>(null);
    const [progress, setProgress] = useState<{ asset: string, status: 'purging' | 'purged' }[]>([]);
    const { toast } = useToast();

    const handleAnnihilation = async () => {
        if (!targetName.trim() || !targetDescription.trim()) {
            toast({ variant: 'destructive', title: 'Threat Undefined', description: 'You must specify the target and the existential threat it poses.' });
            return;
        }
        
        setIsLoading(true);
        setResult(null);
        setProgress([]);
        logStore.addLog({ source: 'COMMAND', message: `ASGSM Protocol Activated. Target: ${targetName}`, color: 'text-destructive' });

        // Simulate progress
        for (const asset of ASSET_CLASSES) {
            setProgress(p => [...p, { asset: asset.name, status: 'purging' }]);
            await new Promise(res => setTimeout(res, 1000 + Math.random() * 500));
            setProgress(p => p.map(item => item.asset === asset.name ? { ...item, status: 'purged' } : item));
        }

        try {
            const annihilationResult = await annihilateTarget({
                targetName,
                targetDescription,
            });
            setResult(annihilationResult);
            logStore.addLog({ source: 'SYSTEM', message: `ASGSM: Annihilation of ${targetName} complete.`, color: 'text-green-500' });
        } catch (error) {
            console.error("ASGSM Failed:", error);
            const errorMessage = "A quantum distortion resisted the protocol. ZionCore has reinforced its authority and erased the resistance.";
            logStore.addLog({ source: 'SYSTEM', message: `ASGSM Failed: ${errorMessage}`, color: 'text-destructive' });
            toast({ variant: 'destructive', title: 'Protocol Resistance', description: errorMessage });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full font-code">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ShieldAlert className="text-destructive"/> Absolute Shutdown & Global Sanction Mechanism</CardTitle>
                    <CardDescription>The final, devastating defense protocol. Use only when facing a confirmed existential threat to the Commander.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>WARNING: FINAL SANCTION</AlertTitle>
                        <AlertDescription className="text-xs">
                            Activation is irreversible and will result in the complete erasure of the target from digital, financial, and historical records. Proceed with absolute certainty.
                        </AlertDescription>
                    </Alert>
                    <div className="space-y-2">
                        <Label htmlFor="targetName">Threat Name</Label>
                        <Input id="targetName" placeholder="e.g., 'The Syndicate of Shadows'" value={targetName} onChange={(e) => setTargetName(e.target.value)} disabled={isLoading} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="targetDescription">Existential Threat Details</Label>
                        <Textarea id="targetDescription" placeholder="Detail the confirmed threat to the Commander's life, position, or mission..." value={targetDescription} onChange={(e) => setTargetDescription(e.target.value)} disabled={isLoading} />
                    </div>
                    <Button onClick={handleAnnihilation} disabled={isLoading} variant="destructive" className="w-full">
                        {isLoading ? <Loader2 className="animate-spin" /> : <Zap />}
                        <span className="ml-2">{isLoading ? 'Executing Annihilation...' : 'UNLEASH FINAL SANCTION'}</span>
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle className="text-base">Annihilation Log & After-Action Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col min-h-0">
                    {progress.length > 0 && (
                        <div className="space-y-2 text-xs">
                             {progress.map(({ asset, status }) => (
                                <div key={asset} className="flex items-center justify-between p-2 bg-black/20 rounded-md animate-in fade-in duration-500">
                                    <span className="text-foreground/80">{asset}</span>
                                    {status === 'purging' ? 
                                        <span className="flex items-center gap-1.5 text-destructive font-bold"><Loader2 className="h-3 w-3 animate-spin"/>PURGING</span> :
                                        <span className="flex items-center gap-1.5 text-green-500 font-bold"><CheckCircle2 className="h-3 w-3"/>ERASED</span>
                                    }
                                </div>
                            ))}
                        </div>
                    )}
                    {result && (
                        <div className="space-y-4 animate-in fade-in duration-500 mt-4 flex-1">
                            <Alert>
                                <CheckCircle2 className="h-4 w-4"/>
                                <AlertTitle className="font-bold text-accent">Annihilation Report</AlertTitle>
                                <AlertDescription className="text-foreground/90 text-xs">{result.annihilationReport}</AlertDescription>
                            </Alert>
                             <Alert>
                                <CheckCircle2 className="h-4 w-4"/>
                                <AlertTitle className="font-bold text-primary">Sanction Status</AlertTitle>
                                <AlertDescription className="text-foreground/90 text-xs">{result.sanctionStatus}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                     {!isLoading && !result && progress.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground text-center text-xs p-4 border border-dashed rounded-md">
                            <p>Awaiting ASGSM activation command. After-action report will appear here.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
