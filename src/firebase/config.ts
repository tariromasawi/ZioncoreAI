// DO NOT MODIFY. This file is auto-generated and managed by ZionCore.
// Re-anchored to project: still-toolbox-466410-s6

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { initializeFirestore, getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase for sovereign access
let app: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

const isNewApp = !getApps().length;
if (isNewApp) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

auth = getAuth(app);

/**
 * ZIONCORE STABILIZATION: FORCING LONG POLLING
 * This bypasses WebSocket instability to ensure 100% data fidelity.
 */
if (isNewApp) {
  firestore = initializeFirestore(
    app,
    {
      experimentalAutoDetectLongPolling: true,
    },
    firebaseConfig.firestoreDatabaseId
  );
} else {
  firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
}

export { app, auth, firestore };
