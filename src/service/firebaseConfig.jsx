// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsxrrXZ63e3CaWcoKJgNCsrmIDcSMHYaM",
  authDomain: "mytrip-1c68c.firebaseapp.com",
  projectId: "mytrip-1c68c",
  storageBucket: "mytrip-1c68c.firebasestorage.app",
  messagingSenderId: "615108816660",
  appId: "1:615108816660:web:8bbb369934fcd82a48dc01",
  measurementId: "G-DY3CDNDYME"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

