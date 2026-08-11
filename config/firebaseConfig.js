// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "inspira-decora.firebaseapp.com",
  projectId: "inspira-decora",
  storageBucket: "inspira-decora.firebasestorage.app",
  messagingSenderId: "978663987057",
  appId: "1:978663987057:web:280ce46a92e5d5289c48d0",
  measurementId: "G-T2YSLFVVKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)