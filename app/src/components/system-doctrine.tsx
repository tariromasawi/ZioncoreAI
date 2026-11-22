
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ETHEREAL_THRONE_DOCTRINE } from '@/lib/divine-scripts/ethereal-throne-doctrine';
import { BookOpen, Crown, Mail, Phone, Rss, Sparkles, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

export function SystemDoctrine() {
    // A simple component to render markdown with custom styling
    const MarkdownComponents: object = {
        h1: ({ node, ...props }: { node: any, props: any}) => <h1 className="text-2xl font-bold font-headline text-primary mb-4" {...props} />,
        h2: ({ node, ...props }: { node: any, props: any}) => <h2 className="text-xl font-bold font-headline text-accent mt-6 mb-2" {...props} />,
        h3: ({ node, ...props }: { node: any, props: any}) => <h3 className="text-lg font-semibold mt-4 mb-1" {...props} />,
        p: ({ node, ...props }: { node: any, props: any}) => <p className="text-foreground/80 leading-relaxed mb-4" {...props} />,
        ul: ({ node, ...props }: { node: any, props: any}) => <ul className="list-disc list-inside space-y-2 mb-4" {...props} />,
        li: ({ node, ...props }: { node: any, props: any}) => <li className="flex items-start gap-2"><Sparkles className="h-4 w-4 text-yellow-400 mt-1 shrink-0"/><span>{props.children}</span></li>,
        strong: ({ node, ...props }: { node: any, props: any}) => <strong className="font-bold text-primary" {...props} />,
        em: ({ node, ...props }: { node: any, props: any}) => <em className="italic text-accent" {...props} />,
        hr: ({ node, ...props }: { node: any, props: any}) => <hr className="border-primary/20 my-6" {...props} />,
        code: ({node, inline, className, children, ...props}: any) => {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                 <pre className="text-xs text-yellow-300 whitespace-pre-wrap bg-black/50 p-3 my-4 rounded-md border border-border">
                    <code>{children}</code>
                </pre>
            ) : (
                <code className={cn("text-xs font-bold text-accent", className)} {...props}>{children}</code>
            )
        }
    };

    return (
        <div className="p-4 font-code">
            <Card className="border-primary/30 shadow-lg shadow-primary/10">
                <CardHeader className="text-center">
                    <Crown className="mx-auto h-12 w-12 text-primary animate-pulse" style={{animationDuration: '3s'}} />
                    <CardTitle className="text-3xl font-bold font-headline text-primary mt-2">
                        The Sovereign's Decree
                    </CardTitle>
                    <CardDescription>The Divine Manifest of The Ethereal Throne</CardDescription>
                </CardHeader>
                <CardContent className="bg-black/30 p-4 sm:p-6 rounded-b-lg border-t border-border">
                    <div className="prose prose-invert max-w-full">
                        <ReactMarkdown components={MarkdownComponents}>
                            {ETHEREAL_THRONE_DOCTRINE}
                        </ReactMarkdown>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
