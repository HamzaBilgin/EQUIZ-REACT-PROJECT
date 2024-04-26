import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { quizResultActions } from "../../../store/slice/quizResultSlice";
import QuestionCard from "./QuestionCard";
import { Button } from "antd";
import Timer from "./Timer";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import db from "../../../FireBasee/Myfirebase";
const LiveQuiz = () => {
  const [count, setCount] = useState(0);
  const quizInfo = useSelector((state) => state.quizInfoReducer.quizInfo);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const { uid, questions, quizDuration, instructorId } = quizInfo;
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);

  useEffect(() => {
    const { uid, questions, quizDuration, instructorId } = quizInfo;
    // firstCommitToQuizzes(uid);
    setQuestionsAnswers(
      questions.map((item) => (item = { ...item, answer: {} }))
    );
  }, [quizInfo, userInfo]);

  const finishQuiz = () => {};
  // const firstCommitToQuizzes = async (uid) => {
  //   const quizzesUsersRef = collection(db, "quizzesUsers");
  //   const stateQuery = query(
  //     quizzesUsersRef,
  //     where("quizId", "==", doc(db, "quizzes", uid))
  //   );
  //   const querySnapshot = await getDocs(stateQuery);

  //   if (querySnapshot.empty) {
  //     let docData = {
  //       quizId: doc(db, "quizzes", uid),
  //       instructorId: doc(db, "users", instructorId),
  //       studentAnswers: [
  //         { studentId: doc(db, "users", userInfo.uid), answers: [] },
  //       ],
  //     };
  //     const docRef = await addDoc(collection(db, "quizzesUsers"), docData);
  //   } else {
  //     try {
  //       const quizzesUsersRef = doc(
  //         db,
  //         "quizzesUsers",
  //         querySnapshot.docs[0].id
  //       );
  //       await runTransaction(db, async (transaction) => {
  //         const sfDoc = await transaction.get(quizzesUsersRef);

  //         if (!sfDoc.exists()) {
  //           throw "Document does not exist!";
  //         }
  //         const currentArray = sfDoc.data().usersAnswer || [];
  //         const newArray = [
  //           ...currentArray,
  //           {
  //             studentId: doc(db, "users", userInfo.uid),
  //             answers: [...questionsAnswers],
  //           },
  //         ];
  //         transaction.update(quizzesUsersRef, { usersAnswer: newArray });
  //       });
  //     } catch (e) {
  //       console.log("Transaction failed: ", e);
  //     }
  //   }
  // };
  const handleNext = () => {
    if (count < questions.length - 1) {
      setCount(count + 1);
    }
  };

  const handlePrevious = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="mt-[70px] w-[90%] h-full mx-auto flex flex-col justify-center items-center  relative bg-blue-200">
      <div className="w-5/6 text-2xl  h-12 mt-5 text-center flex justify-center items-center  mb-5">
        <span>Question -{count + 1}</span>
      </div>
      <div className="w-5/6 flex  ">
        <QuestionCard
          count={count}
          setQuestionsAnswers={setQuestionsAnswers}
          questionsAnswers={questionsAnswers}
          // updateAnswers={updateAnswers}
        />
        <div className="w-1/6 right-0  flex justify-center items-center">
          <div className=" w-1/2 h-1/3 flex flex-col justify-around items-center">
            <Timer quizInfo={quizInfo} />
            <button className="text-2xl text-red-600 hover:bg-red-200  py-2 px-2 rounded-md">
              Finish
            </button>
          </div>
        </div>
      </div>
      <div className="  flex justify-around w-full my-5">
        <Button onClick={handlePrevious} disabled={count <= 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={count >= questions.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default LiveQuiz;
