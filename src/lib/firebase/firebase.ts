import { initializeApp, FirebaseOptions, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(
    auth,
    `http://localhost:${process.env.REACT_APP_EMU_AUTH_PORT || 9099}`,
    { disableWarnings: true }
  );
  connectFirestoreEmulator(
    db,
    "localhost",
    Number(process.env.REACT_APP_EMU_FIRESTORE_PORT) || 8080
  );
}

export { auth, db, googleAuthProvider };
