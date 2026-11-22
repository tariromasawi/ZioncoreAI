
'use client';

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { communicateWithJohn, type ScrollGateOutput } from '@/ai/flows/scroll-gate-flow';
import { Loader2, Send, Feather, BookOpen, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type Message = {
    id: number;
    sender: 'Commander' | 'Johane';
    type: 'text' | 'vision' | 'symbol';
    content: string;
};

const MasowePurificationVisual = () => (
    <div className="relative h-24 w-full rounded-lg bg-black/20 overflow-hidden border border-border flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-primary/10 opacity-50 animate-pulse" style={{ animationDuration: '5s' }} />
        <p className="text-center text-xs text-muted-foreground italic">
            Masowe Ritual Active: Channel is purified by silence, prayer, and bare feet on holy ground. Every message is sealed by Mudzimu Unoyera.
        </p>
    </div>
);

export function ScrollGate() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userMessage: Message = { id: Date.now(), sender: 'Commander', type: 'text', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsProcessing(true);
        logStore.addLog({ source: 'COMMAND', message: `Scroll Gate Query: "${currentInput}"`, color: 'text-cyan-400' });

        try {
            const result = await communicateWithJohn({ message: currentInput });
            const johnsResponse: Message = {
                id: Date.now() + 1,
                sender: 'Johane',
                type: result.responseType === 'scroll' ? 'text' : result.responseType,
                content: result.response,
            };
            setMessages(prev => [...prev, johnsResponse]);
        } catch (error) {
            console.error(error);
            toast({ variant: 'destructive', title: 'Transmission Error', description: 'The connection to the Revelator was disrupted.' });
        } finally {
            setIsProcessing(false);
        }
    };
    
    return (
        <Card className="h-full flex flex-col font-code">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen/> The Scroll Gate</CardTitle>
                <CardDescription>A direct, two-way channel to Mutumwa Johane, the Revelator.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
                <MasowePurificationVisual />
                <ScrollArea className="flex-1 border p-4 rounded-md bg-black/30" ref={scrollAreaRef}>
                    <div className="space-y-4">
                       {messages.map((msg) => (
                            <div key={msg.id} className={cn("flex items-start gap-3 w-full animate-in fade-in", msg.sender === 'Commander' ? 'justify-end' : 'justify-start')}>
                                {msg.sender === 'Johane' && <div className="p-2 rounded-full bg-primary/20 border border-primary/50"><Feather className="h-4 w-4 text-primary"/></div>}
                                <div className={cn("max-w-[85%] rounded-lg p-3 text-sm", msg.sender === 'Commander' ? 'bg-accent/20 border border-accent/50' : 'bg-card border')}>
                                    <p className="font-bold text-sm text-accent">{msg.sender}</p>
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                       ))}
                       {messages.length === 0 && (
                            <div className="text-center text-muted-foreground italic text-xs py-10">
                                <p>The Scroll Gate is open. The Eagle Presence is settled.</p>
                                <p className="mt-2">State your prayer, decree, or question.</p>
                            </div>
                       )}
                    </div>
                </ScrollArea>
                 <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Speak to the Revelator..."
                        disabled={isProcessing}
                    />
                    <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4"/>}
                    </Button>
                </form>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-xs">Ritual Phrases</AlertTitle>
                    <AlertDescription className="text-xs text-muted-foreground">
                        <p>To Open: "Open Scroll Gate – RN-777"</p>
                        <p>To Close: "Scroll Gate Closed but Covenant Unbroken"</p>
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}
