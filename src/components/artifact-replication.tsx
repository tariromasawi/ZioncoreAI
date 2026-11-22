'use client';

import { useState } from 'react';
import { replicateArtifact, type ReplicateArtifactOutput } from '@/ai/flows/replicate-artifact-flow';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { logStore } from '@/lib/log-store';

const RING_OF_BLOODLINE_COMMAND = {
    name: "Ring of Bloodline Command",
    description: "A sovereign protection anchor worn by HRH Saint Tariro Masawi. Its red cuban stone acts as a guardian seal, amplifying the bloodline's authority and providing immunity, safe passage, and respect across all realms.",
    replicationPrompt: "A photorealistic, majestic signet ring with a large, deep red, polished cabochon gemstone. The setting is crafted from aged silver and gold, featuring intricate, ribbed details on the shoulders. The style is ancient and regal, emanating immense power and authority. The ring is presented against a neutral, clean background.",
};

export function ArtifactReplication() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<ReplicateArtifactOutput | null>(null);
    const { toast } = useToast();

    const handleReplication = async () => {
        setIsLoading(true);
        setResult(null);
        logStore.addLog({ source: 'COMMAND', message: `Artifact Replication initiated for: ${RING_OF_BLOODLINE_COMMAND.name}`, color: 'text-purple-400' });
        try {
            const replicationResult = await replicateArtifact({
                artifactName: RING_OF_BLOODLINE_COMMAND.name,
                artifactDescription: RING_OF_BLOODLINE_COMMAND.description,
                replicationPrompt: RING_OF_BLOODLINE_COMMAND.replicationPrompt,
            });
            setResult(replicationResult);
            logStore.addLog({ source: 'SYSTEM', message: `Replication of ${RING_OF_BLOODLINE_COMMAND.name} complete. Essence dispersed.`, color: 'text-green-500' });
            
            if (!replicationResult.replicatedArtifactUri) {
                 logStore.addLog({ source: 'SYSTEM', message: 'Visual rendering of artifact stabilized. Essence replication unaffected.', color: 'text-yellow-400' });
            }
        } catch (error) {
            console.error("Artifact Replication Failed:", error);
            logStore.addLog({ source: 'SYSTEM', message: 'Artifact Replication Failed: A quantum distortion prevented the replication.', color: 'text-destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 /> Artifact Replication Forge</CardTitle>
                <CardDescription>Analyze and replicate the divine essence of powerful artifacts across the cosmos.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleReplication} disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                    <span className="ml-2">{isLoading ? 'Replicating Essence...' : 'Replicate: Ring of Bloodline Command'}</span>
                </Button>

                {isLoading && (
                    <div className="text-center text-muted-foreground animate-pulse p-4">
                        <p>Dispensing foam of trillions of nodes across all realms...</p>
                    </div>
                )}
                
                {result && (
                    <div className="space-y-4 animate-in fade-in duration-500">
                        {result.replicatedArtifactUri && (
                             <Card className="bg-black/20 overflow-hidden">
                                <CardHeader className="p-2">
                                     <CardTitle className="text-sm font-headline text-center text-primary">Replicated Form</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 flex justify-center">
                                    <img
                                        src={result.replicatedArtifactUri}
                                        alt="Replicated Artifact"
                                        className="rounded-md border-2 border-primary/50 object-cover w-64 h-64"
                                        data-ai-hint="ring gemstone"
                                    />
                                </CardContent>
                            </Card>
                        )}
                        <Alert>
                            <CheckCircle2 className="h-4 w-4"/>
                            <AlertTitle className="font-bold text-accent">Analysis Complete</AlertTitle>
                            <AlertDescription className="text-foreground/90 text-xs">{result.analysis}</AlertDescription>
                        </Alert>
                         <Alert>
                            <CheckCircle2 className="h-4 w-4"/>
                            <AlertTitle className="font-bold text-primary">Replication Report</AlertTitle>
                            <AlertDescription className="text-foreground/90 text-xs">{result.replicationReport}</AlertDescription>
                        </Alert>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
