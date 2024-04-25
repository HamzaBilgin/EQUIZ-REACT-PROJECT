import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";

import QuizConfigItem from "./QuizConfigItem";
import ShowAllQuestions from "./ShowAllQuestions";
import { Button, Switch } from "antd";
import QuizSubmit from "./QuizSubmit";
import {
  getQuizInfo,
  updateQuizInfo,
} from "../../../actions/quizActions/quizActions";
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
      const dbdata = await getQuizInfo(params.quizId);
      setQuizInfo(dbdata);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await updateQuizInfo(params.quizId, quizInfo);
    };
    fetchData();
  }, [quizInfo]);

  const handleLiCLick = (index) => {
    setShowAllQuestion(false);
    setQuestionInfo(quizInfo.questions[index]);
    setArrayIndex(index);
  };
  const updateQuestionArray = (data) => {
    setQuizInfo({
      ...quizInfo,
      questions: quizInfo.questions.map((question, i) =>
        i === arrayIndex ? data : question
      ),
    });
  };
  const deleteQuestion = (deleteIndex) => {
    const updatedQuestions = quizInfo.questions.filter(
      (_, index) => index !== deleteIndex
    );
    setQuizInfo({
      ...quizInfo,
      questions: updatedQuestions,
    });
  };
  const addEmptyQuestion = () => {
    setQuizInfo({
      ...quizInfo,
      questions: [...quizInfo?.questions, initalQuestion],
    });
  };
  const saveQuiz = async () => {
    const quizRef = doc(db, "quizzes", params.quizId);
    await updateDoc(quizRef, quizInfo);
  };
  const updateQuiz = async (value) => {
    setQuizInfo({
      ...quizInfo,
      ...value,
    });
  };
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200 flex justify-between">
        <div className="h-16 w-1/3"></div>
        <div className="h-16 w-1/3  flex justify-center items-center">
          {quizInfo.quizName}
        </div>

        <div className="h-16 w-1/3 text-end">{`Live Quiz Id : ${quizInfo.liveQuizId}`}</div>
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
        <div className="w-3/6 p-2 ">
          {showAllQuestion ? (
            <ShowAllQuestions quizInfo={quizInfo} />
          ) : (
            <QuizConfigItem
              updateQuestionArray={updateQuestionArray}
              questionInfo={questionInfo}
              arrayIndex={arrayIndex}
              deleteQuestion={deleteQuestion}
            />
          )}
        </div>
        <div className="w-2/6 p-2 bg-red-200">
          <QuizSubmit
            setQuizInfo={setQuizInfo}
            quizInfo={quizInfo}
            saveQuiz={saveQuiz}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
