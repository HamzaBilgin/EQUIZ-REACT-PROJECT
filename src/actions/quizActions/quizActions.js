import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../FireBasee/Myfirebase";

const getQuizInfo = async (quizId) => {
  try {
    const docRef = doc(db, "quizzes", quizId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {
    console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
    throw error;
  }
};
const updateQuizInfo = async (quizId, quizInfo) => {
  try {
    const quizRef = doc(db, "quizzes", quizId);
    await updateDoc(quizRef, quizInfo);
    return true;
  } catch (error) {
    console.error("Güncelleme işlemi sırasında bir hata oluştu:", error);
    throw error;
  }
};
const getAllQuizByInstructorId = async (instructorId) => {
  const q = query(
    collection(db, "quizzes"),
    where("instructorId", "==", doc(db, "users", instructorId))
  );
  const querySnapshot = await getDocs(q);
  let loadedProducts = [];
  querySnapshot.forEach((doc) => {
    loadedProducts.push({ id: doc.id, ...doc.data() });
  });
  return loadedProducts;
};
const deleteQuizById = async (id) => {
  await deleteDoc(doc(db, "quizzes", id));
};
export {
  getQuizInfo,
  updateQuizInfo,
  getAllQuizByInstructorId,
  deleteQuizById,
};
