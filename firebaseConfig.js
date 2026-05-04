import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Add this import

const firebaseConfig = {
  apiKey: "AIzaSyBusyN-yRkHou80LkVrvsi9cnMFcG1lKWg",
  authDomain: "jgm-sense.firebaseapp.com",
  projectId: "jgm-sense",
  storageBucket: "jgm-sense.firebasestorage.app",
  messagingSenderId: "73095207538",
  appId: "1:73095207538:web:72c59b2561afcd661540eb"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Export this to save user details later
