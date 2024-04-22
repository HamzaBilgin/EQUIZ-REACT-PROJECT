import { doc, getDoc } from "firebase/firestore";
import React, { useId } from "react";
import { useParams } from "react-router-dom";
import db from "../../../FireBasee/Myfirebase";

const QuizConfig = () => {
  //   const params = useParams();
  //   console.log(params.quizId);

  //   const getQuizFromDb = async () => {
  //     const docRef = doc(db, "quizzes", params.quizId);
  //     const docSnap = await getDoc(docRef);
  //     console.log(docSnap.data());
  //     return docSnap.data();
  //   };
  //   console.log(getQuizFromDb());
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
        <div className="bg-slate-200 w-1/6 p-2">Questions</div>
        <div className="w-5/4 p-2">QuestionsDetail</div>
      </div>
    </div>
  );
};

export default QuizConfig;
