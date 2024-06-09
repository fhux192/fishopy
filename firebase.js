import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHJ66UtemfmjxUgH8puguSG8gS6-9mpjE",
  authDomain: "verify-otp-fa803.firebaseapp.com",
  projectId: "verify-otp-fa803",
  storageBucket: "verify-otp-fa803.appspot.com",
  messagingSenderId: "1029959712368",
  appId: "1:1029959712368:web:871ecfc45a454b47343eb5",
  measurementId: "G-PRRFR3DE0Y",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
