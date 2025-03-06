
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHRpBbO8i9L1SpYgnBCXgNN7yaa6HCDIQ",
  authDomain: "stylevista-1f2e1.firebaseapp.com",
  projectId: "stylevista-1f2e1",
  storageBucket: "stylevista-1f2e1.firebasestorage.app",
  messagingSenderId: "225043245017",
  appId: "1:225043245017:web:833c0e9587e590eeaddbc8",
  measurementId: "G-DVGHV3JVMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);