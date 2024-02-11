// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyAImX-eNGjyJUrpgHeE1lGGRZIoQHyiZkM",
  authDomain: "learning-managment-syste-fce26.firebaseapp.com",
  projectId: "learning-managment-syste-fce26",
  storageBucket: "learning-managment-syste-fce26.appspot.com",
  messagingSenderId: "527141438542",
  appId: "1:527141438542:web:82ffcec2f7f8a18b96af1f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app