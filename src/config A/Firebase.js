// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"

import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCKN-OHZO1ZyeogQrLpaqN7hTP8WQxf4JI",
  authDomain: "fir-course1-93e64.firebaseapp.com",
  projectId: "fir-course1-93e64",
  storageBucket: "fir-course1-93e64.appspot.com",
  messagingSenderId: "726792443525",
  appId: "1:726792443525:web:ea61aabf49e1241e2bfbec",
  measurementId: "G-P0YXWB4M4B"
};

// Initializse Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider =new GoogleAuthProvider();


export const db = getFirestore(app)
