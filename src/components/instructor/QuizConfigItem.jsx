import { React, useEffect, useRef, useState } from "react";
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
const QuizConfigItem = ({
  questionInfo,
  arrayIndex,
  updateQuestionArray,
  deleteQuestion,
  checkQuestionArray,
}) => {
  const [form] = Form.useForm();
  const { question, options, correctOption } = questionInfo;
  const [questionOption, setQuestionOption] = useState(options);
  let initialValues = {
    questionArea: question,
  };
  useEffect(() => {
    setQuestionOption(options);
    form.setFieldsValue({
      questionArea: question,
      correctOption: correctOption.id,
    });
  }, [question, arrayIndex]);

  //handleSubmit area start
  const handleSubmit = (formValues) => {
    const { questionArea, correctOption } = formValues;
    const correctOptionObject = questionOption.find((option) => {
      return option.id === correctOption;
    });
    const questionData = {
      question: questionArea,
      options: questionOption,
      correctOption: correctOptionObject,
    };
    updateQuestionArray(questionData);
  };
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
        form={form}
        className="bg-red-300 w-[700px] h-[400px] p-2"
        {...formItemLayout}
        initialValues={initialValues}
        variant="filled"
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
        }}
      >
        <div className="text-center mb-3">{`${arrayIndex + 1}.Soru`}</div>
        <Form.Item
          label="Question Area"
          name="questionArea"
          rules={[
            {
              required: true,
              message:
                "Soru Alanı Boş Bırakılamaz ve 50 karakterden az olamaz!",
              // min: 50,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="correctOption"
          label="Options"
          rules={[
            {
              required: true,
              message:
                "Soru Alanı Boş Bırakılamaz ve 50 karakterden az olamaz!",
              // min: 50,
            },
          ]}
        >
          <Radio.Group>
            {questionOption.map((option, index) => (
              <Space key={option.id} style={{ marginBottom: 8 }}>
                <Radio key={index} value={option.id} className="h-8">
                  <div className="flex items-center ">
                    <div className="mr-4  w-6">{option.id} :</div>
                    <Input
                      value={option.value}
                      onChange={(e) =>
                        handleInputChange(option.id, e.target.value)
                      }
                    />
                  </div>
                </Radio>
              </Space>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 4,
          }}
        >
          <Space>
            <Button onClick={() => deleteQuestion(arrayIndex)}>
              Delete Question
            </Button>
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
