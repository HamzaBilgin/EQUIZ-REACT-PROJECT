import { Button, Card, Modal } from "antd";
import React, { useState } from "react";
import CreateQuizModal from "../instructor/handleQuiz/CreateQuizModal";
import LiveQuizModal from "./LiveQuiz/LiveQuizModal";
import QuizList from "./QuizList";
const quizOperations = [
  {
    id: 1,
    img: "https://static.vecteezy.com/system/resources/thumbnails/005/083/209/small_2x/editable-flat-outline-design-of-quiz-icon-vector.jpg",
    title: "JOIN LIVE QUIZ",
  },
  // {
  //   id: 2,
  //   img: "https://cdn-icons-png.freepik.com/512/10650/10650201.png",
  //   title: "Edit Quiz",
  // },
  // {
  //   id: 3,
  //   img: "https://cdn-icons-png.freepik.com/512/10781/10781634.png",
  //   title: "Delete Quiz",
  // },
];
const Student = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mt-[70px] w-[80%] flex-col items-center justify-center h-auto mx-auto gap-24 ">
      <div className="flex gap-6 w-full justify-center mb-4">
        {quizOperations.map((operation, i) => (
          <Card
            key={i}
            hoverable
            style={{
              width: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            cover={
              operation.img ? (
                <img alt={operation.title} src={operation.img} />
              ) : null
            }
          >
            <Button onClick={showModal}>{operation.title}</Button>
          </Card>
        ))}
        <Modal
          className="text-center"
          title="Create New Quiz"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          {/* <CreateQuizModal handleCancel={handleCancel} /> */}
          <LiveQuizModal handleCancel={handleCancel} />
        </Modal>
      </div>
      <QuizList />
    </div>
  );
};

export default Student;
