// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const googleAuthProvider = new GoogleAuthProvider()

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(
    auth,
    `http://localhost:${process.env.NEXT_PUBLIC_FIREBASE_EMU_AUTH_PORT || 9099}`
  );
  connectFirestoreEmulator(
    db,
    "localhost",
    Number(process.env.NEXT_PUBLIC_FIREBASE_EMU_FIRESTORE_PORT) || 8080
  );
  connectStorageEmulator(
    storage,
    "localhost",
    Number(process.env.NEXT_PUBLIC_FIREBASE_EMU_FIRESTORE_PORT) || 9199
  );
}

export { auth, db, storage, googleAuthProvider, signInWithPopup, signOut };
