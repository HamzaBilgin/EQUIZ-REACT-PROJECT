import React from "react";
import { Collapse, Space } from "antd";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ShowAllQuestions = ({ quizInfo }) => {
  console.log(quizInfo);

  return (
    <>
      {quizInfo?.questions?.length === 0 ? (
        <p>List Boş</p>
      ) : (
        <div>
          <Space direction="vertical" className="w-full">
            {quizInfo.questions?.map((question, i) => (
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
