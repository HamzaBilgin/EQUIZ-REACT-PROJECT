import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";

import QuizConfigItem from "./QuizConfigItem";
import ShowAllQuestions from "./ShowAllQuestions";
let initalQuestion = {
  question: "",
  options: [
    { id: "A", value: "", correct: false },
    { id: "B", value: "", correct: false },
    { id: "C", value: "", correct: false },
    { id: "D", value: "", correct: false },
  ],
};
const QuizConfig = () => {
  const [showAllQuestion, setShowAllQuestion] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionInfo, setQuestionInfo] = useState({});
  const [quizInfo, setQuizInfo] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "quizzes", params.quizId);
      const docSnap = await getDoc(docRef);
      setQuizInfo(docSnap.data());
    };

    fetchData();
  }, []);
  const handleLiCLick = (index) => {
    setShowAllQuestion(false);
    setQuestionInfo(quizInfo.questions[index]);
  };
  const addQuestion = (data) => {
    setQuizInfo({ ...quizInfo, questions: [...quizInfo.questions, data] });
  };

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
          <div
            className="text-center p-2 cursor-pointer"
            onClick={() => setShowAllQuestion(true)}
          >
            ALL
          </div>
          <ul className="text-center">
            {quizInfo.questions?.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer"
                onClick={() => handleLiCLick(index)}
              >
                {index}
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              className=" py-1 px-6 hover:bg-red-200 hover"
              onClick={() => addQuestion(initalQuestion)}
            >
              Add Question
            </button>
          </div>
        </div>
        <div className="w-5/4 p-2">
          {showAllQuestion ? (
            <ShowAllQuestions />
          ) : (
            <QuizConfigItem
              addQuestion={addQuestion}
              questionInfo={questionInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
