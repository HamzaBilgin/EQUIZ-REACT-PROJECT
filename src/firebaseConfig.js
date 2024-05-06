import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDctEJlsnz8iMMgiDcIOK6dcPdcAfRSBDM",
  authDomain: "equiz-react-baa3e.firebaseapp.com",
  projectId: "equiz-react-baa3e",
  storageBucket: "equiz-react-baa3e.appspot.com",
  messagingSenderId: "973731555592",
  appId: "1:973731555592:web:e9566e27ad9592ef76a4bd",
  measurementId: "G-JPQSS58JZ9",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
// const auth = getAuth();
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     console.log(user);
//   } else {
//     console.log("olmadı");
//   }
// });
export { app, auth };
export default db;
