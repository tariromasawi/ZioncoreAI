'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useUser(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthState({ user, loading: false });
      },
      (error) => {
        console.error('Firebase auth state error:', error);
        setAuthState({ user: null, loading: false });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return authState;
}
