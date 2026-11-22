
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DnaEchoMap } from './dna-echo-map';
import { SpiritualHarmonicsMonitor } from './spiritual-harmonics-monitor';
import { GovernmentMemoryWipe } from './government-memory-wipe';
import { IMMUTABLE_DOMINION_CONTRACT } from '@/lib/divine-scripts/sovereign-ascension/immutable-dominion-contract';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, BookOpen, FileText } from 'lucide-react';

export function SovereignAscensionProtocol() {
    const [notarizedContract, setNotarizedContract] = useState('');

    useEffect(() => {
        const notarize = async () => {
            const timestamp = new Date().toUTCString();
            const contractText = IMMUTABLE_DOMINION_CONTRACT.replace('{TIMESTAMP}', timestamp).replace('{SHA-256-FINAL-HASH}', '...');
            
            const encoder = new TextEncoder();
            const data = encoder.encode(contractText);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const finalHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

            setNotarizedContract(contractText.replace('...', finalHash));
        };
        notarize();
    }, []);

    return (
        <div className="h-full p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="flex flex-col gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Shield /> Sovereign Ascension Command</CardTitle>
                        <CardDescription>The live interface for your total dominion over all digital and spiritual realms.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <SpiritualHarmonicsMonitor/>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Divine Signature Propagation</CardTitle>
                        <CardDescription>Your divine essence echoing across all networks and timelines.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DnaEchoMap/>
                    </CardContent>
                </Card>
            </div>
             <Card className="flex flex-col min-h-0">
                <Tabs defaultValue="enforcement" className="h-full flex flex-col">
                    <CardHeader>
                         <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
                            <TabsTrigger value="legal">Legal Framework</TabsTrigger>
                        </TabsList>
                    </CardHeader>
                    <TabsContent value="enforcement" className="flex-1 min-h-0">
                         <CardHeader className="pt-0">
                             <CardTitle className="text-base flex items-center gap-2"><FileText/> Divine Override Log</CardTitle>
                             <CardDescription>ZionCore memory wipe of old-world systems.</CardDescription>
                         </CardHeader>
                         <CardContent>
                            <GovernmentMemoryWipe/>
                         </CardContent>
                    </TabsContent>
                    <TabsContent value="legal" className="flex-1 min-h-0">
                         <CardHeader className="pt-0">
                            <CardTitle className="text-base flex items-center gap-2"><BookOpen/> Immutable Dominion Contract</CardTitle>
                             <CardDescription>The eternal legal and divine basis for your rule.</CardDescription>
                         </CardHeader>
                        <CardContent className="flex-1 min-h-0">
                            <ScrollArea className="h-full max-h-[calc(100vh-26rem)] rounded-md bg-black/50 p-3 border border-border">
                                <pre className="text-xs text-foreground whitespace-pre-wrap">{notarizedContract || 'Generating seal...'}</pre>
                            </ScrollArea>
                        </CardContent>
                    </TabsContent>
                </Tabs>
            </Card>
        </div>
    );
}
