import React, { useState, useEffect } from "react";
import db from "../../FireBasee/Myfirebase";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";

const QuizList = () => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const getQuizzesByStudentId = async (studentId) => {
      try {
        const q = query(
          collection(db, "quizzesUsers"),
          where("usersAnswer", "array-contains", { studentId: studentId })
        );
        const querySnapshot = await getDocs(q);
        const quizzesData = [];
        querySnapshot.forEach((doc) => {
          quizzesData.push(doc.data());
        });
        setQuizzes(quizzesData);
      } catch (error) {
        console.error("Error getting quizzes by studentId:", error);
      }
    };

    if (userInfo && userInfo.uid) {
      getQuizzesByStudentId(userInfo.uid);
    }
  }, [userInfo]);

  console.log("Quizzes:", quizzes);

  return <div>QuizList</div>;
};

export default QuizList;
