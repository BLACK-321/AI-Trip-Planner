// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOkryGcaLluhCSXEJmiFGL8TmYsDuhUXg",
  authDomain: "ai-trip-planner-eed5b.firebaseapp.com",
  projectId: "ai-trip-planner-eed5b",
  storageBucket: "ai-trip-planner-eed5b.firebasestorage.app",
  messagingSenderId: "17170777217",
  appId: "1:17170777217:web:bf484dcdd6af765b0db980",
  measurementId: "G-DR341FG8TB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =  getFirestore(app);
const analytics = getAnalytics(app);