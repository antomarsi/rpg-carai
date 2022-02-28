import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import firebaseConfig from "./firebase_config.json";

initializeApp(firebaseConfig as FirebaseOptions);

const auth = getAuth();
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, `http://localhost:9099`, { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { auth, db, googleAuthProvider };
