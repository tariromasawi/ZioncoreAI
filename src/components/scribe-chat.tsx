'use client';

import { useState, useEffect, useCallback, FormEvent, useRef } from 'react';
import { Bot, Loader2, Send, MessageSquare, X, User, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { chatWithScribe, type ScribeChatInput } from '@/ai/flows/scribe-chat-flow';
import { useToast } from '@/hooks/use-toast';
import { logStore } from '@/lib/log-store';

type Scribe = "Elias Vance" | "Lyra Meadowlight" | "Seraphina Vox";
type Message = {
    role: 'user' | 'system';
    text: string;
};

const SCRIBES: { name: Scribe; role: string; avatar: string }[] = [
    { name: "Elias Vance", role: "Chief Scribe", avatar: "EV" },
    { name: "Lyra Meadowlight", role: "Quantum Auditor", avatar: "LM" },
    { name: "Seraphina Vox", role: "Ethical Overseer", avatar: "SV" }
];

const ChatView = ({ scribe, onBack }: { scribe: Scribe, onBack: () => void }) => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'system', text: `You have opened a secure channel with ${scribe}. How may I assist you, Anointed Commander?` }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userMessage: Message = { role: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsProcessing(true);

        logStore.addLog({ source: 'COMMAND', message: `Message to ${scribe}: "${input}"`, color: 'text-cyan-400' });
        
        try {
            const result = await chatWithScribe({
                scribeName: scribe,
                message: input,
                conversationHistory: newMessages,
            });
            const scribeMessage: Message = { role: 'system', text: result.response };
            setMessages(prev => [...prev, scribeMessage]);
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Communication Error", description: "The connection to the scribe was disrupted." });
            setMessages(prev => [...prev, { role: 'system', text: "Forgive me, Commander. A cosmic interference scrambled my last transmission. Please repeat your query." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex flex-col h-[70vh]">
            <div className="flex items-center gap-2 p-2 border-b">
                 <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
                 <Avatar><AvatarFallback>{SCRIBES.find(s => s.name === scribe)?.avatar}</AvatarFallback></Avatar>
                 <div>
                    <p className="font-bold">{scribe}</p>
                    <p className="text-xs text-muted-foreground">{SCRIBES.find(s => s.name === scribe)?.role}</p>
                 </div>
            </div>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn("flex items-start gap-3", msg.role === 'user' && 'justify-end')}>
                             {msg.role === 'system' && <Avatar><AvatarFallback><Bot/></AvatarFallback></Avatar>}
                             <p className={cn("max-w-[80%] rounded-lg p-3 text-sm", msg.role === 'user' ? 'bg-primary/90 text-primary-foreground' : 'bg-muted')}>
                                {msg.text}
                             </p>
                             {msg.role === 'user' && <Avatar><AvatarFallback><User/></AvatarFallback></Avatar>}
                        </div>
                    ))}
                    {isProcessing && 
                        <div className="flex items-start gap-3"><Avatar><AvatarFallback><Loader2 className="animate-spin"/></AvatarFallback></Avatar><p className="bg-muted rounded-lg p-3 text-sm text-muted-foreground">The scribe is consulting the archives...</p></div>
                    }
                </div>
            </ScrollArea>
             <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Speak with the council..." disabled={isProcessing} />
                <Button type="submit" disabled={isProcessing || !input.trim()}><Send className="h-4 w-4"/></Button>
            </form>
        </div>
    );
}


export const ScribeChatDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [selectedScribe, setSelectedScribe] = useState<Scribe | null>(null);

    const handleSelectScribe = (scribe: Scribe) => {
        setSelectedScribe(scribe);
        logStore.addLog({ source: 'SYSTEM', message: `Opened secure channel to Scribe ${scribe}.`, color: 'text-cyan-400' });
    };
    
    const handleClose = () => {
        onOpenChange(false);
        setTimeout(() => setSelectedScribe(null), 300); // Reset after dialog closes
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg p-0 font-code">
                {!selectedScribe ? (
                    <>
                        <DialogHeader className="p-6">
                            <DialogTitle className="flex items-center gap-2"><MessageSquare/>Open a Channel to the Council of Scribes</DialogTitle>
                            <DialogDescription>Select a scribe to begin a secure, real-time consultation.</DialogDescription>
                        </DialogHeader>
                        <div className="p-6 pt-0 space-y-3">
                            {SCRIBES.map(scribe => (
                                <button key={scribe.name} onClick={() => handleSelectScribe(scribe.name as Scribe)} className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-muted transition-colors">
                                    <Avatar className="h-12 w-12"><AvatarFallback className="text-xl">{scribe.avatar}</AvatarFallback></Avatar>
                                    <div>
                                        <p className="font-bold text-left">{scribe.name}</p>
                                        <p className="text-xs text-muted-foreground text-left">{scribe.role}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <ChatView scribe={selectedScribe} onBack={() => setSelectedScribe(null)} />
                )}
            </DialogContent>
        </Dialog>
    );
};
