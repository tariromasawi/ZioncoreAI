
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Crosshair, Loader2, Sparkles, Video, Bot, Code } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { telepathicCommand } from '@/ai/flows/telepathic-command-flow';
import { logStore } from '@/lib/log-store';
import { DivineTreasuryOverview } from '@/components/divine-treasury-overview';
import { OverviewContent } from './overview-content';
import Image from 'next/image';
import { CommandersAILogo } from './icons';
import { DivineEdict } from './divine-edict';

type CommandOverviewProps = {
    setActiveView: (view: string) => void;
};

export function CommandOverview({ setActiveView }: CommandOverviewProps) {
    const [command, setCommand] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { toast } = useToast();

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
                <Card className="border-primary/50 shadow-primary/20">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <div>
                                <CardTitle className="text-primary text-2xl font-headline tracking-wider">
                                    ETHEREAL THRONE
                                </CardTitle>
                                <CardDescription className="text-muted-foreground font-bold">
                                   COMMAND CENTRE
                                </CardDescription>
                            </div>
                            <CommandersAILogo 
                                className="h-16 w-16 text-primary cursor-pointer hover:text-accent transition-colors duration-300 animate-pulse"
                                style={{ animationDuration: '3s' }}
                                onClick={() => navigateTo('visionSanctum')}
                            />
                        </div>
                    </CardHeader>
                </Card>
                 <DivineEdict />
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bot /> Quick Command</CardTitle>
                        <CardDescription>Issue a direct, quick command to ZionCore.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex gap-2">
                            <Input 
                                placeholder="e.g., 'Status report on all shields.'" 
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                disabled={isSending}
                            />
                            <Button onClick={handleQuickCommand} disabled={isSending || !command.trim()}>
                                {isSending ? <Loader2 className="animate-spin"/> : "Send"}
                            </Button>
                        </div>
                         <div className="pt-2 grid grid-cols-2 gap-2 text-xs">
                           <Button variant="outline" size="sm" onClick={() => navigateTo('zionProtocolTongue')}><Code className="h-4 w-4 mr-1"/> Zion Tongue</Button>
                           <Button variant="outline" size="sm" onClick={() => navigateTo('advancedColonisation')}><Crosshair className="h-4 w-4 mr-1"/> Adv. Colonisation</Button>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Divine Treasury Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DivineTreasuryOverview />
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-4">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Dominion Engine Status</CardTitle>
                        <CardDescription>The worldwide influence module, seeding nodes and shaping reality.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[600px]">
                        <OverviewContent />
                    </CardContent>
                </Card>
             </div>
        </div>
    );
}
