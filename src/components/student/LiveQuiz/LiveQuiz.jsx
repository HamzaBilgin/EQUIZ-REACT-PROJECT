import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { addQuizzesUsers } from "../../../actions/quizActions";
import useTimer from "../../../common/Timer";

const LiveQuiz = () => {
  const userInfo = useSelector((state) => state.authReducer.user);
  const quizInfo = useSelector((state) => state.quizInfoReducer.quizInfo);
  const { instructorId, questions, quizDuration, startAt, uid } = quizInfo;

  const leftTimeInfo = useTimer(startAt, 0);
  const { hours, minutes, seconds, statu } = leftTimeInfo;

  if (statu) {
    return (
      <div className="mt-[70px] w-[90%] h-[600px] h-full mx-auto flex flex-col pt-[200px]  items-center  relative bg-blue-200">
        {hours}:{minutes}:{seconds}
      </div>
    );
  }

  // const firstCommit = async () => {
  //   const id = await addQuizzesUsers(uid, instructorId, userInfo);
  // };
  return (
    <div className="mt-[70px] w-[80%] flex-col items-center justify-center h-auto mx-auto gap-24">
      LiveQuiz
    </div>
  );
};

export default LiveQuiz;
