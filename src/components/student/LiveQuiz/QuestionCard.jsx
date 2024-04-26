import { Radio, Space } from "antd";
import React, { useEffect, useState } from "react";

const QuestionCard = ({ setQuestionsAnswers, questionsAnswers, count }) => {
  const [value, setValue] = useState(questionsAnswers[count]?.answer);

  useEffect(() => {
    setValue(questionsAnswers[count]?.answer);
  }, [count]);
  const onChange = (e) => {
    setValue(e.target.value);
    setQuestionsAnswers(
      questionsAnswers.map((item, index) => {
        if (index === count) {
          return { ...item, answer: e.target.value };
        }
        return item;
      })
    );
  };

  return (
    <div className="questionCard w-5/6 mt-5">
      <div className="w-full pl-12 h-12">
        {questionsAnswers[count]?.question}
      </div>
      <Radio.Group
        onChange={onChange}
        value={value}
        className="pl-12 box-border  w-full"
      >
        <Space direction="vertical ">
          {questionsAnswers[count]?.options?.map((option, index) => (
            <Radio
              key={index}
              value={option}
              className="answerOptions min-w-36 text-xl items-center mb-2  py-2 pr-5 border-y-2 border-r-2 border-transparent rounded-r-full  hover:border-white"
            >
              {option.id} : {option.value}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default QuestionCard;
