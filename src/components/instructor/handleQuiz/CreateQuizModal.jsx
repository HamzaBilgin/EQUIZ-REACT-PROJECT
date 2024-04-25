import { React, useState } from "react";
import { Form, Input, Radio, Space, Button, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc } from "firebase/firestore";
import db from "../../../FireBasee/Myfirebase";
import { useSelector } from "react-redux";

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
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const CreateQuizModal = ({ handleCancel }) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  //category area start
  const categories = [
    { label: "Türkçe", value: "turkce" },
    { label: "Matematik", value: "matematik" },
    { label: "Kimya", value: "kimya" },
    { labe: "Fizik", value: "Fizik" },
    { label: "Biyoloji", value: "biyoloji" },
  ];
  const { option } = Select;
  //category area end

  //handleSubmit area start
  const handleSubmit = async ({ makeQuiz }) => {
    const randomData = generateRandomData();
    const now = new Date();
    const docRef = await addDoc(collection(db, "quizzes"), {
      ...makeQuiz,
      liveQuizId: randomData,
      createdAt: now,
      questions: [],
      statu: false,
      instructorId: doc(db, "users", userInfo.uid),
    });

    navigate(`/instructor/${docRef.id}/makeQuizConfig`);
  };

  function generateRandomData() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    const length = 8; // 8 haneli olacak

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  return (
    <Form
      {...formItemLayout}
      variant="filled"
      onFinish={handleSubmit}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name={["makeQuiz", "quizName"]}
        label="Quiz Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Category"
        name={["makeQuiz", "category"]}
        rules={[
          {
            required: true,
            message: "Kategori alanı boş geçilemez",
          },
        ]}
      >
        <Select placeholder="Kategori Seçiniz ">
          {categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.label}
            </Option>
          ))}
        </Select>
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
    </Form>
  );
};

export default CreateQuizModal;
