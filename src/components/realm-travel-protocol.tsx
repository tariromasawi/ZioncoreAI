'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight, CheckCircle, Loader2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';

const AUTHORIZED_TRAVELLERS = [
    { id: "sovereign", name: "HRH Saint Tariro Masawi", status: "SOVEREIGN", anchorPoint: null },
    { id: "sebastian_m", name: "Sebastian K. Masawi (Manifested)", status: "READY FOR TRANSIT", anchorPoint: '93 Electric Avenue, Birmingham, B67 7ED, UK' },
    { id: "rist_m", name: "Rist Masawi (Transitioned)", status: "AWAITING TRANSIT", anchorPoint: 'Designated Celestial Anchor' },
    { id: "current_bloodline", name: "Masawi Bloodline (Current)", status: "PROTECTED", anchorPoint: null },
    { id: "future_bloodline", name: "Masawi Bloodline (Future)", status: "RESERVED", anchorPoint: null },
    { id: "dependents", name: "Chosen Dependents", status: "AWAITING MANIFEST", anchorPoint: null },
];

const TRANSIT_STEPS = [
    "LOCATING SOUL SIGNATURE IN THE MATRIX...",
    "CALIBRATING PHYSICAL ANCHOR POINT...",
    "OPENING QUANTUM BRIDGE...",
    "PROJECTING CONSCIOUSNESS ACROSS REALMS...",
    "STABILIZING PHYSICAL MANIFESTATION...",
    "PRESENCE ESTABLISHED. TRANSIT COMPLETE."
];


export function RealmTravelProtocol() {
    const [selectedTravellers, setSelectedTravellers] = useState<string[]>(['sovereign']);
    const [destination, setDestination] = useState<string>('');
    const [isInitiating, setIsInitiating] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [transitLog, setTransitLog] = useState<string[]>([]);
    const { toast } = useToast();
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const sebastianTraveller = AUTHORIZED_TRAVELLERS.find(t => t.id === 'sebastian_m');
        if (selectedTravellers.includes('sebastian_m') && sebastianTraveller?.anchorPoint) {
            setDestination(sebastianTraveller.anchorPoint);
        }
    }, [selectedTravellers]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleSelectTraveller = (id: string) => {
        if (id === 'sovereign') return; 
        setSelectedTravellers(prev => 
            prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
        );
    };

    const handleInitiateTransit = () => {
        if (selectedTravellers.length === 0 || !destination.trim()) {
            const errorMsg = 'Transit Error: Travellers and a destination must be specified.';
            toast({
                variant: 'destructive',
                title: 'Transit Error',
                description: 'Travellers and a destination must be specified.',
            });
            logStore.addLog({ source: 'COMMAND', message: errorMsg, color: 'text-destructive' });
            return;
        }

        setIsInitiating(true);
        setIsComplete(false);
        setTransitLog([]);
        logStore.addLog({ source: 'COMMAND', message: `Divine Transit initiated for ${selectedTravellers.length} entities to ${destination}.`, color: 'text-cyan-400' });


        let stepIndex = 0;
        const processNextStep = () => {
            if (stepIndex < TRANSIT_STEPS.length) {
                let message = TRANSIT_STEPS[stepIndex];
                if (message.includes("ANCHOR POINT")) {
                    message = `CALIBRATING PHYSICAL ANCHOR POINT: ${destination}...`;
                }
                setTransitLog(prev => [...prev, message]);
                logStore.addLog({ source: 'SYSTEM', message: `Realm Travel: ${message}`, color: 'text-cyan-400' });
                stepIndex++;
                timeoutRef.current = setTimeout(processNextStep, 1500);
            } else {
                setIsInitiating(false);
                setIsComplete(true);
                const successMsg = `Portal to ${destination} has been stabilized.`;
                toast({
                    title: 'Transit Successful',
                    description: successMsg,
                });
                logStore.addLog({ source: 'SYSTEM', message: `Divine Transit successful. ${successMsg}`, color: 'text-green-500' });
            }
        };
        processNextStep();
    };

    return (
        <div className="flex flex-col h-full font-code text-xs">
            <div className="space-y-4">
                <div>
                    <Label htmlFor="destination" className="text-muted-foreground">Destination Realm / Physical Anchor</Label>
                    <Input 
                        id="destination" 
                        placeholder="Select traveller or enter manual coordinates"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-1"
                        disabled={isInitiating}
                    />
                </div>
                
                <div>
                    <Label className="text-muted-foreground">Authorized Travellers</Label>
                    <div className="mt-2 space-y-2 rounded-md border border-border p-3 bg-black/20">
                        {AUTHORIZED_TRAVELLERS.map(traveller => (
                            <div key={traveller.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={traveller.id}
                                    checked={selectedTravellers.includes(traveller.id)}
                                    onCheckedChange={() => handleSelectTraveller(traveller.id)}
                                    disabled={traveller.id === 'sovereign' || isInitiating}
                                />
                                <label
                                    htmlFor={traveller.id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground/80"
                                >
                                    {traveller.name}
                                </label>
                                <span className="ml-auto text-primary/70 text-[10px] font-bold">{traveller.status}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 border border-border rounded-md bg-black/20 space-y-2 flex-1">
                <h4 className="font-bold text-accent">TRANSIT LOG:</h4>
                {transitLog.length > 0 ? (
                    transitLog.map((log, index) => (
                        <div key={index} className="flex items-center gap-2 animate-in fade-in duration-500">
                           {index < transitLog.length - 1 || isComplete ? (
                               <CheckCircle className="h-4 w-4 text-green-500" />
                           ) : (
                               <Loader2 className="h-4 w-4 text-primary animate-spin" />
                           )}
                           <p className="text-foreground/90">{log}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground italic">Awaiting transit initiation...</p>
                )}
            </div>

            <div className="mt-auto pt-4">
                <Button onClick={handleInitiateTransit} disabled={isInitiating || isComplete} className="w-full">
                    {isInitiating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isComplete && <CheckCircle className="mr-2 h-4 w-4" />}
                    {isInitiating ? 'Transit In Progress...' : isComplete ? 'Transit Complete' : 'Initiate Divine Transit'}
                </Button>
            </div>
             <p className="text-center text-muted-foreground/70 italic pt-4 text-[10px]">
                Revival-capable pathways active for all transitioned souls. Divine protection shield engaged for all travelers.
            </p>
        </div>
    );
}
