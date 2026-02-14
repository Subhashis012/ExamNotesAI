import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "examnotes-37316.firebaseapp.com",
  projectId: "examnotes-37316",
  storageBucket: "examnotes-37316.firebasestorage.app",
  messagingSenderId: "805699884324",
  appId: "1:805699884324:web:ce2bafb0d2621997298fb1"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };