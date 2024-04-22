import { React, useState } from "react";
import { Form, Input, Radio, Space, Button, Select } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
const QuizQuestion = ({ handleCancel }) => {
  const [questionOption, setQuestionOption] = useState([
    { id: "A", value: "", correct: false },
    { id: "B", value: "", correct: false },
    { id: "C", value: "", correct: false },
    { id: "D", value: "", correct: false },
  ]);
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
  const handleSubmit = (formValues) => {
    const questionData = {
      category: formValues.category,
      question: formValues.questionArea,
      options: questionOption,
    };
    onsubmit(questionData);
  };
  //handleSubmit area end
  const handleInputChange = (id, newValue) => {
    const newOptions = questionOption.map((option) => {
      if (option.id === id) {
        return { ...option, value: newValue };
      }
      return option;
    });
    setQuestionOption(newOptions);
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
        label="Ders"
        name="category"
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
        label="Question Area"
        name="questionArea"
        rules={[
          {
            required: true,
            message: "Soru Alanı Boş Bırakılamaz ve 50 karakterden az olamaz!",
            min: 50,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Radio.Group name="radiogroup" defaultValue={1}>
        <Space direction="vertical">
          {questionOption.map((option) => (
            <Space key={option.id}>
              <Radio value={option.id}>{option.id}</Radio>
              <Form.Item
                name={option.id}
                rules={[
                  {
                    required: true,
                    message: "Cevap seçenekleri boş bırakılamaz!",
                  },
                ]}
                style={{
                  marginBottom: 0,
                  width: 600,
                }}
              >
                <Input
                  value={option.value}
                  onChange={(e) => handleInputChange(option.id, e.target.value)}
                />
              </Form.Item>
            </Space>
          ))}
        </Space>
      </Radio.Group>
      <Form.Item
        wrapperCol={{
          offset: 14,
          span: 4,
        }}
      >
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="default" htmlType="submit">
            Add Question
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default QuizQuestion;
