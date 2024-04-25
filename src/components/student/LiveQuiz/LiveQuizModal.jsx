import { Button, Form, Input, Select, Space, message } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import db from "../../../FireBasee/Myfirebase";
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

  const onFinish = ({ requestLiveQuizId }) => {
    console.log(requestLiveQuizId);
    findQuiz(requestLiveQuizId)
      .then((data) => {})
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
        resolve("Giriş başarılı");
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
