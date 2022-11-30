// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn6fOfZ9AZdq9w0l6ZhCdrgGTFzJcUPFI",
  authDomain: "blog-e2750.firebaseapp.com",
  projectId: "blog-e2750",
  storageBucket: "blog-e2750.appspot.com",
  messagingSenderId: "204366380253",
  appId: "1:204366380253:web:302d15d35c3118a985af34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app);