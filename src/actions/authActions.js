import { doc, setDoc } from "firebase/firestore";
import { getUserFromDb } from "./crudActions";
import db, { auth } from "../firebaseConfig";

async function loginUser(email, password) {
  const userCredentials = await auth.signInWithEmailAndPassword(
    email,
    password
  );

  const user = userCredentials.user;
  console.log(user);
  const dbdata = await getUserFromDb(user.uid);
  return dbdata;
}

async function createUserIntoDb(user, password, handleRegistrationError) {
  auth
    .createUserWithEmailAndPassword(user.email, password)
    .then((userCredential) => {
      const newUser = userCredential.user;

      addUserToFirestore(newUser.uid, user, password);
    })
    .catch((error) => {
      handleRegistrationError(error);
    });
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

export { loginUser, createUserIntoDb, changePassword };
