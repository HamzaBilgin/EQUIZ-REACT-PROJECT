import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getQuizInfo, updateQuizInfo } from "../../actions/quizActions";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";
import ShowAllQuestions from "./ShowAllQuestions";
import QuizConfigItem from "./QuizConfigItem";
import QuizConfigDetail from "./QuizConfigDetail";
import { Switch, Tooltip, message } from "antd";
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
  const params = useParams();
  const userInfo = useSelector((state) => state.authReducer.user);
  // console.log(product);
  const [quizInfo, setQuizInfo] = useState(quiz);
  const [arrayIndex, setArrayIndex] = useState(-1);
  const [err, setErr] = useState();
  const [showAllQuestion, setShowAllQuestion] = useState(true);
  const [questionInfo, setQuestionInfo] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(true);
  const infoMessageConfig = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

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
    switch (quiz.statu) {
      case "Incomplete":
        setDisabled(true);
        setChecked(false);
        break;
      case "Pasif":
        setDisabled(false);
        setChecked(false);
        break;
      case "Active":
        setDisabled(false);
        setChecked(true);
        break;
      default:
        setDisabled(true);
        break;
    }
  }, [userInfo]);
  useEffect(() => {
    const fetchData = async () => {
      await updateQuizInfo(params.quizId, quizInfo);
    };
    fetchData();
  }, [quizInfo]);
  useEffect(() => {
    setQuestionInfo(quizInfo.questions[arrayIndex]);
  }, [arrayIndex]);

  if (err)
    return (
      <div>
        Error: <ErrorPage />
      </div>
    );
  const handleLiCLick = (index) => {
    setQuestionInfo(quizInfo.questions[index]);
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
  const updateQuestionArray = (data) => {
    setQuizInfo({
      ...quizInfo,
      questions: quizInfo.questions.map((question, i) =>
        i === arrayIndex ? data : question
      ),
    });
    infoMessageConfig("success", "Question updated");
  };
  const deleteQuestion = (deleteIndex) => {
    const updatedQuestions = quizInfo.questions.filter(
      (_, index) => index !== deleteIndex
    );
    setQuizInfo({
      ...quizInfo,
      questions: updatedQuestions,
    });
    setArrayIndex(deleteIndex - 1);
    infoMessageConfig("success", "Question deleted");
  };
  const onChange = () => {
    setChecked(!checked);
  };
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200 flex justify-between ">
        <div className="h-16 w-1/3  flex items-center">
          <Tooltip
            className="ml-6 flex"
            title="Bu bir örnek tooltip içeriğidir"
          >
            <Switch disabled={disabled} checked={checked} onChange={onChange} />
            <div className="text-center ml-2">
              <span>Statu : {quizInfo.statu}</span>
            </div>
          </Tooltip>
        </div>
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
                {index + 1}.soru
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
            <QuizConfigItem
              questionInfo={questionInfo}
              arrayIndex={arrayIndex}
              updateQuestionArray={updateQuestionArray}
              deleteQuestion={deleteQuestion}
            />
          )}
        </div>
        <div className="w-2/6 p-2 ">
          <QuizConfigDetail
            setQuizInfo={setQuizInfo}
            quizInfo={quizInfo}
            infoMessageConfig={infoMessageConfig}
          />
        </div>
      </div>
      {contextHolder}
    </div>
  );
};

export default QuizConfig;
