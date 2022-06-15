import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";


//copy and paste your own firebase config here!


/*const firebaseConfig = {
  apiKey: "************kGlvds2o",

  authDomain: "storage-fireb**********firebaseapp.com",

  projectId: "storage-firebas*******",

  storageBucket: "storage-firebase*******.com",

  messagingSenderId: "****16**9",

  appId: "1:640390************475cc",
}; */ 



import "firebaseui/dist/firebaseui.css";



const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db, auth, provider };
