import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9QGhdqoDNPw7kH_eceE0yxXWddstl8Tw",
  authDomain: "react-machine-test-919b6.firebaseapp.com",
  projectId: "react-machine-test-919b6",
  storageBucket: "react-machine-test-919b6.firebasestorage.app",
  messagingSenderId: "685772871699",
  appId: "1:685772871699:web:f2ad3855191dd3fd60c7e6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);