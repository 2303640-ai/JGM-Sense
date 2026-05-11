import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import


const firebaseConfig = {
  apiKey: "AIzaSyCfen2YeAMkRqWrhyoQ7t0Oxnjs0zf02pw",
  authDomain: "jgm-sense-bbed9.firebaseapp.com",
  projectId: "jgm-sense-bbed9",
  storageBucket: "jgm-sense-bbed9.firebasestorage.app",
  messagingSenderId: "864904306291",
  appId: "1:864904306291:web:852e2c8151067b610e5406"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Export this to save user details later
