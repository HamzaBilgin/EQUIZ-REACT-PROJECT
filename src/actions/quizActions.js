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
import db, { auth } from "../firebaseConfig";

const createQuiz = async (makeQuiz, liveQuizId) => {
  const now = new Date();
  const data = {
    ...makeQuiz,
    liveQuizId: liveQuizId,
    createdAt: now,
    questions: [],
    statu: "Incomplete",
    instructorId: doc(db, "users", auth.currentUser.uid),
  };
  const docref = await addDoc(collection(db, "quizzes"), data);
  return docref.id;
};

const getQuizInfo = async (quizId) => {
  const docRef = doc(db, "quizzes", quizId);
  return getDoc(docRef)
    .then((docSnap) => docSnap.data())
    .catch((error) => {
      throw error;
    });
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
// Student actions
const getQuizByLiveQuizId = async (liveQuizId) => {
  const liveQuizs = collection(db, "quizzes");
  const stateQuery = query(
    liveQuizs,
    where("liveQuizId", "==", liveQuizId),
    where("statu", "==", "Active")
  );
  const quizzesSnapshot = await getDocs(stateQuery);
  let loadedQuery = [];
  quizzesSnapshot.forEach((doc) => {
    loadedQuery.push({ id: doc.id, ...doc.data() });
  });
  return loadedQuery;
};
const getQuizzesUsersByQuizAndStudentId = async (quizId, studentId) => {
  const quizzesUsersRef = collection(db, "quizzesUsers");
  const stateQuery2 = query(
    quizzesUsersRef,
    where("quizId", "==", doc(db, "quizzes", quizId)),
    where("studentId", "==", doc(db, "users", studentId))
  );
  const quizzesUsersSnapshot = await getDocs(stateQuery2);
  return quizzesUsersSnapshot;
};

const addQuizzesUsers = async (quizId, instructorId, studentId) => {
  const data = {
    quizId: doc(db, "quizzes", quizId),
    instructorId: doc(db, "users", instructorId),
    studentId: doc(db, "users", studentId),
  };
  const docref = await addDoc(collection(db, "quizzesUsers"), data);
  return docref.id;
};
export {
  createQuiz,
  getQuizInfo,
  updateQuizInfo,
  getAllQuizByInstructorId,
  deleteQuizById,
  deleteQuizzesUsers,
  getQuizByLiveQuizId,
  getQuizzesUsersByQuizAndStudentId,
  addQuizzesUsers,
};
