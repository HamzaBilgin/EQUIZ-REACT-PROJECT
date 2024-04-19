import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBocS5pndSgrYOfyPAZjNA3Bnm6Q3F4Fr8",
  authDomain: "equiz-b5f1a.firebaseapp.com",
  projectId: "equiz-b5f1a",
  storageBucket: "equiz-b5f1a.appspot.com",
  messagingSenderId: "35330954445",
  appId: "1:35330954445:web:c229a05c55f355b9e1c584",
  measurementId: "G-BV3T1XFT8X",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
export { auth };

const app = initializeApp(firebaseConfig);
export { app };
const db = getFirestore(app);
export default db;

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app); // Firestore nesnesini alın
// // const auth = firebase.auth();
// // const provider = new firebase.auth.GoogleAuthProvider();

// export default db;
