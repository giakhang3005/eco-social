import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCIr6C50E5S1jX2JOI5NAXBt8GA211mZFY",
    authDomain: "eco-social-f76a1.firebaseapp.com",
    projectId: "eco-social-f76a1",
    storageBucket: "eco-social-f76a1.appspot.com",
    messagingSenderId: "291842583841",
    appId: "1:291842583841:web:7c69d74f9123f2615f6260",
    measurementId: "G-Z4TE7FVQSF"
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