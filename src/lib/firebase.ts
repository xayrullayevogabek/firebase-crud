import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCczrywUTcHAvCxgffhgvky37le8p0aeyI",
  authDomain: "fir-crud-292e3.firebaseapp.com",
  projectId: "fir-crud-292e3",
  storageBucket: "fir-crud-292e3.appspot.com",
  messagingSenderId: "351069958148",
  appId: "1:351069958148:web:87f5b3eb8e2814abf3c551",
  measurementId: "G-LR8XMFEQRP",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)
