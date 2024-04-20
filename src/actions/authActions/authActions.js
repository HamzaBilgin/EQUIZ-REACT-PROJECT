import { doc, setDoc } from "firebase/firestore";
import db, { auth } from "../../FireBasee/Myfirebase";
import getUserFromDb from "../crudActions/crudActions";

async function loginUser(values) {
  const userCredentials = await auth.signInWithEmailAndPassword(
    values.user.email,
    values.user.password
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
export { loginUser, createUserIntoDb };
