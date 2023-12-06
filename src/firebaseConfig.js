
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAzNRqUmFbkmQhL2-oW85p12pnreIN6hS8",
  authDomain: "r-class-one.firebaseapp.com",
  projectId: "r-class-one",
  storageBucket: "r-class-one.appspot.com",
  messagingSenderId: "777040738089",
  appId: "1:777040738089:web:d60a9bcf14aa9dd3426938"
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const db= getFirestore(app);
export const auth =getAuth(app);