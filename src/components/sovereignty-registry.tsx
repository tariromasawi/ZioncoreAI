
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: REGISTRY_HUB.AWAKEN
 */

import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SovereignPatentOffice } from './sovereign-patent-office';
import { DivineScriptForge } from './divine-script-forge';
import { AlchemicalResonanceBridge } from './alchemical-resonance-bridge';
import { Scale, Braces, FlaskConical, History, ShieldCheck, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SovereigntyRegistry() {
    return (
        <div className="h-full p-4 flex flex-col gap-4 font-code bg-black/40">
            <Card className="border-primary/50 bg-black/60 shadow-2xl border-2 relative overflow-hidden rounded-none">
                <div className="absolute inset-0 bg-primary/5 animate-pulse" />
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-3 text-primary text-xl uppercase font-black tracking-tighter">
                                <History className="text-accent animate-spin" style={{animationDuration: '20s'}} />
                                SOVEREIGNTY REGISTRY
                            </CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1">
                                PERMANENT ARCHIVE OF DIVINE PROPERTY | PHASE 40
                            </CardDescription>
                        </div>
                        <Badge className="bg-green-600 text-white font-black text-[9px] uppercase tracking-widest px-3 h-6 shadow-[0_0_10px_green]">MKEY_VERIFIED</Badge>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="patents" className="flex-1 flex flex-col min-h-0">
                <TabsList className="grid w-full grid-cols-3 bg-black/60 border border-primary/20 h-12 rounded-none">
                    <TabsTrigger value="patents" className="text-xs uppercase font-black tracking-widest data-[state=active]:text-primary rounded-none">
                        <Scale className="mr-2 h-4 w-4" /> Patents
                    </TabsTrigger>
                    <TabsTrigger value="scripts" className="text-xs uppercase font-black tracking-widest data-[state=active]:text-primary rounded-none">
                        <Braces className="mr-2 h-4 w-4" /> Scripts
                    </TabsTrigger>
                    <TabsTrigger value="relics" className="text-xs uppercase font-black tracking-widest data-[state=active]:text-primary rounded-none">
                        <FlaskConical className="mr-2 h-4 w-4" /> Relics
                    </TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0 mt-4 overflow-hidden">
                    <ScrollArea className="h-full">
                        <TabsContent value="patents" className="m-0 outline-none h-full">
                            <SovereignPatentOffice />
                        </TabsContent>
                        <TabsContent value="scripts" className="m-0 outline-none h-full">
                            <DivineScriptForge />
                        </TabsContent>
                        <TabsContent value="relics" className="m-0 outline-none h-full">
                            <AlchemicalResonanceBridge />
                        </TabsContent>
                    </ScrollArea>
                </div>
            </Tabs>

            <div className="p-3 bg-black/90 border-t border-primary/30 flex items-center justify-between text-[8px] font-black uppercase tracking-widest px-6 shadow-2xl h-10 border-2">
                 <div className="flex items-center gap-4 text-primary">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-3 w-3 text-green-500" />
                        <span>REGISTRY_LOCKED: ETERNAL</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <Flame className="h-3 w-3 text-red-500 animate-pulse" />
                    <span>MWARI NDI MWARI</span>
                 </div>
            </div>
        </div>
    );
}
