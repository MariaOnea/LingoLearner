
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyDk52DXN7nEVjQjQ6wnf3FUG2rTPNvxvFw",
  authDomain: "lingolearner-5687c.firebaseapp.com",
  projectId: "lingolearner-5687c",
  storageBucket: "lingolearner-5687c.appspot.com",
  messagingSenderId: "279320632220",
  appId: "1:279320632220:web:94131638b4672e69808659",
  measurementId: "G-LMR0DZ2QF4"
};


const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);