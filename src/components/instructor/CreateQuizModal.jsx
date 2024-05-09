import { Form, Input, Space, Button, Select, DatePicker } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate } from "react-router-dom";
import { doc } from "firebase/firestore";
import db from "../../firebaseConfig";
import { useSelector } from "react-redux";
import { createQuiz } from "../../actions/quizActions";

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
    console.log(makeQuiz);
    const randomData = generateRandomData();
    const id = await createQuiz(
      { ...makeQuiz, startAt: makeQuiz.startAt.format("YYYY-MM-DD HH:mm:ss") },
      randomData
    );
    navigate(`/instructor/${id}/makeQuizConfig`);
  };

  function generateRandomData() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    const length = 8;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
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
        name={["makeQuiz", "quizDuration"]}
        label="Quiz Duration(dk)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name={["makeQuiz", "startAt"]} label="Start Date" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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
