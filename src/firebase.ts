// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKAuuqFNVlTAhRhNV35pL36DtW3ZGxIRw",
    authDomain: "hey-raiseyourhand.firebaseapp.com",
    databaseURL: "https://hey-raiseyourhand-default-rtdb.firebaseio.com",
    projectId: "hey-raiseyourhand",
    storageBucket: "hey-raiseyourhand.firebasestorage.app",
    messagingSenderId: "456669479142",
    appId: "1:456669479142:web:e7a362f203b64892ed3b27",
    measurementId: "G-YGEPPSHNJ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;