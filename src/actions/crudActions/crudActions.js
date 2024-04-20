import { doc, getDoc } from "firebase/firestore";
import db from "../../FireBasee/Myfirebase";

const getUserFromDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
export default getUserFromDb;
