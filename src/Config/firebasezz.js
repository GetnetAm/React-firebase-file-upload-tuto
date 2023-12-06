import firebase from "firebase/app";

import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCfhLjHqCmvOXpc2XMwOkgkpi5UhJ6mrhs",
  authDomain: "react-class-one.firebaseapp.com",
  projectId: "react-class-one",
  storageBucket: "react-class-one.appspot.com",
  messagingSenderId: "321047840348",
  appId: "1:321047840348:web:db483e6c28d563258bc899"
};


export const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();