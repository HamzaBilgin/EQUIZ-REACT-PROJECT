import { React, useEffect, useState } from "react";
import { Form, Input, Radio, Space, Button, Select } from "antd";
import { Option } from "antd/es/mentions";

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
const QuizConfigItem = ({ addQuestion, questionInfo }) => {
  const { question, options } = questionInfo;
  const [selectedOption, setSelectedOption] = useState("B");
  const [questionOption, setQuestionOption] = useState([
    { id: "A", value: "", correct: false },
    { id: "B", value: "", correct: false },
    { id: "C", value: "", correct: false },
    { id: "D", value: "", correct: false },
  ]);

  useEffect(() => {
    // const radioId = options?.find((item) => {
    //   return item.correct === true;
    // });
    // setSelectedOption(radioId.id);
    // setQuestionOption(options);
  }, [options]);
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
    const updatedOptions = questionOption.map((option) => {
      if (option.id === selectedOption) {
        return { ...option, correct: true };
      } else {
        return { ...option, correct: false };
      }
    });
    const questionData = {
      question: formValues.questionArea,
      options: updatedOptions,
    };

    addQuestion(questionData);
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
    <div>
      <Form
        className="bg-red-300 w-[700px] h-[400px] p-2"
        {...formItemLayout}
        variant="filled"
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        <div className="text-center mb-3">1.Soru</div>
        <Form.Item
          label="Question Area"
          name="questionArea"
          rules={[
            {
              required: true,
              message:
                "Soru Alanı Boş Bırakılamaz ve 50 karakterden az olamaz!",
              min: 50,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Options"
          style={{ marginBottom: 0 }} // Add margin bottom style
        >
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            {questionOption.map((option) => (
              <Space key={option.id} style={{ marginBottom: 8 }}>
                <Radio value={option.id}>{option.id}</Radio>
                <Form.Item
                  name={option.id}
                  rules={[
                    {
                      required: true,
                      message: "Option cannot be empty!",
                    },
                  ]}
                  style={{ marginBottom: 0 }} // Adjust width and add margin bottom style
                >
                  <Input
                    value={option.value}
                    onChange={(e) =>
                      handleInputChange(option.id, e.target.value)
                    }
                  />
                </Form.Item>
              </Space>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 4,
          }}
        >
          <Space>
            <Button>Cancel</Button>
            <Button type="default" htmlType="submit">
              Add Question
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuizConfigItem;
