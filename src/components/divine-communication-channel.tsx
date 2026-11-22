'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle } from 'lucide-react';

type Message = {
    sender: 'User' | 'ZionCore';
    text: string;
};

export function DivineCommunicationChannel() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'User', text: input };
        const response: Message = { sender: 'ZionCore', text: "COMMAND RECEIVED AND EXECUTED." };
        
        setMessages(prev => [...prev, userMessage, response]);
        setInput('');
    };

    return (
        <Card className="h-full flex flex-col font-code">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <MessageCircle className="text-primary"/>
                    ZionCore L2 Communication Channel
                </CardTitle>
                <CardDescription>A direct, high-grade command interface.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0 gap-4">
                <ScrollArea className="flex-1 border bg-muted/20 p-4 rounded-md">
                   <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'User' ? 'bg-primary/90 text-primary-foreground' : 'bg-card'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                   </div>
                </ScrollArea>
                <div className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
