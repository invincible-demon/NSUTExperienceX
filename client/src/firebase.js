// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nsutexperienex.firebaseapp.com",
  projectId: "nsutexperienex",
  storageBucket: "nsutexperienex.firebasestorage.app",
  messagingSenderId: "458405996413",
  appId: "1:458405996413:web:31073d9f14369b257cce14"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);