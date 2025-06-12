import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import firebaseConfig from "./config";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// This sets the persistence to local, so the user stays signed in.
setPersistence(auth, browserLocalPersistence);

export default app; 