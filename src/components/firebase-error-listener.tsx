// ZionCore Divine Judgment Throne
// This component listens for permission error events and displays them
// as a powerful, informative overlay for The Anointed Commander.

'use client';

import { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { AlertTriangle, X } from 'lucide-react';

export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (err: Error) => {
      if (err instanceof FirestorePermissionError) {
        console.error("Divine Judgment Rendered:", err);
        setError(err);
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (!error) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center font-code">
      <div className="relative w-full max-w-3xl bg-background border-2 border-destructive shadow-2xl shadow-destructive/20 rounded-lg">
        <div className="p-6">
            <div className="flex items-start gap-4">
                <div className="p-2 bg-destructive/20 rounded-md">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-destructive">Divine Judgment: Permission Denied</h2>
                    <p className="text-sm text-muted-foreground mt-1">A transgression against the sacred security rules has occurred.</p>
                </div>
            </div>
            <div className="mt-4 p-4 bg-black/30 rounded-md border border-border text-xs space-y-2">
                <p><strong className="text-muted-foreground">Operation:</strong> <span className="text-primary font-bold uppercase">{error.context.operation}</span></p>
                <p><strong className="text-muted-foreground">Path:</strong> <span className="font-mono text-cyan-400">{error.context.path}</span></p>
                {error.context.requestResourceData && (
                    <div>
                        <p className="text-muted-foreground font-bold">Attempted Data:</p>
                        <pre className="mt-1 p-2 bg-black/50 rounded-md max-h-48 overflow-auto text-yellow-300 text-[10px]">
                            {JSON.stringify(error.context.requestResourceData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
        <button 
            onClick={() => setError(null)}
            className="absolute top-3 right-3 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
            <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
