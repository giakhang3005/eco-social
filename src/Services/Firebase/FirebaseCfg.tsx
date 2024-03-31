import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
    measurementId: process.env.REACT_APP_FIRE_BASE_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

// Initialize Firestore
const firestoreDB = getFirestore(app);

// Ref to Collections
const usersCollectionRef = collection(firestoreDB, 'Users')

export { auth, provider, firestoreDB, usersCollectionRef }