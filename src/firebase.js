// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd9W6EAONQTdBekK0V-w-JVLizZmKMX9E",
  authDomain: "chuctetvanh.firebaseapp.com",
  projectId: "chuctetvanh",
  storageBucket: "chuctetvanh.firebasestorage.app",
  messagingSenderId: "1038207234994",
  appId: "1:1038207234994:web:affce09ecb9ef3451ceaab",
  measurementId: "G-G8895L54W8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
