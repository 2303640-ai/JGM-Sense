import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "jgm-sense.firebaseapp.com",
  projectId: "jgm-sense",
  storageBucket: "jgm-sense.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

// EXPORT AUTH (The 'export' keyword is the most important part!)
export const auth = getAuth(app);