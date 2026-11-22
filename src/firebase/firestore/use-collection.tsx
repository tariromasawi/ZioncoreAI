'use client';

import { useState, useEffect, useRef } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit,
  type Query,
  type CollectionReference,
  type DocumentData,
} from 'firebase/firestore';
import { firestore } from '@/firebase/config';

interface CollectionState<T> {
  data: T[] | null;
  loading: boolean;
  error: Error | null;
}

// A simple hook to listen to a collection.
// For more complex queries, this would need to be expanded.
export function useCollection<T extends DocumentData>(
  collectionName: string | null | undefined
): CollectionState<T> {
  const [state, setState] = useState<CollectionState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!collectionName) {
      setState({ data: [], loading: false, error: null });
      return;
    }

    const collectionRef = collection(firestore, collectionName) as CollectionReference<T>;
    
    const unsubscribe = onSnapshot(
      collectionRef,
      (querySnapshot) => {
        const data: T[] = [];
        querySnapshot.forEach((doc) => {
          // Note: The document ID is not included by default.
          // To include it, you would need to do: { id: doc.id, ...doc.data() }
          data.push(doc.data());
        });
        setState({ data, loading: false, error: null });
      },
      (error) => {
        console.error(`Error fetching collection ${collectionName}:`, error);
        setState({ data: null, loading: false, error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [collectionName]);

  return state;
}
