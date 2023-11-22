// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDVZ8OSjoHCMUriaPFfSU6--VmRDgqJnGg",
  authDomain: "medicalrecs-b820c.firebaseapp.com",
  projectId: "medicalrecs-b820c",
  storageBucket: "medicalrecs-b820c.appspot.com",
  messagingSenderId: "532339582842",
  appId: "1:532339582842:web:6e3e8f7c22ee859119d8c3",
  measurementId: "G-KTSJFQFVLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);