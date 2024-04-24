import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";

import QuizConfigItem from "./QuizConfigItem";
import ShowAllQuestions from "./ShowAllQuestions";
import { Button, Switch } from "antd";
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
  const onChange = (checked) => {
    setQuizInfo({
      ...quizInfo,
      statu: checked,
    });
  };
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
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200">
        <div className="flex justify-between">
          <div className=" w-1/3">Category : {quizInfo.category}</div>
          <div className="text-center w-1/3">{quizInfo.quizName}</div>
          <div className="text-end w-1/3">
            Live Quiz Id : {quizInfo.liveQuizId}
          </div>
        </div>

        <div className="flex justify-around mt-5">
          <div className=" w-1/3">
            Statu :
            <Switch
              checked={quizInfo.statu}
              onChange={onChange}
              className="ml-4"
            />
          </div>
          <div className=" w-1/3 flex justify-center">
            <Button type="primary" onClick={saveQuiz}>
              Save Quiz
            </Button>
          </div>
          <div className=" w-1/3 text-end">
            Quiz Duration : {quizInfo.quizDuration}dk
          </div>
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
        <div className="w-5/6 p-2 ">
          {showAllQuestion ? (
            <ShowAllQuestions quizInfo={quizInfo} />
          ) : (
            <QuizConfigItem
              updateQuestion={updateQuestion}
              questionInfo={questionInfo}
              arrayIndex={arrayIndex}
              deleteQuestion={deleteQuestion}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
