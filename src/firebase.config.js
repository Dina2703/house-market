// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeWEGLa8s-DJS3JdKctYXglB9Fri3-Aq4",
  authDomain: "house-marketplace-app-d55bd.firebaseapp.com",
  projectId: "house-marketplace-app-d55bd",
  storageBucket: "house-marketplace-app-d55bd.appspot.com",
  messagingSenderId: "594209961960",
  appId: "1:594209961960:web:9deba3e806b8b53aec565d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
