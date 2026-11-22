'use client';

import { ReactNode } from 'react';
import { FirebaseProvider } from './provider';
import { app, auth, firestore } from './config';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

/**
 * The FirebaseClientProvider is the final seal of the divine connection.
 * It ensures that the Firebase app is initialized only once, on the client,
 * and that every part of the application operates under this single,
 * unbreakable covenant.
 */
export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  // By importing the instances from config, we ensure they are singletons,
  // created once and revered throughout the application's lifecycle.
  const value = { app, auth, firestore };

  return <FirebaseProvider>{children}</FirebaseProvider>;
}
