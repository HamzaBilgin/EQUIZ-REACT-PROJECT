import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBocS5pndSgrYOfyPAZjNA3Bnm6Q3F4Fr8",
  authDomain: "equiz-b5f1a.firebaseapp.com",
  projectId: "equiz-b5f1a",
  storageBucket: "equiz-b5f1a.appspot.com",
  messagingSenderId: "35330954445",
  appId: "1:35330954445:web:c229a05c55f355b9e1c584",
  measurementId: "G-BV3T1XFT8X",
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
