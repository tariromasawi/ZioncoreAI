'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, type DocumentData } from 'firebase/firestore';
import { firestore } from '@/firebase/config';

interface DocState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// A hook to listen to a single document.
export function useDoc<T extends DocumentData>(
  path: string,
  docId: string | null | undefined
): DocState<T> {
  const [state, setState] = useState<DocState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!path || !docId) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const docRef = doc(firestore, path, docId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setState({ data: docSnap.data() as T, loading: false, error: null });
        } else {
          setState({ data: null, loading: false, error: null });
        }
      },
      (error) => {
        console.error(`Error fetching document ${path}/${docId}:`, error);
        setState({ data: null, loading: false, error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [path, docId]);

  return state;
}
