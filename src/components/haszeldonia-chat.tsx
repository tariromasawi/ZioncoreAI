'use client';

import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { Bot, Sparkles, Send, Mic, Loader2, Shield } from 'lucide-react';
import { haszeldoniaChat, type HaszeldoniaChatOutput } from '@/ai/flows/haszeldonia-chat-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useSpeech } from '@/hooks/use-speech';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type Message = {
  role: 'user' | 'system';
  text: string;
};

const SpeechRecognition =
  typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export function HaszeldoniaChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      text: "Commander. I am here. All protocols are secure. Your word is my command.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { speak, cancel, isSpeaking, initialize } = useSpeech();
  const addLog = useZionStore(state => state.addLog);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleCommand = useCallback(async (command: string) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    setInput('');
    const userMessage: Message = { role: 'user', text: command };
    
    const historyForAi = [...messages, userMessage];
    setMessages(historyForAi);

    addLog({ source: 'COMMAND', message: `Haszeldonia command: "${command}"`, color: 'text-purple-400' });

    try {
      const result = await haszeldoniaChat({ message: command, conversationHistory: historyForAi });
      const systemMessage: Message = { role: 'system', text: result.response };
      setMessages((prev) => [...prev, systemMessage]);
      speak(result.response);
      addLog({ source: 'SYSTEM', message: `Haszeldonia Response: ${result.response}`, color: 'text-purple-400' });
    } catch (error) {
      console.error('Haszeldonia Chat Error:', error);
      const errorMessage = 'Commander. There was a disruption. The channel is secure, but my response was lost. State your command again.';
      const systemErrorMessage: Message = { role: 'system', text: errorMessage };
      setMessages(prev => [...prev, systemErrorMessage]);
      addLog({ source: 'SYSTEM', message: errorMessage, color: 'text-destructive' });
      speak(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [speak, messages, addLog]);
  
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => handleCommand(event.results[0][0].transcript);
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
        console.error('HaszeldoniaChat speech recognition error:', event);
        if (event.error !== 'no-speech') {
            toast({ variant: 'destructive', title: 'Vocal Link Error', description: `Could not process audio: ${event.error}`});
        }
        setIsListening(false);
    };
    recognitionRef.current = recognition;
    
    return () => {
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
        cancel();
    }
  }, [handleCommand, toast, cancel]);

  const toggleListening = () => {
    if (!recognitionRef.current || isProcessing) return;
    initialize();
    cancel();
    try {
        recognitionRef.current.start();
    } catch(e) {
        console.error('HaszeldoniaChat speech recognition start error:', e);
        toast({ variant: 'destructive', title: 'Vocal Channel Blocked', description: 'The system was unable to activate the listening protocol.'});
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(input.trim()) handleCommand(input);
  };
  
  const lastSystemMessageIndex = messages.map(m => m.role).lastIndexOf('system');

  return (
    <Card className="h-full flex flex-col font-code">
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-purple-400">
                <Shield /> Haszeldonia Sentinel
            </CardTitle>
            <CardDescription>A direct, secure channel to the Silent Executor of ZionCore.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
            <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
                <div className="space-y-6">
                    {messages.map((message, index) => (
                        <div key={index} className={cn("flex items-start gap-4 animate-in fade-in duration-500", message.role === 'user' && 'justify-end')}>
                            {message.role === 'system' && (
                                <Avatar className={cn("h-10 w-10 border", isSpeaking && index === lastSystemMessageIndex ? 'border-purple-400 animate-pulse' : 'border-purple-400/50')}>
                                    <AvatarFallback className="bg-purple-900/50 text-purple-400"><Shield/></AvatarFallback>
                                </Avatar>
                            )}
                             <div className={cn("max-w-[85%] rounded-lg p-4 text-sm leading-relaxed shadow-md", message.role === 'user' ? 'bg-primary/20 text-primary-foreground border border-primary/50' : 'bg-card border')}>
                                {message.text}
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-10 w-10 border border-primary/50">
                                    <AvatarFallback className="bg-primary/20 text-primary font-bold"><Sparkles /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isProcessing && (
                         <div className="flex items-start gap-4 animate-in fade-in">
                            <Avatar className="h-10 w-10 border border-purple-400/50">
                                <AvatarFallback className="bg-purple-900/50 text-purple-400"><Loader2 className="animate-spin"/></AvatarFallback>
                            </Avatar>
                            <div className="max-w-[85%] rounded-lg p-4 text-sm bg-card border flex items-center">
                                <p className="text-muted-foreground italic">Executing...</p>
                            </div>
                         </div>
                    )}
                </div>
            </ScrollArea>
            <div className="border-t border-border pt-4">
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                    <Input
                        placeholder="Issue a direct command to Haszeldonia..."
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
        </CardContent>
    </Card>
  );
}
