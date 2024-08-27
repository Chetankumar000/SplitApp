// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAukT7j8DQsuzqT6w6mKyxj6pXfW1RXmjc",
  authDomain: "split2-5fbb2.firebaseapp.com",
  projectId: "split2-5fbb2",
  storageBucket: "split2-5fbb2.appspot.com",
  messagingSenderId: "592792017356",
  appId: "1:592792017356:web:4a7c2788307093d2c8e569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
