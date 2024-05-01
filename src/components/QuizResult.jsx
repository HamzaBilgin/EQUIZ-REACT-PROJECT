import { CarryOutOutlined } from "@ant-design/icons";
import { Flex, Progress, Tooltip, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const QuizResult = () => {
  const quizResult = useSelector((state) => state.quizResultReducer.quizResult);
  const { questionsAnswer, categoryName, quizTimer, elapsedTime } = quizResult;

  const [treeData, setTreeData] = useState([]);
  const [emptyQuestions, setEmptyQuestions] = useState([]);
  const [correctQuestions, setCorrectQuestions] = useState([]);
  const [wrongQuestions, setWrongQuestions] = useState([]);

  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctPercentage, setCorrectPercentage] = useState(0);
  const [wrongPercentage, setWrongPercentage] = useState(0);
  const [elapsedTimePercentage, setElapsedTimePercentage] = useState(0);

  useEffect(() => {
    const checkAnswers = () => {
      const emptyQ = [];
      const correctQ = [];
      const wrongQ = [];

      let wrongCount = 0;

      questionsAnswer.forEach((question, index) => {
        if (question.answer?.id === undefined) {
          emptyQ.push({ ...question, answer: "No Answer", questionNo: index });
        } else if (question.answer?.id === question.correctOption?.id) {
          correctQ.push({ ...question, questionNo: index });
        } else {
          wrongQ.push({ ...question, questionNo: index });
          wrongCount++;
        }
      });

      // İstatistik verilerini güncelle
      setTotalQuestions(questionsAnswer.length);
      setCorrectPercentage(
        ((correctQ.length / totalQuestions) * 100).toFixed(2)
      );
      setWrongPercentage((wrongCount / totalQuestions) * 100);
      setElapsedTimePercentage(
        ((elapsedTime / quizTimer / 60) * 100).toFixed(2)
      );

      setEmptyQuestions(emptyQ);
      setCorrectQuestions(correctQ);
      setWrongQuestions(wrongQ);
      const treeDataArray = [
        { array: correctQ, title: "Correct Answers", key: "correctAnswers" },
        { array: wrongQ, title: "Wrong Answers", key: "wrongAnswers" },
        { array: emptyQ, title: "Empty Answers", key: "emptyAnswers" },
      ];

      const treeData2222 = treeDataArray.reduce((value, treeData) => {
        const { array, title, key } = treeData;
        return [...value, configTreeData(array, title, key)];
      }, []);

      setTreeData(treeData2222);
    };

    // Quiz sonuçlarını kontrol et
    checkAnswers();
  }, [questionsAnswer, totalQuestions]);
  const onSelect = (selectedKeys, info) => {};
  const answeredQuestions = correctPercentage + wrongPercentage;
  const configTreeData = (array, title, key) => {
    let initial = {
      title: title,
      key: key,
      icon: <CarryOutOutlined />,
      children: [],
    };
    array.map((item, index) => {
      const { answer, correctOption, question, options, questionNo } = item;

      initial = {
        ...initial,
        children: [
          ...initial.children,
          {
            title: `Question : ${questionNo}`,
            key: questionNo,
            icon: <CarryOutOutlined />,
            children: [
              {
                title: (
                  <>
                    <div>{question}</div>
                    <div>{`Correct answer : ${correctOption.id}) ${correctOption.value}`}</div>
                    <div>{`Your answer :  ${
                      answer.id === undefined
                        ? answer
                        : `${answer.id}) ${answer.value}`
                    }`}</div>
                  </>
                ),
                key: `${questionNo}-${questionNo}`,
              },
            ],
          },
        ],
      };
    });
    return initial;
  };
  return (
    <div className="mt-[70px] w-[90%] h-full mx-auto flex flex-col justify-center items-center">
      <div>
        <div className=" flex  h-[160px]">
          <div className="w-1/3 flex flex-col items-center justify-around">
            <div>Correct Answer/Total question</div>
            <Flex gap="small" wrap="wrap">
              <Tooltip
                title={`${correctQuestions.length} correct / ${wrongQuestions.length} wrong / ${questionsAnswer.length} total`}
              >
                <Progress
                  percent={answeredQuestions}
                  success={{
                    percent: correctPercentage,
                  }}
                  type="circle"
                />
              </Tooltip>
            </Flex>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-around">
            <div>Spended Time/Total Time</div>
            <div>
              <Progress type="circle" percent={elapsedTimePercentage} />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-around">
            <div>Skor/100</div>
            <Progress type="circle" percent={correctPercentage} />
          </div>
        </div>
        <div className="mt-6">
          <Tree showIcon onSelect={onSelect} treeData={treeData} />
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
