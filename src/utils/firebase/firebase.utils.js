import { initializeApp } from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCekRADtXg_8HG30UeKcrqGOF5UDGidDfs",
    authDomain: "crown-clothing-db-bf69e.firebaseapp.com",
    projectId: "crown-clothing-db-bf69e",
    storageBucket: "crown-clothing-db-bf69e.appspot.com",
    messagingSenderId: "730969682414",
    appId: "1:730969682414:web:3e2be5c648e05fbed2deff"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();