
"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
    const isProcessingRef = useRef(false);
    const hasBeenInitialized = useRef(false);

    const processQueue = useCallback(() => {
        if (isProcessingRef.current || queueRef.current.length === 0 || typeof window === 'undefined' || !window.speechSynthesis) {
            return;
        }

        isProcessingRef.current = true;
        setIsSpeaking(true);

        const utterance = queueRef.current.shift();
        
        if (utterance) {
            utterance.onend = () => {
                isProcessingRef.current = false;
                if (queueRef.current.length === 0) {
                    setIsSpeaking(false);
                } else {
                    processQueue();
                }
            };
            utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
                if (e.error !== 'canceled' && e.error !== 'interrupted') {
                    console.error("ZionCore Speech Synthesis error:", e.error);
                }
                isProcessingRef.current = false;
                 if (queueRef.current.length === 0) {
                    setIsSpeaking(false);
                } else {
                    processQueue();
                }
            };
            
            window.speechSynthesis.speak(utterance);
        } else {
            isProcessingRef.current = false;
            setIsSpeaking(false);
        }
    }, []);

    // This effect runs once to load voices and set up the listener.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            const loadVoices = () => {
                const loadedVoices = window.speechSynthesis.getVoices();
                if (loadedVoices.length > 0) {
                    setVoices(loadedVoices);
                }
            };
            
            loadVoices(); // Initial attempt
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                if(window.speechSynthesis) {
                   window.speechSynthesis.onvoiceschanged = null;
                   window.speechSynthesis.cancel();
                }
            };
        }
    }, []);

    const speak = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis || !text.trim() || !hasBeenInitialized.current) {
            return;
        }
        
        // If voices haven't loaded, wait a moment and retry. This is a fallback.
        if (voices.length === 0) {
            setTimeout(() => speak(text), 100);
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        
        const voice = voices.find(v => v.name === 'Google UK English Female') ||
                      voices.find(v => v.name.includes("Google") && v.lang.startsWith("en-GB")) ||
                      voices.find(v => v.name.includes("Google") && v.lang.startsWith("en")) ||
                      voices.find(v => v.lang.startsWith("en-GB")) ||
                      voices.find(v => v.lang.startsWith("en")) ||
                      null;
        
        if (voice) utterance.voice = voice;
        utterance.pitch = 1;
        utterance.rate = 1.1;
        
        queueRef.current.push(utterance);
        
        if (!isProcessingRef.current) {
            processQueue();
        }
    }, [processQueue, voices]);

    const cancel = useCallback(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        queueRef.current = [];
        window.speechSynthesis.cancel(); // This will trigger the onerror/onend handlers and reset state.
    }, []);
    
    const initialize = useCallback(() => {
        if (typeof window === 'undefined' || !window.speechSynthesis || hasBeenInitialized.current) {
            return;
        }
        // A silent utterance to unlock audio context in some browsers
        const silentUtterance = new SpeechSynthesisUtterance('');
        silentUtterance.volume = 0;
        window.speechSynthesis.speak(silentUtterance);
        hasBeenInitialized.current = true;
    }, []);

    return { speak, cancel, isSpeaking, initialize };
}
