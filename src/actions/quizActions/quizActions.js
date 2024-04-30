import {
  addDoc,
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
  let loadedQuery = [];
  querySnapshot.forEach((doc) => {
    loadedQuery.push({ id: doc.id, ...doc.data() });
  });
  return loadedQuery;
};
const deleteQuizById = async (id) => {
  await deleteDoc(doc(db, "quizzes", id));
};
const firstCommitToQuizzesUsers = async (quizId, instructorId) => {
  const docRef = await addDoc(collection(db, "quizzesUsers"), {
    quizId: doc(db, "quizzes", quizId),
    instructorId: doc(db, "users", instructorId),
  });
};
const deleteQuizzesUsers = async (quizId) => {
  const q = query(
    collection(db, "quizzesUsers"),
    where("quizId", "==", doc(db, "quizzes", quizId))
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};
const getQuizzesUsersByQuizId = async (uid) => {
  const quizzesUsersRef = collection(db, "quizzesUsers");
  const stateQuery = query(
    quizzesUsersRef,
    where("quizId", "==", doc(db, "quizzes", uid))
  );
  const querySnapshot = await getDocs(stateQuery);
  let loadedQuery = [];
  querySnapshot.forEach((doc) => {
    loadedQuery.push({ id: doc.id, ...doc.data() });
  });
  return loadedQuery;
};
export {
  getQuizInfo,
  updateQuizInfo,
  getAllQuizByInstructorId,
  deleteQuizById,
  firstCommitToQuizzesUsers,
  deleteQuizzesUsers,
  getQuizzesUsersByQuizId,
};
