import { doc, setDoc } from "firebase/firestore";
import { getUserFromDb } from "./crudActions";
import db, { auth } from "../firebaseConfig";
import store from "../store/store";
import { authActions } from "../store/slice/authSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const dbdata = await getUserFromDb(user.uid);
    store.dispatch(authActions.login(dbdata));
    localStorage.setItem("user", JSON.stringify(dbdata));
    return dbdata;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}
async function logoutUser() {
  try {
    await auth.signOut();

    store.dispatch(authActions.logout());

    localStorage.clear();

    return true;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
}
// localStorage.clear();
async function createUserIntoDb(newUser, password, handleRegistrationError) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      password
    );
    const registeredUser = userCredential.user;
    addUserToFirestore(registeredUser.uid, newUser, password);
    return registeredUser;
  } catch (error) {
    handleRegistrationError(error);
    throw error;
  }
}
//change password
async function changePassword(password, newPassword) {
  const user = auth.currentUser;
  user
    .updatePassword(newPassword)
    .then(() => {
      console.log("Şifre başarıyla değiştirildi.");
    })
    .catch((error) => {
      console.error("Şifre değiştirme hatası:", error);
    });
  return user;
}

async function addUserToFirestore(uid, user, password) {
  const docData = {
    uid: uid,
    password: password,
    ...user,
  };
  await setDoc(doc(db, "users", uid), docData);
}

export { loginUser, logoutUser, createUserIntoDb, changePassword };
