import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useId, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";
import { Button } from "antd";
import QuizConfigItem from "./QuizConfigItem";
import QuizQuestion from "./QuizQuestion";

const QuizConfig = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizInfo, setQuizInfo] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      console.log(params.quizId);
      const docRef = doc(db, "quizzes", params.quizId);
      const docSnap = await getDoc(docRef);
      setQuizInfo(docSnap.data());
      console.log(docSnap.data());
    };

    fetchData(); // fetchData fonksiyonunu çağırın
  }, []);

  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200">
        <div className="flex justify-between">
          <div className=" w-1/3">Category : Kimya</div>
          <div className="text-center w-1/3">QUIZ NAME</div>
          <div className="text-end w-1/3">Live Quiz Id : DAWDAWD</div>
        </div>

        <div className="flex justify-around mt-5">
          <div>Statu : False</div>
          <div>Quiz Duration : 60dk</div>
        </div>
      </div>
      <div className="mt-5 flex">
        <div className="bg-slate-200 w-1/6 ">
          <div className="text-center p-2">ALL</div>
          <ul className="text-center">
            {quizInfo.questions?.map((item, index) => (
              <li key={index} className="cursor-pointer">
                {index}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button className=" py-1 px-6 hover:bg-red-200 hover">
              Add Question
            </button>
          </div>
        </div>
        <div className="w-5/4 p-2">
          <QuizConfigItem />
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
