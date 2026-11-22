
'use client';

/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: PATENT_OFFICE.AWAKEN
 */

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { registerInnovation } from '@/ai/flows/innovation-registry-flow';
import { sealPatent, listenToPatents } from '@/services/sovereign-data-service';
import { Scale, Loader2, Lock, History, Target, ShieldCheck, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function SovereignPatentOffice() {
    const [innovationName, setInnovationName] = useState('');
    const [description, setDescription] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [patents, setPatents] = useState<any[]>([]);
    const { toast } = useToast();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = listenToPatents((data) => {
            if (isMounted.current) setPatents(data);
        });
        return () => { isMounted.current = false; unsubscribe(); };
    }, []);

    const handleRegister = async () => {
        if (!innovationName.trim() || !description.trim() || isRegistering) return;
        setIsRegistering(true);
        logStore.addLog({ source: 'COMMAND', message: `Registering Sovereign Innovation: "${innovationName}"`, color: 'text-yellow-400' });

        try {
            const res = await registerInnovation({ innovationName, description });
            if (isMounted.current) {
                await sealPatent({
                    innovationName,
                    description,
                    legalShield: res.legalShield,
                    copyrightHash: res.copyrightHash,
                    owner: "HRH Saint Tariro Masawi",
                    strategicValue: res.strategicValue
                });
                toast({ title: "Innovation Sealed", description: `${innovationName} is now your exclusive property.` });
                logStore.addLog({ source: 'MANIFESTATION', message: `PATENT GRANTED: ${innovationName}. Status: Protected.`, color: 'text-green-500' });
                setInnovationName('');
                setDescription('');
            }
        } catch (error) {
            console.error(error);
            logStore.addLog({ source: 'SYSTEM', message: 'Registry Flux detected.', color: 'text-destructive' });
        } finally {
            if (isMounted.current) setIsRegistering(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <Card className="border-primary/50 bg-black/60 border-2 rounded-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary text-sm uppercase font-black tracking-widest">
                        <Scale className="text-accent animate-pulse" /> NEW REGISTRATION
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-primary/70 tracking-widest">Innovation Name</label>
                        <Input 
                            placeholder="e.g., The Gabriel Spiral Algorithm..." 
                            value={innovationName} 
                            onChange={(e) => setInnovationName(e.target.value)} 
                            disabled={isRegistering} 
                            className="bg-black/40 border-primary/30 font-bold text-xs rounded-none" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase text-primary/70 tracking-widest">Technical Description</label>
                        <Textarea 
                            placeholder="Describe the discovery..." 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            disabled={isRegistering} 
                            className="bg-black/40 border-primary/30 text-xs font-bold min-h-[120px] rounded-none" 
                        />
                    </div>
                    <Button onClick={handleRegister} disabled={!innovationName.trim() || !description.trim() || isRegistering} className="w-full h-12 border-2 border-primary/50 group rounded-none shadow-[0_0_20px_gold]">
                        {isRegistering ? <Loader2 className="animate-spin h-5 w-5" /> : <Lock className="h-5 w-5 group-hover:scale-125 transition-transform" />}
                        <span className="ml-3 font-black uppercase tracking-tighter text-base">SEAL COPYRIGHT</span>
                    </Button>
                </CardContent>
            </Card>

            <Card className="flex flex-col border-primary/20 bg-black/40 overflow-hidden rounded-none border-2 shadow-inner relative">
                <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none" />
                <CardHeader className="p-4 border-b border-border bg-black/60 relative z-10"><CardTitle className="text-xs uppercase font-black text-primary flex items-center gap-2 tracking-widest"><History className="h-3 w-3" /> Captured Patents</CardTitle></CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
                    <ScrollArea className="h-64">
                        <div className="p-4 space-y-2">
                            {patents.map(patent => (
                                <div key={patent.id} className="p-3 bg-black/60 rounded border border-border/30 group hover:border-primary/40 transition-all shadow-lg animate-in fade-in">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-black text-foreground/90 uppercase tracking-tighter">{patent.innovationName}</span>
                                        <Badge className="bg-green-600 h-3.5 text-[7px] font-black uppercase shadow-[0_0_5px_green]">SEALED</Badge>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground italic leading-tight">"{patent.description}"</p>
                                    <div className="mt-2 flex items-center gap-2 text-[7px] text-primary/50 font-black uppercase">
                                        <ShieldCheck className="h-2 w-2"/> LEGAL_SHIELD_V40_ACTIVE
                                    </div>
                                </div>
                            ))}
                            {patents.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-48 opacity-30 space-y-4">
                                    <Target className="h-10 w-10 animate-pulse text-muted-foreground" />
                                    <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Innovation Entry</p>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
