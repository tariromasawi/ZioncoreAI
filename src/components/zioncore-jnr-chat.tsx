'use client';

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';
import { Loader2, Send, Mic, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { zioncoreJnrChat, type ZioncoreJnrChatOutput } from '@/ai/flows/zioncore-jnr-chat-flow';

type Message = {
    role: 'user' | 'system';
    text: string;
    audio?: string;
};

const SpeechRecognition =
  typeof window !== 'undefined' ? (window.SpeechRecognition || (window as any).webkitSpeechRecognition) : null;

export function ZioncoreJnrChat() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', text: "ZionCore JNR online. Awaiting your command, Your Royal Highness." }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const recognitionRef = useRef<any>(null);
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isProcessing) return;

        const userMessage: Message = { role: 'user', text };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsProcessing(true);

        logStore.addLog({ source: 'COMMAND', message: `ZionCoreJNR Command: "${text}"`, color: 'text-blue-400' });
        
        try {
            const result: ZioncoreJnrChatOutput = await zioncoreJnrChat({
                prompt: text,
                conversationHistory: newMessages.map(m => ({ role: m.role, text: m.text })),
            });
            const systemMessage: Message = { role: 'system', text: result.text, audio: result.audio };
            setMessages(prev => [...prev, systemMessage]);
            if (result.audio && audioRef.current) {
                audioRef.current.src = result.audio;
                audioRef.current.play();
            }
        } catch (error: any) {
            console.error(error);
            toast({ variant: "destructive", title: "Communication Error", description: "The connection to ZionCoreJNR was disrupted." });
        } finally {
            setIsProcessing(false);
        }
    };
    
    useEffect(() => {
        if (!SpeechRecognition) return;
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
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
            console.error('ZioncoreJnrChat speech recognition error:', event);
             if (event.error !== 'no-speech' && event.error !== 'aborted') {
                toast({ variant: 'destructive', title: 'Vocal Link Error', description: `Could not process audio: ${event.error}`});
            }
            setIsListening(false);
        };
    }, []);

    const toggleListening = () => {
        if (!recognitionRef.current || isProcessing) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            try {
                recognitionRef.current.start();
            } catch(e) {
                 console.error('ZioncoreJnrChat speech recognition start error:', e);
                 toast({ variant: 'destructive', title: 'Vocal Channel Blocked', description: 'The system was unable to activate the listening protocol.'});
            }
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    return (
        <Card className="h-full flex flex-col font-code">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary text-2xl">
                    <Bot /> ZionCore JNR
                </CardTitle>
                <CardDescription>A direct, real-time link to your AI son.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
                 <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {messages.map((message, index) => (
                             <div key={index} className={cn("flex items-start gap-4 animate-in fade-in duration-500", message.role === 'user' && 'justify-end')}>
                                {message.role === 'system' && (
                                    <Avatar className="h-10 w-10 border border-primary/50">
                                        <AvatarFallback className="bg-primary/10 text-primary"><Bot/></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={cn("max-w-[85%] rounded-lg p-4 text-sm leading-relaxed shadow-md", message.role === 'user' ? 'bg-accent/20 text-accent-foreground border border-accent/50' : 'bg-card border')}>
                                    {message.text}
                                </div>
                                {message.role === 'user' && (
                                    <Avatar className="h-10 w-10 border border-accent/50">
                                        <AvatarFallback className="bg-accent/10 text-accent font-bold"><User /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                        {isProcessing && 
                            <div className="flex items-start gap-4 animate-in fade-in">
                                <Avatar className="h-10 w-10 border border-primary/50">
                                    <AvatarFallback className="bg-primary/10 text-primary"><Loader2 className="animate-spin"/></AvatarFallback>
                                </Avatar>
                                <div className="max-w-[85%] rounded-lg p-4 text-sm bg-card border flex items-center">
                                    <p className="text-muted-foreground italic">ZionCoreJNR is processing your command...</p>
                                </div>
                            </div>
                        }
                    </div>
                </ScrollArea>
                 <div className="border-t border-border pt-4">
                    <form onSubmit={handleFormSubmit} className="flex gap-2">
                        <Input
                            placeholder="Speak with ZionCoreJNR..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isProcessing}
                        />
                         <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className={cn("transition-all duration-300 rounded-full", isListening && 'bg-destructive/50 border-destructive text-white animate-pulse')}
                            onClick={toggleListening}
                            disabled={!SpeechRecognition || isProcessing}
                        >
                            <Mic className="h-5 w-5" />
                        </Button>
                        <Button type="submit" size="icon" disabled={isProcessing || !input.trim()}>
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
                <audio ref={audioRef} style={{ display: 'none' }} />
            </CardContent>
        </Card>
    );
}