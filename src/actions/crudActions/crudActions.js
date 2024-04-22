import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../FireBasee/Myfirebase";

const getUserFromDb = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
const updateUser = async (uid, newPassword) => {
  try {
    const user = await getUserFromDb(uid);
    if (!user) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      password: newPassword,
    });

    return {
      ...user,
      password: newPassword,
    };
  } catch (error) {
    console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
    throw error;
  }
};
export { getUserFromDb, updateUser };
