// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp, getApps, getApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  // apiKey: "AIzaSyDOOT_RJcW-KVNcgHz0XswK9G1H70GL4LY",
  // authDomain: "qirave-saas.firebaseapp.com",
  // projectId: "qirave-saas",
  // storageBucket: "qirave-saas.appspot.com",
  // messagingSenderId: "334743570067",
  // appId: "1:334743570067:web:07631f7d81d53da9966f66",
  // measurementId: "G-938KKZ0LMK"
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
