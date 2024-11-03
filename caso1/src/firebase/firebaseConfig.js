// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANCoMlEyS2aIk8WxWVdQgVn7RzMKmd8ho",
  authDomain: "prueba2-da5fb.firebaseapp.com",
  projectId: "prueba2-da5fb",
  storageBucket: "prueba2-da5fb.appspot.com",
  messagingSenderId: "624110477038",
  appId: "1:624110477038:web:69956d249172216bb1ddff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };