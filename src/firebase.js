
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCfhLjHqCmvOXpc2XMwOkgkpi5UhJ6mrhs",
  authDomain: "react-class-one.firebaseapp.com",
  databaseURL: "https://react-class-one-default-rtdb.firebaseio.com",
  projectId: "react-class-one",
  storageBucket: "react-class-one.appspot.com",
  messagingSenderId: "321047840348",
  appId: "1:321047840348:web:bce5a4094dbe61e78bc899"
};


const app = initializeApp(firebaseConfig);

export const db =getFirestore(app);
export const storage= getStorage(app);