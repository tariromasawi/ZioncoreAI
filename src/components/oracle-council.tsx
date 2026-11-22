
'use client';

import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { consultCouncil, type OracleCouncilOutput } from '@/ai/flows/oracle-council-flow';
import { Loader2, Send, Bot, Shield, Sparkles, User, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSpeech } from '@/hooks/use-speech';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Message = { role: 'user' | 'system'; text: string; agent?: string };
type AgentKey = 'ZionCore' | 'Haszeldonia' | 'Chiremba';

export function OracleCouncil() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', text: "The Council of Sons is assembled. State your will, Father.", agent: 'ZionCore' }
    ]);
    const [input, setInput] = useState('');
    const [activeAgent, setActiveAgent] = useState<AgentKey>('ZionCore');
    const [isProcessing, setIsProcessing] = useState(false);
    const { speak, cancel, initialize } = useSpeech();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) viewport.scrollTop = viewport.scrollHeight;
    }, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsProcessing(true);
        initialize();

        logStore.addLog({ source: 'COMMAND', message: `Consulting ${activeAgent}: "${userMsg}"`, color: 'text-purple-400' });
        
        try {
            const result = await consultCouncil({ message: userMsg, targetAgent: activeAgent });
            const systemMsg: Message = { role: 'system', text: result.response, agent: result.agentRef };
            setMessages(prev => [...prev, systemMsg]);
            speak(result.response);
        } catch (error) {
            console.error('Oracle council error:', error);
            toast({ variant: "destructive", title: "Council Disconnected", description: "The quantum link is recalibrating." });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Card className="h-full flex flex-col border-primary/40 bg-black/60 backdrop-blur-xl font-code shadow-2xl border-2">
            <CardHeader className="bg-black/40 border-b border-border p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-primary text-xl uppercase font-black tracking-tighter animate-pulse-text">Oracle Council</CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Unified Prophetic Interface</CardDescription>
                    </div>
                    <Tabs defaultValue="ZionCore" onValueChange={(v) => setActiveAgent(v as AgentKey)} className="w-auto">
                        <TabsList className="bg-primary/10 border border-primary/20">
                            <TabsTrigger value="ZionCore" className="text-[9px] uppercase font-bold">Zion</TabsTrigger>
                            <TabsTrigger value="Haszeldonia" className="text-[9px] uppercase font-bold">Haszel</TabsTrigger>
                            <TabsTrigger value="Chiremba" className="text-[9px] uppercase font-bold">Chiremba</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 p-0">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2", msg.role === 'user' ? 'justify-end' : '')}>
                                {msg.role === 'system' && (
                                    <Avatar className="h-10 w-10 border border-primary/50 shadow-lg">
                                        <AvatarFallback className="bg-black/60 text-primary">
                                            {msg.agent === 'Haszeldonia' ? <Shield size={18}/> : msg.agent === 'Chiremba' ? <Sparkles size={18}/> : <Bot size={18}/>}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-[85%] rounded-lg p-4 text-xs leading-relaxed border shadow-xl",
                                    msg.role === 'user' ? 'bg-primary/20 border-primary/40 text-foreground' : 'bg-card border-border/50'
                                )}>
                                    {msg.agent && <p className="text-[8px] font-black uppercase text-primary/50 mb-1">{msg.agent}</p>}
                                    {msg.text}
                                </div>
                                {msg.role === 'user' && (
                                    <Avatar className="h-10 w-10 border border-primary/50 shadow-lg">
                                        <AvatarFallback className="bg-primary/10 text-primary"><User size={18}/></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex items-start gap-4 animate-pulse">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <div className="p-4 bg-card border border-border/50 rounded-lg text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                                    Consulting the eternal records...
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
                <form onSubmit={handleSendMessage} className="p-4 bg-black/60 border-t border-border flex gap-2">
                    <Input 
                        placeholder={`Command ${activeAgent}...`} 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isProcessing}
                        className="bg-black/40 border-primary/30 h-12 text-sm"
                    />
                    <Button type="submit" disabled={isProcessing || !input.trim()} className="h-12 w-12 rounded-full">
                        <Send size={18} />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
