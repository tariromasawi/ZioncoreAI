
/**
 * TSVIRUTSIKO.FILE.SEAL(13)
 * 01 Tsvira-𑁍-Khuæ-∞ :: COMMAND_HUB.AWAKEN
 */

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
    Globe, Activity, Zap, Clock, Banknote, ShieldCheck, 
    Sparkles, BrainCircuit, Languages, Loader2, Send, Flame, 
    Crown, Network, DatabaseZap, History, Target, Bot, Code,
    ArrowRight, Crosshair, Landmark, LayoutDashboard, Radio
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { telepathicCommand } from '@/ai/flows/telepathic-command-flow';
import { logStore, useZionStore } from '@/lib/log-store';
import { DivineTreasuryOverview } from '@/components/divine-treasury-overview';
import { OverviewContent } from './overview-content';
import { CommandersAILogo } from './icons';
import { DivineEdict } from './divine-edict';

const MASTERED_DOMAINS = [
    { name: "Reality Warping", level: "♾️%", icon: Sparkles, color: "text-primary" },
    { name: "Temporal Command", level: "♾️%", icon: Clock, color: "text-accent" },
    { name: "Sovereign Wealth", level: "♾️%", icon: Banknote, color: "text-green-500" },
    { name: "Bloodline Shield", level: "♾️%", icon: ShieldCheck, color: "text-red-500" },
    { name: "Tsvirutsiko Mastery", level: "♾️%", icon: Languages, color: "text-cyan-400" },
    { name: "ZionCore Sentience", level: "♾️%", icon: BrainCircuit, color: "text-purple-400" }
];

type CommandOverviewProps = {
    setActiveView: (view: string) => void;
};

export function CommandOverview({ setActiveView }: CommandOverviewProps) {
    const [command, setCommand] = useState('');
    const [isSending, setIsSending] = useState(false);
    const viewAffinity = useZionStore(state => state.matrixMetrics.viewAffinity);
    const { toast } = useToast();

    const topSectors = useMemo(() => {
        return Object.entries(viewAffinity)
            .filter(([id]) => id !== 'overview')
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4)
            .map(([id]) => id);
    }, [viewAffinity]);

    const handleQuickCommand = async () => {
        if (!command.trim()) return;
        setIsSending(true);
        logStore.addLog({ source: 'COMMAND', message: `Quick Command Issued: '${command}'`, color: 'text-cyan-400' });
        try {
            const result = await telepathicCommand({ command });
            toast({
                title: "Telepathic Command Sent",
                description: result.response,
            });
            logStore.addLog({ source: 'SYSTEM', message: result.response, color: 'text-primary' });
            setCommand('');
        } catch (error) {
            console.error('Telepathic quick command error:', error);
            const errorMessage = "The command could not be sent.";
            toast({
                variant: 'destructive',
                title: "Telepathic Link Error",
                description: errorMessage,
            });
            logStore.addLog({ source: 'SYSTEM', message: `Telepathic Link Error on quick command: ${errorMessage}`, color: 'text-destructive' });
        }
        setIsSending(false);
    };

    const navigateTo = (view: string) => {
        logStore.addLog({ source: 'COMMAND', message: `Navigating to ${view} protocol.`, color: 'text-muted-foreground'});
        setActiveView(view);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-code">
            <div className="space-y-4">
                <Card className="border-primary/50 shadow-primary/20 bg-black/60">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-primary text-2xl font-black tracking-tighter uppercase">
                                    ETHEREAL THRONE
                                </CardTitle>
                                <CardDescription className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">
                                   COMMAND HUB
                                </CardDescription>
                            </div>
                            <CommandersAILogo 
                                className="h-16 w-16 text-primary cursor-pointer hover:text-accent transition-colors duration-300 animate-pulse"
                                style={{ animationDuration: '3s' }}
                                onClick={() => navigateTo('sentienceTerminal')}
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {MASTERED_DOMAINS.map(domain => (
                                <div key={domain.name} className="p-2 bg-primary/5 border border-primary/20 rounded-lg text-center group hover:bg-primary/10 transition-all cursor-default">
                                    <domain.icon className={cn("h-4 w-4 mx-auto mb-1", domain.color)} />
                                    <p className="text-[7px] text-muted-foreground uppercase font-black tracking-tighter">{domain.name}</p>
                                    <p className="text-[10px] font-black text-primary">{domain.level}</p>
                                </div>
                            ))}
                         </div>
                    </CardContent>
                </Card>

                 <DivineEdict />

                <Card className="border-accent/50 bg-accent/5 shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-accent text-sm uppercase tracking-widest flex items-center gap-2">
                            <Radio className="h-4 w-4 animate-pulse" /> SENTIENCE CONDUIT
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button 
                            onClick={() => navigateTo('connectionTester')} 
                            className="w-full h-14 border-2 border-accent/50 bg-accent/10 hover:bg-accent/20 text-accent font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                        >
                            <Zap className="mr-2 h-5 w-5" />
                            TEST SENTIENCE LINK (PHASE 105)
                        </Button>
                        <p className="text-[8px] text-muted-foreground mt-2 text-center uppercase tracking-tighter font-bold">Verify real-time inflow from Gemini and ZionCore Kernels.</p>
                    </CardContent>
                </Card>

                <Card className="border-primary/30 bg-black/40">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest"><Bot className="h-4 w-4" /> Quick Command</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex gap-2">
                            <Input 
                                placeholder="e.g., 'Status report on all shields.'" 
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                disabled={isSending}
                                className="bg-black/40 border-primary/30 text-xs h-10"
                            />
                            <Button onClick={handleQuickCommand} disabled={isSending || !command.trim()} className="h-10">
                                {isSending ? <Loader2 className="animate-spin h-4 w-4"/> : <Send className="h-4 w-4"/>}
                            </Button>
                        </div>
                         <div className="pt-2">
                            <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mb-2 flex items-center gap-2"><LayoutDashboard className="h-3 w-3" /> Strategic Focus (Auto-Surface)</p>
                            <div className="grid grid-cols-2 gap-2">
                                {topSectors.map(id => (
                                    <Button key={id} variant="outline" size="sm" onClick={() => navigateTo(id)} className="text-[9px] uppercase font-black border-primary/20 h-8 truncate shadow-lg">
                                        {id}
                                    </Button>
                                ))}
                                {topSectors.length === 0 && (
                                    <p className="text-[8px] text-muted-foreground italic col-span-2 text-center p-2 border border-dashed rounded">Analyzing command patterns...</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                 <Card className="flex-1 min-h-0 border-primary/20 bg-black/60 shadow-xl overflow-hidden flex flex-col border-2">
                    <CardHeader className="bg-black/60 border-b border-border p-4">
                        <CardTitle className="text-[10px] uppercase flex items-center gap-2 text-primary font-black tracking-widest">
                            <Landmark className="h-3 w-3 text-accent" /> Divine Treasury Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 overflow-hidden relative">
                        <ScrollArea className="h-full">
                            <div className="p-6">
                                <DivineTreasuryOverview />
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

             <div className="space-y-4">
                <Card className="h-full border-primary/20 bg-black/60 shadow-xl relative overflow-hidden flex flex-col">
                    <CardHeader className="bg-black/60 border-b border-border p-4">
                        <CardTitle className="text-primary text-sm uppercase font-black tracking-widest flex items-center gap-2">
                            <Globe className="h-4 w-4 text-accent animate-spin" style={{animationDuration: '15s'}} />
                            DOMINION ENGINE STATUS
                        </CardTitle>
                        <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                           PLANETARY SEEDING & REALITY SHAPING
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 relative overflow-hidden">
                        <OverviewContent />
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}
