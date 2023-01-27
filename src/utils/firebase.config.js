import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9XGZCWNWzReTurfvyYE51ZNBCzBaKNdc",
  authDomain: "dokodemo-door-0903.firebaseapp.com",
  projectId: "dokodemo-door-0903",
  storageBucket: "dokodemo-door-0903.appspot.com",
  messagingSenderId: "101191210964",
  appId: "1:101191210964:web:819b1e3cc081318eb4e841"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}