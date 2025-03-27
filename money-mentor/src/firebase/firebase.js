// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3W_w2-DKQYC-ZX9C1suA6rOL5pE5iAeI",
  authDomain: "moneymentor-cc776.firebaseapp.com",
  projectId: "moneymentor-cc776",
  storageBucket: "moneymentor-cc776.firebasestorage.app",
  messagingSenderId: "89266457316",
  appId: "1:89266457316:web:591772f4cf4df26ef53af1",
  measurementId: "G-EDWMJLX3BX",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }

