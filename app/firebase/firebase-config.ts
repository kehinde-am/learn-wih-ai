// firebase-config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbySbnQqawF3dxHcrEgVzujvILaq4E9UQ",
  authDomain: "learnwithai-729e4.firebaseapp.com",
  projectId: "learnwithai-729e4",
  storageBucket: "learnwithai-729e4.appspot.com",
  messagingSenderId: "1011876918537",
  appId: "1:1011876918537:web:d7f9952fdba5f3e1f48fd8",
  measurementId: "G-3D7376SVXL",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
