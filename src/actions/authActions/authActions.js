import { doc, setDoc } from "firebase/firestore";
import db, { auth } from "../../FireBasee/Myfirebase";
import { getUserFromDb } from "../crudActions/crudActions";

async function loginUser(email, password) {
  const userCredentials = await auth.signInWithEmailAndPassword(
    email,
    password
  );

  const user = userCredentials.user;
  const dbdata = await getUserFromDb(user.uid);
  return dbdata;
}
// register actions
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
async function addUserToFirestore(uid, user, password) {
  const docData = {
    uid: uid,
    password: password,
    ...user,
  };
  await setDoc(doc(db, "users", uid), docData);
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
export { loginUser, createUserIntoDb, changePassword };
