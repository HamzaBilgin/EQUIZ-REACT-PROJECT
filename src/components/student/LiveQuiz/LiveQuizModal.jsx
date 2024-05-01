import { Button, Form, Input, Select, Space, message } from "antd";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import db from "../../../FireBasee/Myfirebase";
import { quizInfoActions } from "../../../store/slice/quizInfoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getQuizzesUsersByQuizAndStudentId,
  getQuizzesUsersByQuizId,
} from "../../../actions/quizActions/quizActions";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 14,
    },
  },
};
const LiveQuizModal = ({ handleCancel }) => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = ({ requestLiveQuizId }) => {
    findQuiz(requestLiveQuizId, userInfo.uid)
      .then((data) => {
        const {
          createdAt,
          endingAt,
          category,
          liveQuizId,
          questions,
          quizDuration,
          statu,
          instructorId,
          startAt,
        } = data.docs[0].data();
        dispatch(
          quizInfoActions.setQuizInfo({
            uid: data.docs[0].id,
            instructorId: instructorId.id,
            questions: questions,
            quizDuration: quizDuration,
            startAt: startAt,
          })
        );
        localStorage.setItem(
          "quizInfo",
          JSON.stringify({
            uid: data.docs[0].id,
            instructorId: instructorId.id,
            questions: questions,
            quizDuration: quizDuration,
            startAt: startAt,
          })
        );
        navigate(
          `/student/liveQuiz/${category}/${liveQuizId}/${questions.length}`
        );
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };
  const findQuiz = async (liveQuizId, studentId) => {
    const liveQuizs = collection(db, "quizzes");
    const stateQuery = query(liveQuizs, where("liveQuizId", "==", liveQuizId));
    const quizzesSnapshot = await getDocs(stateQuery);

    const docsLenght = quizzesSnapshot.docs.length;

    return new Promise((resolve, reject) => {
      if (docsLenght === 1) {
        findUserAttendQuiz(quizzesSnapshot.docs[0]?.id, studentId)
          .then((isExisting) => {
            if (isExisting === true) {
              reject("Sınav sonucunuz mevcuttur");
            } else {
              resolve(quizzesSnapshot);
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Quiz Bulunamadı");
      }
    });
  };
  const findUserAttendQuiz = async (quizId, studentId) => {
    // console.log(studentId);
    let isExistQuizResult = false;
    // const quizzesUsersRef = collection(db, "quizzesUsers");
    // const stateQuery2 = query(
    //   quizzesUsersRef,
    //   where("quizId", "==", doc(db, "quizzes", quizId)),
    //   where("studentId", "==", doc(db, "users", studentId))
    // );
    // const quizzesUsersSnapshot = await getDocs(stateQuery2);
    const data = await getQuizzesUsersByQuizAndStudentId(quizId, studentId);
    if (data.empty === false) {
      isExistQuizResult = true;
    }
    // for (const doc of quizzesUsersSnapshot.docs) {
    //   const usersAnswer = doc.data().usersAnswer;
    //   if (usersAnswer) {
    //     isExistQuizResult = usersAnswer.find(
    //       (item) => item.studentId === studentId
    //     );
    //   }
    // }
    return isExistQuizResult;
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        variant="filled"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="requestLiveQuizId"
          label="Quiz Name"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 4,
          }}
        >
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="default" htmlType="submit">
              Create Quiz
            </Button>
          </Space>
        </Form.Item>
        {contextHolder}
      </Form>
    </div>
  );
};

export default LiveQuizModal;
