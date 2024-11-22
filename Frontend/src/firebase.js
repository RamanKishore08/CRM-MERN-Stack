import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCcV5JVJlljR31Ufn9k_U8NKKQ7EZqBqBc",
  authDomain: "loginpage-b687f.firebaseapp.com",
  projectId: "loginpage-b687f",
  storageBucket: "loginpage-b687f.appspot.com",
  messagingSenderId: "205744000732",
  appId: "1:205744000732:web:4e329b39c597991a312e19",
  measurementId: "G-5H697X793Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth
export const db = getFirestore(app); // Initialize and export Firestore database
