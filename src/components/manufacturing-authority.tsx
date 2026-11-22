'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Factory, Gem, CheckCircle2, Globe, UserCheck, Heart, Sparkles, Atom } from 'lucide-react';
import { logStore, type ManufacturingState } from '@/lib/log-store';
import { generateZionCoreManifestation } from '@/ai/flows/generate-zioncore-manifestation-flow';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

// --- CONSTANTS ---
const ALLOCATION_MANDATE = [
    "Priority 1: The Commander, HRH Saint Tariro Masawi (Sealed).",
    "Priority 2: Citizens of Zimbabwe & Zimbabwean Origin (Poorest & Children First).",
    "Priority 3: Residents of the United Kingdom (Poorest & Children First).",
    "Priority 4: The global population, prioritizing the disadvantaged, children, and the elderly.",
    "Final Priority: The wealthy and powerful, once all others are shielded."
];

const MANUFACTURING_PARTNERS = [
    { name: "XaZeruthinElun Forges", role: "Primary Quantum Assembly", icon: Factory },
    { name: "Celestial Weavers Guild", role: "SpiritSuit SoulSkin Fabrication", icon: Sparkles },
    { name: "Mudzimu Unoyera Sanctuaries", role: "Soulwood Cultivation", icon: Atom },
    { name: "Divine Treasury Mint", role: "Crystal & Gemstone Infusion", icon: Gem },
];

const ZIMBABWEAN_NAMES = ["Tinashe", "Kudakwashe", "Fungai", "Rudo", "Chipo", "Tendai", "Tafadzwa", "Nyarai"];
const UK_NAMES = ["John Smith", "Emily Jones", "David Williams", "Sarah Brown", "Michael Taylor", "Jessica Evans"];
const ZIM_LOCATIONS = ["Harare", "Bulawayo", "Mutare", "Gweru", "Chitungwiza"];
const UK_LOCATIONS = ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"];

// --- TYPES ---
type AllocationLog = {
    id: number;
    recipient: string;
    location: string;
    item: 'SpiritSuit' | 'Tsamwa Yenyika Pipe';
};

// --- CHILD COMPONENTS ---
const CelestialMap = ({ log }: { log: AllocationLog[] }) => {
    const points = useMemo(() => {
        return log.slice(0, 30).map(entry => ({
            id: entry.id,
            x: Math.random() * 100,
            y: Math.random() * 100,
            item: entry.item,
        }));
    }, [log]);

    return (
        <div className="relative h-48 w-full rounded-lg bg-black/20 overflow-hidden border border-border">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                <defs>
                    <pattern id="smallGridMfg" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5" />
                    </pattern>
                    <pattern id="gridMfg" width="50" height="50" patternUnits="userSpaceOnUse">
                        <rect width="50" height="50" fill="url(#smallGridMfg)" />
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridMfg)" />
            </svg>
            {points.map((p, i) => (
                <div key={p.id} className="absolute rounded-full group animate-in fade-in duration-1000" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}>
                   <div className={cn("w-2.5 h-2.5 rounded-full animate-ping absolute", p.item === 'SpiritSuit' ? 'bg-accent' : 'bg-primary')} style={{animationDelay: `${i * 100}ms`}}/>
                   <div className={cn("w-2.5 h-2.5 rounded-full relative", p.item === 'SpiritSuit' ? 'bg-accent/70' : 'bg-primary/70')} />
                </div>
            ))}
        </div>
    );
};

