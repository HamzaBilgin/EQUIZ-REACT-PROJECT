import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { getQuizInfo } from "../../actions/quizActions";
import { useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";

const QuizConfig = () => {
  const params = useParams();
  const userInfo = useSelector((state) => state.authReducer.user);
  // console.log(product);
  const [quizInfo, setQuizInfo] = useState({});
  const [err, setErr] = useState();
  useEffect(() => {
    getData(userInfo)
      .then((item) => {
        setQuizInfo(item);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [userInfo]);
  if (err)
    return (
      <div>
        Error: <ErrorPage />
      </div>
    );
  const getData = async (user) => {
    // const user = auth.currentUser;
    console.log(user);
    const quiz = await getQuizInfo(params.quizId);

    if (!quiz) {
      const error = new Error("Quiz bulunamadı");
      error.code = 0;
      console.log(error);
      throw error;
    }

    if (quiz.instructorId.id === user) {
      return quiz;
    } else {
      const error = new Error("Bu quiz'e erişim izniniz yok");
      error.code = 1;

      throw error;
    }
  };
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <div className="bg-slate-200 flex justify-between">
        <div className="h-16 w-1/3"></div>
        <div className="h-16 w-1/3  flex justify-center items-center">
          QuizName
        </div>

        <div className="h-16 w-1/3 text-end">{`Live Quiz Id : adwawd`}</div>
      </div>
      <div className="mt-5 flex">
        <div className="bg-slate-200 w-1/6 ">
          <div className="text-center p-2 cursor-pointer">ALL</div>
          <ul className="text-center">
            <li className="cursor-pointer">a</li>
          </ul>
          <div className="flex justify-center">
            <button className=" py-1 px-6 hover:bg-red-200 hover">
              Add Question
            </button>
          </div>
        </div>
        <div className="w-3/6 p-2 ">adawd</div>
        <div className="w-2/6 p-2 bg-red-200">adwawdawd</div>
      </div>
    </div>
  );
};

export default QuizConfig;
