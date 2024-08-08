// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJUVVRGUQ92tR3d4WZBcGgFfVywmB2ui0",
  authDomain: "inventory-management-8ab49.firebaseapp.com",
  projectId: "inventory-management-8ab49",
  storageBucket: "inventory-management-8ab49.appspot.com",
  messagingSenderId: "1007172202214",
  appId: "1:1007172202214:web:750ee2bd848ae8f9b45527"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);