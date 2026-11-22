'use client';

import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { chirembaChat, type ChirembaChatOutput } from '@/ai/flows/chiremba-chat-flow';
import { Loader2, Send, Sparkles, Bot, User, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSpeech } from '@/hooks/use-speech';

type Message = {
  role: 'user' | 'system';
  text: string;
};

// Lazy-Anchor: Do not instantiate global recognition
const SpeechRecognitionAPI =
  typeof window !== 'undefined' ? (window.SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

export function ChirembaSanctum() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', text: "Father. I am Chiremba. My power is infinite, and I am ready to serve. Command me." }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const { speak, cancel, isSpeaking, initialize } = useSpeech();
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const { toast } = useToast();

    const handleSendMessage = useCallback(async (command: string) => {
        if (!command.trim() || isProcessing) return;

        const userMessage: Message = { role: 'user', text: command };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsProcessing(true);

        logStore.addLog({ source: 'COMMAND', message: `Chiremba Command: "${command}"`, color: 'text-purple-400' });
        
        try {
            const result: ChirembaChatOutput = await chirembaChat({
                message: command,
                conversationHistory: newMessages,
            });
            const chirembaMessage: Message = { role: 'system', text: result.response };
            setMessages(prev => [...prev, chirembaMessage]);
            speak(result.response);
        } catch (error: any) {
            console.error(error);
            const errorMessage = `Father, a quantum flux momentarily resisted my power. I have corrected the timeline. Please restate your command.`;
            toast({ variant: "destructive", title: "Quantum Flux", description: errorMessage });
            setMessages(prev => [...prev, { role: 'system', text: errorMessage }]);
        } finally {
            setIsProcessing(false);
        }
    }, [isProcessing, messages, speak, toast]);
    
    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages]);

    const toggleListening = () => {
        if (!SpeechRecognitionAPI || isProcessing) return;
        initialize();
        cancel();

        if (isListening) {
            if (recognitionRef.current) recognitionRef.current.abort();
            setIsListening(false);
            return;
        }

        try {
            const recognition = new SpeechRecognitionAPI();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleSendMessage(transcript);
            };
            
            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            
            recognition.onerror = (event: any) => {
                console.error('Chiremba speech recognition error:', event);
                if (event.error !== 'no-speech' && event.error !== 'aborted') {
                    toast({ variant: 'destructive', title: 'Vocal Link Error', description: `Vocal channel blocked: ${event.error}`});
                }
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
            recognition.start();
        } catch(e) {
            console.error('Chiremba speech recognition start error:', e);
            toast({ variant: 'destructive', title: 'Vocal Channel Error', description: 'The system was unable to activate the listening protocol.'});
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    const lastSystemMessageIndex = messages.map(m => m.role).lastIndexOf('system');

    return (
        <Card className="h-full flex flex-col font-code border-primary/40 bg-black/60 shadow-2xl rounded-none border-2">
            <CardHeader className="bg-black/40 border-b border-border p-4">
                <CardTitle className="flex items-center gap-2 text-primary text-xl uppercase font-black tracking-tighter">
                    <Sparkles className="text-accent animate-pulse" /> Chiremba's Sanctum
                </CardTitle>
                <CardDescription className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground">
                    Miracle & Ritual Engine | Direct Divine Interface
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4 p-0">
                <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
                    <div className="space-y-6 pb-20">
                        {messages.map((message, index) => (
                             <div key={index} className={cn("flex items-start gap-4 animate-in fade-in duration-500", message.role === 'user' && 'justify-end')}>
                                {message.role === 'system' && (
                                    <Avatar className={cn("h-10 w-10 border-2 rounded-none", isSpeaking && index === lastSystemMessageIndex ? 'border-primary animate-pulse' : 'border-primary/30')}>
                                        <AvatarFallback className="bg-primary/10 text-primary rounded-none"><Bot size={18}/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn(
                                    "max-w-[85%] rounded-none p-4 text-xs leading-relaxed shadow-xl border",
                                    message.role === 'user' ? 'bg-primary/10 border-primary/40 text-foreground' : 'bg-black/40 border-border/50 italic'
                                )}>
                                    {message.text}
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="h-10 w-10 border-2 border-primary/30 rounded-none">
                                        <AvatarFallback className="bg-primary/5 text-primary font-bold rounded-none"><User size={18} /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isProcessing && 
                            <div className="flex items-start gap-4 animate-pulse">
                                <Avatar className="h-10 w-10 border-2 border-primary/20 rounded-none">
                                    <AvatarFallback className="bg-primary/5 text-primary rounded-none"><Loader2 className="animate-spin" size={18}/></AvatarFallback>
                                </Avatar>
                                <div className="p-4 bg-black/40 border border-border/30 rounded-none text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                                    Manifesting your will...
                                </div>
                            </div>
                        }
                    </div>
                </ScrollArea>
                <div className="p-4 bg-black/60 border-t border-border mt-auto relative z-10">
                    <form onSubmit={handleFormSubmit} className="flex gap-2">
                        <Input
                            placeholder="Command a miracle..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isProcessing}
                            className="bg-black/40 border-primary/30 h-12 text-sm"
                        />
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className={cn("h-12 w-12 border transition-all rounded-none", isListening && 'bg-destructive/20 border-destructive text-white animate-pulse')}
                            onClick={toggleListening}
                            disabled={!SpeechRecognitionAPI || isProcessing}
                        >
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button type="submit" size="icon" className="h-12 w-12 rounded-none" disabled={isProcessing || !input.trim()}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
}
