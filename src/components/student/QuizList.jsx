import React, { useState, useEffect } from "react";
import db from "../../FireBasee/Myfirebase";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAllQuizzesByStudentId } from "../../actions/quizActions/quizActions";

const QuizList = () => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    getQuizList();
  }, [userInfo]);
  const getQuizList = async () => {
    const data = await getAllQuizzesByStudentId(userInfo.uid);
    console.log(data);
    let loadedCategories = [];
    data.forEach((doc) => {
      console.log(doc.studentId.data());
      loadedCategories.push({ id: doc.id, ...doc.studentId.data() });
    });
    console.log(loadedCategories);
  };
  return <div>QuizList</div>;
};

export default QuizList;
