import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxteK1U1XMYjTlQYGXLj38VHPZKe5k2uY",
  authDomain: "learnwithai-e356b.firebaseapp.com",
  projectId: "learnwithai-e356b",
  storageBucket: "learnwithai-e356b.appspot.com",
  messagingSenderId: "1087047577734",
  appId: "1:1087047577734:web:f97891852feb176c3c6107",
  measurementId: "G-EVRKW5VQKB"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
