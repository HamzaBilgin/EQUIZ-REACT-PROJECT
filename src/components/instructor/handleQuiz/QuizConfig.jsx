import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";

import QuizConfigItem from "./QuizConfigItem";
import ShowAllQuestions from "./ShowAllQuestions";
let initalQuestion = {
  question: "",
  options: [
    { id: "A", value: "" },
    { id: "B", value: "" },
    { id: "C", value: "" },
    { id: "D", value: "" },
  ],
  correctOption: "",
};
const QuizConfig = () => {
  const params = useParams();
  const [showAllQuestion, setShowAllQuestion] = useState(true);
  const [arrayIndex, setArrayIndex] = useState(0);
  const [quizInfo, setQuizInfo] = useState({});
  const [questionInfo, setQuestionInfo] = useState({});

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
    setArrayIndex(index);
  };
  const updateQuestion = (data) => {
    setQuizInfo({
      ...quizInfo,
      questions: quizInfo.questions.map((question, i) =>
        i === arrayIndex ? data : question
      ),
    });
  };
  const addEmptyQuestion = () => {
    setQuizInfo({
      ...quizInfo,
      questions: [...quizInfo?.questions, initalQuestion],
    });
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
              onClick={() => addEmptyQuestion()}
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
              updateQuestion={updateQuestion}
              questionInfo={questionInfo}
              arrayIndex={arrayIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
