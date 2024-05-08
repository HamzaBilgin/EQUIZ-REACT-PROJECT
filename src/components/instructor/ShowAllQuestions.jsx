import React from "react";
import { Collapse, Space } from "antd";

const ShowAllQuestions = ({ questions }) => {
  console.log(questions);
  return (
    <>
      {questions.length === 0 ? (
        <p>List Boş</p>
      ) : (
        <div>
          <Space direction="vertical" className="w-full">
            {questions.map((question, i) => (
              <Collapse
                key={i}
                collapsible={question.question}
                defaultActiveKey={["1"]}
              >
                <Collapse.Panel key={i} header={`Question ${i + 1}`}>
                  <div>
                    <div>{question.question}</div>
                    {question.options.map((option, index) => (
                      <div key={index}>
                        <div
                          className={`${
                            option.id === question.correctOption &&
                            "bg-green-400"
                          }`}
                        >
                          {option.id}: {option.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </Collapse.Panel>
              </Collapse>
            ))}
          </Space>
        </div>
      )}
    </>
  );
};

export default ShowAllQuestions;
