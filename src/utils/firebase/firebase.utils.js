import { initializeApp } from 'firebase/app'
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCekRADtXg_8HG30UeKcrqGOF5UDGidDfs",
    authDomain: "crown-clothing-db-bf69e.firebaseapp.com",
    projectId: "crown-clothing-db-bf69e",
    storageBucket: "crown-clothing-db-bf69e.appspot.com",
    messagingSenderId: "730969682414",
    appId: "1:730969682414:web:3e2be5c648e05fbed2deff"
  };
  

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

   
    const userDocRef = doc(db, 'users', userAuth.uid);

   
    const userSnapshot = await getDoc(userDocRef);     
 

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
          await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });

      } catch(error){
        console.log('error creating the user', error.message);
      }

    }
    return userDocRef;

  };

  export const  createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);

  }

  export const  signInAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);

  }