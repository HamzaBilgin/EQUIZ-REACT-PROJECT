import { Button, Form, Input, Select, Space, message } from "antd";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import db from "../../../FireBasee/Myfirebase";
import { quizInfoActions } from "../../../store/slice/quizInfoSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = ({ requestLiveQuizId }) => {
    findQuiz(requestLiveQuizId)
      .then((data) => {
        console.log(data.docs[0].data());
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

    // const q = query(
    //   collection(db, "quizzesUsers"),
    //   where("quizId", "==", doc(db, "quizzes", quizzesSnapshot.docs[0].id))
    // );
    // const querySnapshot = await getDocs(q);
    return new Promise((resolve, reject) => {
      if (docsLenght === 1) {
        resolve(quizzesSnapshot);
      } else {
        reject("Beklenmeyen hata");
      }
    });
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
