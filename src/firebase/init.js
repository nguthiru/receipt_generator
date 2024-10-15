// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOI3QyMz-Ay5KHqexzJlXUEt6dp7FGhrQ",
  authDomain: "topmark-contractors.firebaseapp.com",
  projectId: "topmark-contractors",
  storageBucket: "topmark-contractors.appspot.com",
  messagingSenderId: "189785456327",
  appId: "1:189785456327:web:7798597dc2463a74a9c8e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