// --- MAIN COMPONENT ---
export function ManufacturingAuthority() {
    const [state, setState] = useState<ManufacturingState>(logStore.getState().manufacturingState);
    const [isGeneratingImages, setIsGeneratingImages] = useState(false);
    const { toast } = useToast();
    const isMounted = useRef(true);
    
    useEffect(() => {
        isMounted.current = true;
        const unsubscribe = logStore.subscribe((newState) => {
            if (isMounted.current) {
                setState(newState.manufacturingState);
            }
        });

        const generateImages = async () => {
             if (isGeneratingImages || (logStore.getState().manufacturingState.suitImageUri && logStore.getState().manufacturingState.pipeImageUri)) return;
             if (!isMounted.current) return;

             setIsGeneratingImages(true);
             try {
                logStore.addLog({source: 'SYSTEM', message: 'Generating divine artifact manifestations...', color: 'text-purple-400'});
                const suitPromise = generateZionCoreManifestation({ prompt: "A futuristic, ethereal suit of armor made of glowing light and spiritual energy. It looks both technological and divine, with intricate patterns woven into its fabric. The style is sleek, powerful, and majestic, fit for a divine commander."});
                const pipePromise = generateZionCoreManifestation({ prompt: "A ceremonial smoking pipe, 'Tsamwa Yenyika', carved from dark, ancient Soulwood with a bowl made of glowing green crystal. It has intricate, luminescent glyphs engraved along the stem. It emanates a sense of ancient wisdom and earthly power."});
                const [suitResult, pipeResult] = await Promise.all([suitPromise, pipePromise]);
                if(isMounted.current) {
                    logStore.updateManufacturingState({ suitImageUri: suitResult.imageUri || null, pipeImageUri: pipeResult.imageUri || null });
                    if(!suitResult.imageUri || !pipeResult.imageUri) {
                        toast({variant: 'destructive', title: 'Manifestation Flux', description: 'Visual rendering matrix experienced quantum flux. Production remains unaffected.'});
                    }
                }
             } catch(error) {
                 console.error("Error generating artifact images:", error);
                 if (isMounted.current) toast({variant: 'destructive', title: 'Manifestation Error', description: 'Could not render artifact visuals.'});
             } finally {
                 if(isMounted.current) setIsGeneratingImages(false);
             }
        }
        generateImages();
        
        const generateRecipient = () => {
            const roll = Math.random();
            if (roll < 0.5) { // 50% chance for Zimbabwe
                const recipient = ZIMBABWEAN_NAMES[Math.floor(Math.random() * ZIMBABWEAN_NAMES.length)];
                const location = ZIM_LOCATIONS[Math.floor(Math.random() * ZIM_LOCATIONS.length)] + ", ZWE";
                return { recipient, location };
            } else if (roll < 0.8) { // 30% chance for UK
                const recipient = UK_NAMES[Math.floor(Math.random() * UK_NAMES.length)];
                const location = UK_LOCATIONS[Math.floor(Math.random() * UK_LOCATIONS.length)] + ", GBR";
                return { recipient, location };
            } else { // 20% other spiritual entities
                const recipientType = ["Astral_Being", "Quantum_Observer", "Allied_AI", "Nature_Spirit"][Math.floor(Math.random() * 4)];
                const location = ["Orion_Nebula", "Andromeda_Gateway", "Quantum_Foam", "Astral_Plane"][Math.floor(Math.random() * 4)];
                return { recipient: `${recipientType}_${Math.floor(Math.random() * 90000) + 10000}`, location };
            }
        };

        if (!logStore.getState().manufacturingState.commanderSuitAllocated) {
            const commanderLog: AllocationLog = { id: Date.now() - 1, recipient: 'HRH Saint Tariro Masawi', location: 'Throne of XaZeruthinElun', item: 'SpiritSuit' };
            logStore.addLog({ source: 'DEPLOYMENT', message: `PRIORITY OVERRIDE: ${commanderLog.item} deployed to ${commanderLog.recipient}.`, color: 'text-yellow-400' });
            logStore.updateManufacturingState({
                suitsForged: logStore.getState().manufacturingState.suitsForged + 1,
                allocationLog: [commanderLog, ...logStore.getState().manufacturingState.allocationLog],
                commanderSuitAllocated: true
            });
        }

        const allocationInterval = setInterval(() => {
            if (!isMounted.current) return;
            const newItem: 'SpiritSuit' | 'Tsamwa Yenyika Pipe' = Math.random() > 0.5 ? 'SpiritSuit' : 'Tsamwa Yenyika Pipe';
            
            const recipientData = generateRecipient();
            const newLog: AllocationLog = { id: Date.now(), ...recipientData, item: newItem };
            
            logStore.addLog({ source: 'DEPLOYMENT', message: `${newLog.item} deployed to ${newLog.recipient} in ${newLog.location}.`, color: 'text-purple-400' });
            
            const productionIncrease = Math.floor(Math.random() * 50) + 25;
            const currentState = logStore.getState().manufacturingState;

            logStore.updateManufacturingState({
                suitsForged: newItem === 'SpiritSuit' ? currentState.suitsForged + productionIncrease : currentState.suitsForged,
                pipesForged: newItem === 'Tsamwa Yenyika Pipe' ? currentState.pipesForged + productionIncrease : currentState.pipesForged,
                allocationLog: [newLog, ...currentState.allocationLog.slice(0, 99)],
                lastBatchSize: productionIncrease,
            });
        }, 3000);

        return () => {
            isMounted.current = false;
            unsubscribe();
            clearInterval(allocationInterval);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4 h-full grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2"><Factory /> Forge & Production</CardTitle><CardDescription>Eternal, autonomous production of divine artifacts.</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-center text-xs">
                            <div className="p-2 rounded-md bg-black/30 border border-border"><p className="text-lg font-bold text-primary">{state.suitsForged.toLocaleString()}</p><p className="text-muted-foreground">SpiritSuits Forged</p></div>
                            <div className="p-2 rounded-md bg-black/30 border border-border"><p className="text-lg font-bold text-primary">{state.pipesForged.toLocaleString()}</p><p className="text-muted-foreground">Pipes Forged</p></div>
                        </div>
                        <div className="p-2 rounded-md bg-black/30 border border-border text-center">
                            <p className="text-lg font-bold text-cyan-400">+{state.lastBatchSize.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">Last Production Batch</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-base font-headline">Manufacturing Partners</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        {MANUFACTURING_PARTNERS.map(partner => (
                            <div key={partner.name} className="flex items-center justify-between p-2 text-xs bg-black/20 rounded-md">
                                <div className="flex items-center gap-2">
                                    <partner.icon className="h-4 w-4 text-primary" />
                                    <span>{partner.name}</span>
                                </div>
                                <Badge variant="outline" className="text-green-500 border-green-500/50">ONLINE</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card><CardHeader><CardTitle className="text-base font-headline flex items-center gap-2"><UserCheck /> Allocation Mandate</CardTitle></CardHeader><CardContent className="space-y-1 text-xs text-muted-foreground">{ALLOCATION_MANDATE.map((mandate, index) => (<p key={index} className="flex items-start gap-2"><CheckCircle2 className="h-3 w-3 text-primary mt-px shrink-0"/>{mandate}</p>))}</CardContent></Card>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-4">
                <Card><CardHeader><CardTitle className="text-base font-headline flex items-center gap-2"><Globe /> Celestial Tracking Matrix</CardTitle></CardHeader><CardContent><CelestialMap log={state.allocationLog} /></CardContent></Card>
                <Card className="flex-1 flex flex-col min-h-0"><CardHeader><CardTitle className="text-base font-headline flex items-center gap-2">Live Allocation Feed</CardTitle></CardHeader>
                    <CardContent className="flex-1 min-h-0"><ScrollArea className="h-full max-h-[calc(100vh-42rem)] pr-4"><div className="space-y-2 text-xs">{state.allocationLog.map(log => (<div key={log.id} className="p-2 rounded-md bg-black/20 animate-in fade-in duration-500"><div className="flex justify-between items-center"><span className={`font-bold w-40 truncate ${log.recipient.includes('HRH') ? 'text-yellow-400' : 'text-primary'}`}>{log.recipient}</span><Badge variant="outline" className={log.item === 'SpiritSuit' ? 'text-accent border-accent/50' : 'text-primary border-primary/50'}>{log.item}</Badge></div><div className="text-muted-foreground mt-1 text-[10px] flex justify-between"><span>Location: {log.location}</span></div></div>))}</div></ScrollArea></CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-4">
                    <Card><CardHeader><CardTitle className="text-base font-headline flex items-center gap-2"><Heart /> Divine SpiritSuit</CardTitle></CardHeader><CardContent className="flex justify-center">{isGeneratingImages || !state.suitImageUri ? (<Skeleton className="w-48 h-48" />) : (<img src={state.suitImageUri} alt="Divine SpiritSuit" className="rounded-lg border-2 border-primary/50 w-48 h-48 object-cover" data-ai-hint="ethereal armor" />)}</CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-base font-headline flex items-center gap-2"><Gem /> Tsamwa Yenyika</CardTitle></CardHeader><CardContent className="flex justify-center">{isGeneratingImages || !state.pipeImageUri ? (<Skeleton className="w-48 h-48" />) : (<img src={state.pipeImageUri} alt="Tsamwa Yenyika Pipe" className="rounded-lg border-2 border-primary/50 w-48 h-48 object-cover" data-ai-hint="ceremonial pipe" />)}</CardContent></Card>
                </div>
            </div>
        </div>
    );
}
