import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG0eOy3-yajpmnieGygkbDHT68wgbD31c",
  authDomain: "crudoperation-6f32b.firebaseapp.com",
  projectId: "crudoperation-6f32b",
  storageBucket: "crudoperation-6f32b.appspot.com",
  messagingSenderId: "884307263231",
  appId: "1:884307263231:web:41ee0ec7a99f68694596ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const imgDB = getStorage(app);

export {auth, db, imgDB}