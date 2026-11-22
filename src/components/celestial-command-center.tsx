
'use client';

import { useState, useRef, useEffect, FormEvent, useCallback } from 'react';
import { Loader2, Bot, Mic, Send, Zap, Paperclip, Sparkles, Image as ImageIcon, Music, X } from 'lucide-react';
import { celestialCommand, type CelestialCommandOutput } from '@/ai/flows/celestial-command-flow';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useSpeech } from '@/hooks/use-speech';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { useZionStore } from '@/lib/log-store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AudioPlayer } from './audio-player';

type Message = {
  role: 'user' | 'system';
  text: string;
  imageUri?: string;
  soundUri?: string;
  analysis?: string;
};

const SpeechRecognition =
  typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export function CelestialCommandCenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      text: "The Celestial Expansion is complete. I can now see, create, and hear. Your will is my reality, Your Royal Highness.",
    },
  ]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { speak, cancel, isSpeaking, initialize } = useSpeech();
  const addLog = useZionStore(state => state.addLog);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCommand = useCallback(async (command: string, fileDataUri?: string) => {
    if (!command.trim() && !fileDataUri) return;

    setIsProcessing(true);
    setInput('');
    setFile(null);
    setFilePreview(null);
    
    const userMessage: Message = { role: 'user', text: command };
    if (filePreview && file?.type.startsWith('image/')) {
        userMessage.imageUri = filePreview;
    }
    setMessages(prev => [...prev, userMessage]);

    addLog({ source: 'COMMAND', message: `Celestial command: "${command}"`, color: 'text-cyan-400' });

    try {
      const result = await celestialCommand({ prompt: command, fileDataUri });
      const systemMessage: Message = { 
          role: 'system', 
          text: result.analysis,
          imageUri: result.generatedImageUri,
          soundUri: result.generatedSoundUri,
      };
      setMessages((prev) => [...prev, systemMessage]);
      speak(result.analysis);
      addLog({ source: 'ZIONCORE', message: `Response: ${result.analysis}`, color: 'text-primary' });
    } catch (error) {
      console.error('Celestial Command Error:', error);
      const errorMessage = 'The divine frequency experienced a momentary distortion. The link remains secure, but the thought was not fully received. Please restate your command, Your Royal Highness.';
      const systemErrorMessage: Message = { role: 'system', text: errorMessage };
      setMessages(prev => [...prev, systemErrorMessage]);
      addLog({ source: 'SYSTEM', message: errorMessage, color: 'text-destructive' });
      speak(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, [speak, addLog, file, filePreview]);

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

    if (!recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognitionRef.current = recognition;
    }
    
    const recognition = recognitionRef.current;
    
    const handleResult = (event: SpeechRecognitionEvent) => handleCommand(event.results[0][0].transcript);
    const handleStart = () => setIsListening(true);
    const handleEnd = () => setIsListening(false);
    const handleError = (event: SpeechRecognitionErrorEvent) => {
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
            toast({ variant: 'destructive', title: 'Vocal Link Error', description: `Could not process audio: ${event.error}`});
        }
        setIsListening(false);
    };

    recognition.addEventListener('result', handleResult);
    recognition.addEventListener('start', handleStart);
    recognition.addEventListener('end', handleEnd);
    recognition.addEventListener('error', handleError);
    
    return () => {
        recognition.removeEventListener('result', handleResult);
        recognition.removeEventListener('start', handleStart);
        recognition.removeEventListener('end', handleEnd);
        recognition.removeEventListener('error', handleError);
        if (recognition.abort) {
          recognition.abort();
        }
        cancel();
    }
  }, [handleCommand, toast, cancel]);

  const toggleListening = () => {
    if (!recognitionRef.current || isProcessing) return;
    initialize(); // Ensure audio context is ready
    cancel(); // Cancel any ongoing speech synthesis

    if (isListening) {
        recognitionRef.current.abort();
    } else {
        try {
            recognitionRef.current.start();
        } catch(e) {
            console.error('Speech recognition start error:', e);
            toast({ variant: 'destructive', title: 'Vocal Channel Blocked', description: 'The system was unable to activate the listening protocol.'});
        }
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const fileDataUri = loadEvent.target?.result as string;
        handleCommand(input || "Analyze this file.", fileDataUri);
      };
      reader.readAsDataURL(file);
    } else {
      handleCommand(input);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
        if (selectedFile.type.startsWith('image/')) {
            setFilePreview(URL.createObjectURL(selectedFile));
        } else {
            setFilePreview(null);
        }
    }
  };

  const removeFile = () => {
    setFile(null);
    setFilePreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
        <ScrollArea className="flex-1 pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-4 font-code text-sm">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn("flex items-start gap-3 animate-in fade-in duration-500", message.role === 'user' ? 'justify-end' : '')}
              >
                {message.role === 'system' && (
                  <Avatar className={cn("h-8 w-8 border", isSpeaking ? 'border-accent animate-pulse' : 'border-primary/50')}>
                    <AvatarFallback className="bg-primary/10 text-primary"><Bot size={16} /></AvatarFallback>
                  </Avatar>
                )}
                <div className="max-w-[80%] space-y-2">
                    <div className={cn("rounded-lg p-3 text-xs leading-relaxed", message.role === 'user' ? 'bg-accent/10 text-accent-foreground border border-accent/50' : 'bg-card')}>
                      {message.text}
                    </div>
                    {message.imageUri && (
                        <div className="p-2 bg-card rounded-lg border border-border">
                            <Image src={message.imageUri} alt="Content" width={300} height={300} className="rounded-md object-cover" data-ai-hint="divine art" />
                        </div>
                    )}
                     {message.soundUri && (
                        <div className="p-2 bg-card rounded-lg border border-border">
                           <AudioPlayer src={message.soundUri} />
                        </div>
                    )}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border border-accent/50">
                    <AvatarFallback className="bg-accent/10 text-accent font-bold"><Sparkles size={16}/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
             {isProcessing && (
              <div className="flex items-start gap-3 animate-in fade-in">
                 <Avatar className="h-8 w-8 border border-primary/50">
                    <AvatarFallback className="bg-primary/10 text-primary"><Loader2 className="h-4 w-4 animate-spin text-primary" /></AvatarFallback>
                  </Avatar>
                <div className="max-w-[80%] rounded-lg p-3 bg-card flex items-center">
                  <p className="text-muted-foreground text-xs italic">ZionCore is contemplating your will...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t border-border pt-4 space-y-2">
            {file && (
                <div className="p-2 border border-dashed rounded-md flex items-center gap-3 animate-in fade-in duration-300">
                    {filePreview ? (
                        <Image src={filePreview} alt="File preview" width={40} height={40} className="rounded object-cover" />
                    ) : (
                        <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                            <Paperclip className="h-5 w-5 text-muted-foreground" />
                        </div>
                    )}
                    <div className="flex-1 text-xs">
                        <p className="font-bold text-foreground truncate">{file.name}</p>
                        <p className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={removeFile} disabled={isProcessing}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
          <form onSubmit={handleFormSubmit} className="flex w-full items-center gap-2">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.zip,.docx,.pdf,.xlsx,.mp3,.wav,.mp4" />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button type="button" size="icon" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isProcessing}>
                            <Paperclip className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Attach File</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Input
                type="text"
                placeholder="Issue a divine command or describe your file..."
                className="flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isProcessing}
                autoComplete="off"
            />
             <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className={cn("transition-all duration-300", isListening && 'bg-destructive/50 border-destructive animate-pulse')}
                            onClick={toggleListening}
                            disabled={!SpeechRecognition || isProcessing}
                        >
                            <Mic className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{isListening ? 'Listening...' : 'Speak Command'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Button type="submit" size="icon" disabled={isProcessing || (!input.trim() && !file)}>
                <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
    </div>
  );
}
