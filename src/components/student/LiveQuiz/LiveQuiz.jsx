import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { quizResultActions } from "../../../store/slice/quizResultSlice";
import QuestionCard from "./QuestionCard";
import { Button, Modal } from "antd";
import Timer from "./Timer";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import db from "../../../FireBasee/Myfirebase";
import {
  addQuizzesUsers,
  getQuizzesUsersByQuizAndStudentId,
  getQuizzesUsersByQuizId,
} from "../../../actions/quizActions/quizActions";
import { useNavigate } from "react-router-dom";
const LiveQuiz = () => {
  const [count, setCount] = useState(0);
  const quizInfo = useSelector((state) => state.quizInfoReducer.quizInfo);
  const [questionsAnswers, setQuestionsAnswers] = useState([]);
  const { uid, questions, quizDuration, instructorId } = quizInfo;
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [finishQuiz, setFinishQuiz] = useState({ state: false, type: "" });
  const [startTime, setStartTime] = useState(null);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   firstCommit();
  // }, []);
  useEffect(() => {
    firstCommit();
    setStartTime(new Date());
  }, []);
  const firstCommit = async () => {
    const id = await addQuizzesUsers(quizInfo.uid, instructorId, userInfo.uid);
    setId(id);
  };
  const updateQuizAnswers = async () => {
    const endTime = new Date();
    const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
    try {
      const quizzesUsersRef = doc(db, "quizzesUsers", id);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(quizzesUsersRef);

        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }

        // const currentArray = [];

        // currentArray.push({
        //   elapsedTime: elapsedTimeInSeconds,
        //   answers: [...questionsAnswers],
        // });

        transaction.update(quizzesUsersRef, {
          userAnswer: {
            elapsedTime: elapsedTimeInSeconds,
            answers: [...questionsAnswers],
          },
        });
      });

      dispatch(
        quizResultActions.setResult({
          questionsAnswer: [...questionsAnswers],

          quizTimer: quizInfo.quizDuration,
          elapsedTime: elapsedTimeInSeconds,
        })
      );
      localStorage.setItem(
        "quizResultLocal",
        JSON.stringify({
          questionsAnswer: [...questionsAnswers],

          quizTimer: quizInfo.quizDuration,
          elapsedTime: elapsedTimeInSeconds,
        })
      );
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  };
  // const updateQuizAnswers = async () => {
  //   const data = await getQuizzesUsersByQuizId(uid);
  //   const endTime = new Date();
  //   const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
  //   try {
  //     const quizzesUsersRef = doc(db, "quizzesUsers", data[0].id);
  //     await runTransaction(db, async (transaction) => {
  //       const sfDoc = await transaction.get(quizzesUsersRef);

  //       if (!sfDoc.exists()) {
  //         throw "Document does not exist!";
  //       }

  //       const currentArray = sfDoc.data().usersAnswer || [];
  //       const studentIndex = currentArray.findIndex(
  //         (item) => item.studentId === userInfo.uid
  //       );

  //       if (studentIndex !== -1) {
  //         const updatedStudentAnswers = {
  //           ...currentArray[studentIndex],
  //           elapsedTime: elapsedTimeInSeconds,
  //           answers: [...questionsAnswers],
  //         };
  //         currentArray[studentIndex] = updatedStudentAnswers;
  //       } else {
  //         currentArray.push({
  //           studentId: userInfo.uid,
  //           elapsedTime: elapsedTimeInSeconds,
  //           answers: [...questionsAnswers],
  //         });
  //       }

  //       transaction.update(quizzesUsersRef, { usersAnswer: currentArray });
  //     });

  //     dispatch(
  //       quizResultActions.setResult({
  //         questionsAnswer: [...questionsAnswers],

  //         quizTimer: quizInfo.quizDuration,
  //         elapsedTime: elapsedTimeInSeconds,
  //       })
  //     );
  //     localStorage.setItem(
  //       "quizResultLocal",
  //       JSON.stringify({
  //         questionsAnswer: [...questionsAnswers],

  //         quizTimer: quizInfo.quizDuration,
  //         elapsedTime: elapsedTimeInSeconds,
  //       })
  //     );
  //   } catch (e) {
  //     console.log("Transaction failed: ", e);
  //   }
  // };
  useEffect(() => {
    const { uid, questions, quizDuration, instructorId } = quizInfo;

    setQuestionsAnswers(
      questions.map((item) => (item = { ...item, answer: {} }))
    );
  }, [quizInfo]);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("Your exam results are being processed, please wait.");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      updateQuizAnswers();
      navigate(`/student/quiz/result`);
      // finishQuizInfo();
      setConfirmLoading(false);
    }, 2000);
  };
  const finishQuizInfo = () => {
    const endTime = new Date();
    const elapsedTimeInSeconds = Math.floor((endTime - startTime) / 1000);
    dispatch(
      quizResultActions.setResult({
        questionsAnswer: [...questionsAnswers],

        quizTimer: quizInfo.quizDuration,
        elapsedTime: elapsedTimeInSeconds,
      })
    );
    localStorage.setItem(
      "quizResultLocal",
      JSON.stringify({
        questionsAnswer: [...questionsAnswers],

        quizTimer: quizInfo.quizDuration,
        elapsedTime: elapsedTimeInSeconds,
      })
    );
  };
  useEffect(() => {
    const { statu, type } = finishQuiz;
    if (statu) {
      if (type === "timer") {
        setModalText("Knock,knock. Hands up ! Time is up !");
      } else {
        setModalText("You are about to finish the quiz. Do you confirm");
      }
      showModal(true);
    }
  }, [finishQuiz]);

  const handleNext = () => {
    if (count < questions.length - 1) {
      setCount(count + 1);
    }
  };

  const handlePrevious = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="mt-[70px] w-[90%] h-full mx-auto flex flex-col justify-center items-center  relative bg-blue-200">
      <div className="w-5/6 text-2xl  h-12 mt-5 text-center flex justify-center items-center  mb-5">
        <span>Question -{count + 1}</span>
      </div>
      <div className="w-5/6 flex  ">
        <QuestionCard
          count={count}
          setQuestionsAnswers={setQuestionsAnswers}
          questionsAnswers={questionsAnswers}
        />
        <div className="w-1/6 right-0  flex justify-center items-center">
          <div className=" w-1/2 h-1/3 flex flex-col justify-around items-center">
            <Timer quizInfo={quizInfo} setFinishQuiz={setFinishQuiz} />
            <button
              className="text-2xl text-red-600 hover:bg-red-200  py-2 px-2 rounded-md"
              onClick={() => setFinishQuiz({ statu: true, type: "button" })}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
      <div className="  flex justify-around w-full my-5">
        <Button onClick={handlePrevious} disabled={count <= 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={count >= questions.length - 1}>
          Next
        </Button>
      </div>
      <Modal
        title="Attention !"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        closable={false}
        // onCancel={handleCancel}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{
          className: "ant-btn-default",
          style: {
            color: "rgba(0, 0, 0, 0.88)",
          },
          children: "Custom Ok Text",
        }}
      >
        <p>{modalText}</p>
      </Modal>
    </div>
  );
};

export default LiveQuiz;
