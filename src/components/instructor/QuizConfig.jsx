import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getQuizInfo } from "../../actions/quizActions";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";
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
  const quiz = useLoaderData();

  const userInfo = useSelector((state) => state.authReducer.user);
  // console.log(product);
  const [quizInfo, setQuizInfo] = useState(quiz);
  const [arrayIndex, setArrayIndex] = useState(-1);
  const [err, setErr] = useState();
  const [showAllQuestion, setShowAllQuestion] = useState(true);
  useEffect(() => {
    if (!quiz) {
      const error = new Error("Quiz bulunamadı");
      error.code = 0;
      console.log(error);
      setErr(error);
    }

    if (quiz.instructorId.id !== userInfo) {
      const error = new Error("Bu quiz'e erişim izniniz yok");
      error.code = 1;

      setErr(error);
    }
  }, [userInfo]);
  if (err)
    return (
      <div>
        Error: <ErrorPage />
      </div>
    );
  const handleLiCLick = (index) => {
    console.log(index);
    setShowAllQuestion(false);
    setArrayIndex(index);
  };
  const addEmptyQuestion = () => {
    setQuizInfo({
      ...quizInfo,
      questions: [...quizInfo.questions, initalQuestion],
    });
  };
  const seeAllQuestionsFunk = () => {
    setShowAllQuestion(true);
    setArrayIndex(-1);
  };
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200 flex justify-between ">
        <div className="h-16 w-1/3"></div>
        <div className="h-16 w-1/3  flex justify-center items-center">
          {quiz.quizName}
        </div>

        <div className="h-16 w-1/3 text-end">{`Live Quiz Id : ${quiz.liveQuizId}`}</div>
      </div>
      <div className="mt-5 flex ">
        <div className=" w-1/6 flex flex-col items-center">
          <div
            className={`text-center p-2 cursor-pointer  w-4/5 mb-2 rounded-full border-2 hover:bg-lime-500 ${
              showAllQuestion && "bg-yellow-500"
            }`}
            onClick={seeAllQuestionsFunk}
          >
            SEE ALL QUESTION
          </div>
          <ul className="text-center flex flex-col justify-center items-center w-1/2 ">
            {quizInfo.questions.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer mb-2 w-full rounded-full hover:bg-lime-500 ${
                  arrayIndex === index && "bg-lime-200"
                }`}
                onClick={() => handleLiCLick(index)}
              >
                xzcszs
              </li>
            ))}
          </ul>

          <button
            className=" py-1 px-6 mt-2 w-4/5 rounded-full border-2  hover:bg-lime-500"
            onClick={() => addEmptyQuestion()}
          >
            Add Question
          </button>
        </div>
        <div className="w-3/6 p-2 ">
          {showAllQuestion ? (
            <ShowAllQuestions questions={quizInfo.questions} />
          ) : (
            <div>{arrayIndex + 1}</div>
          )}
        </div>
        <div className="w-2/6 p-2 bg-red-200">adwawdawd</div>
      </div>
    </div>
  );
};

export default QuizConfig;
