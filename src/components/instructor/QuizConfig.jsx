import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Switch, Tooltip } from "antd";
import ErrorPage from "../../pages/ErrorPage";
import ShowAllQuestions from "./ShowAllQuestions";
import QuizConfigItem from "./QuizConfigItem";
import QuizConfigDetail from "./QuizConfigDetail";
import { updateQuizInfo } from "../../actions/quizActions";

let initialQuestion = {
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
  const [quizInfo, setQuizInfo] = useState(quiz);
  const [arrayIndex, setArrayIndex] = useState(-1);
  const [err, setErr] = useState();
  const [showAllQuestion, setShowAllQuestion] = useState(true);
  const [questionInfo, setQuestionInfo] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const [statuInfo, setStatuInfo] = useState({});

  const infoMessageConfig = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const checkQuestionArray = (data) => {
    return data.options.some((option) => option.value === "");
  };

  const changeStatuInfo = (statutype) => {
    switch (statutype) {
      case "Incomplete":
        setStatuInfo({ disabled: true, checked: false, type: "Incomplete" });
        break;
      case "Pasif":
        setStatuInfo({ disabled: false, checked: false, type: "Pasif" });
        break;
      case "Active":
        setStatuInfo({ disabled: false, checked: true, type: "Active" });
        break;
      default:
        setStatuInfo({ disabled: false, checked: false, type: "Pasif" });
        break;
    }
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
    changeStatuInfo(quiz.statu);
  }, [userInfo]);

  useEffect(() => {
    let data;
    let initialStatus;
    const result = quizInfo.questions.some(checkQuestionArray);
    console.log(result);
    if (result) {
      initialStatus = "Incomplete";
    } else {
      console.log(statuInfo.statu);
      console.log(quizInfo.statu);
      if (quizInfo.statu === "Active") {
        initialStatus = "Active";
      } else {
        initialStatus = "Pasif";
      }
    }

    data = { ...quizInfo, statu: initialStatus };
    changeStatuInfo(initialStatus);
    const updateStatu = async () => {
      await updateQuizInfo(params.quizId, data);
    };
    updateStatu();
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

  const handleLiClick = (index) => {
    setQuestionInfo(quizInfo.questions[index]);
    setShowAllQuestion(false);
    setArrayIndex(index);
  };

  const addEmptyQuestion = () => {
    const newQuizInfo = {
      ...quizInfo,
      questions: [...quizInfo.questions, initialQuestion],
      statu: "Inactive",
    };
    setQuizInfo(newQuizInfo);
    changeStatuInfo("Inactive");
  };

  const seeAllQuestionsFunk = () => {
    setShowAllQuestion(true);
    setArrayIndex(-1);
  };

  const updateQuestionArray = (data) => {
    const isEmpty = checkQuestionArray(data);
    if (isEmpty) {
      infoMessageConfig("error", "Nooo");
    } else {
      const updatedQuizInfo = {
        ...quizInfo,
        questions: quizInfo.questions.map((question, i) =>
          i === arrayIndex ? data : question
        ),
        statu: "Pasif",
      };
      setQuizInfo(updatedQuizInfo);
      changeStatuInfo("Pasif");
      infoMessageConfig("success", "Question updated");
    }
  };

  const deleteQuestion = (deleteIndex) => {
    const updatedQuestions = quizInfo.questions.filter(
      (_, index) => index !== deleteIndex
    );
    const updatedQuizInfo = {
      ...quizInfo,
      questions: updatedQuestions,
    };
    setQuizInfo(updatedQuizInfo);
    setArrayIndex(deleteIndex - 1);
    infoMessageConfig("success", "Question deleted");
  };

  const onChange = () => {
    const newStatus = quizInfo.statu === "Active" ? "Pasif" : "Active";

    setStatuInfo({ ...statuInfo, checked: newStatus === "Active" });
    setQuizInfo({
      ...quizInfo,
      statu: newStatus,
    });
  };

  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200 flex justify-between ">
        <div className="h-16 w-1/3 flex items-center">
          <Tooltip
            className="ml-6 flex"
            title={`${
              quizInfo.statu === "Incomplete"
                ? `Some questions are not completed`
                : ""
            }`}
          >
            <Switch
              disabled={statuInfo.disabled}
              checked={statuInfo.checked}
              onChange={onChange}
            />
            <div className="text-center ml-2">
              <span>Statu : {statuInfo.type}</span>
            </div>
          </Tooltip>
        </div>
        <div className="h-16 w-1/3 flex justify-center items-center">
          {quiz.quizName}
        </div>
        <div className="h-16 w-1/3 text-end">{`Live Quiz Id : ${quiz.liveQuizId}`}</div>
      </div>
      <div className="mt-5 flex ">
        <div className="w-1/6 flex flex-col items-center">
          <div
            className={`text-center p-2 cursor-pointer w-4/5 mb-2 rounded-full border-2 hover:bg-lime-500 ${
              showAllQuestion && "bg-yellow-500"
            }`}
            onClick={seeAllQuestionsFunk}
          >
            SEE ALL QUESTION
          </div>
          <ul className="text-center flex flex-col justify-center items-center w-1/2">
            {quizInfo.questions.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer mb-2 w-full rounded-full hover:bg-lime-500 ${
                  checkQuestionArray(item) ? "text-red-600" : "text-black"
                } ${arrayIndex === index && "bg-lime-200"}`}
                onClick={() => handleLiClick(index)}
              >
                {index + 1}.soru
              </li>
            ))}
          </ul>
          <button
            className="py-1 px-6 mt-2 w-4/5 rounded-full border-2 hover:bg-lime-500"
            onClick={addEmptyQuestion}
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
              checkQuestionArray={checkQuestionArray}
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
