// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAnCejREews4yuw_o7J2zBJO-hBxJHdPk",
    authDomain: "shopease-429216.firebaseapp.com",
    projectId: "shopease-429216",
    storageBucket: "shopease-429216.appspot.com",
    messagingSenderId: "664329070164",
    appId: "1:664329070164:web:26315b9b84ccdb847b2fc1",
    measurementId: "G-Z14VLGGVWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, GoogleAuthProvider, EmailAuthProvider, auth , db}; 