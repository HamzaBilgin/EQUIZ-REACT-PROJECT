import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteQuizById,
  deleteQuizzesUsers,
  getAllQuizByInstructorId,
} from "../../actions/quizActions";

const QuizList = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const navigate = useNavigate();
  const handleChange = (filters) => {
    setFilteredInfo(filters);
  };
  const [dbQuizList, setDbQuizList] = useState();
  const userInfo = useSelector((state) => state.authReducer.user);
  useEffect(() => {
    async function getQuizData() {
      try {
        const data = await getAllQuizByInstructorId(userInfo);

        setDbQuizList(
          data.map((item) => ({
            key: item.id,
            quizName: item.quizName,
            liveQuizId: item.liveQuizId,
            category: item.category,
            statu: item.statu,
            startAt: item.startAt,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    }
    getQuizData();
  }, []);
  const deletee = (item) => {
    deleteQuizById(item.key);
    deleteQuizzesUsers(item.key);
    const updatedQuiz = dbQuizList.filter((quiz) => quiz.key !== item.key);
    setDbQuizList(updatedQuiz);
  };
  const editeQuiz = (item) => {
    navigate(`/instructor/${item.key}/makeQuizConfig`);
  };
  const columns = [
    {
      title: "Quiz Name",
      dataIndex: "quizName",
      key: "quizName",
      width: "200px",

      render: (text) => <a>{text}</a>,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.quizName.localeCompare(b.quizName),
    },
    {
      title: "Live Quiz Id",
      dataIndex: "liveQuizId",
      width: "200px",
      key: "liveQuizId",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.liveQuizId.localeCompare(b.liveQuizId),
    },
    {
      title: "Category",
      dataIndex: "category",
      width: "200px",
      key: "category",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Statu",
      dataIndex: "statu",
      key: "statu",

      width: "200px",
      filters: [
        {
          text: "Active",
          value: "Active",
        },
        {
          text: "Pasif",
          value: "Pasif",
        },
      ],
      filteredValue: filteredInfo.statu || null,
      onFilter: (value, record) => record.statu.includes(value),
    },
    {
      title: "Start Date",
      dataIndex: "startAt",
      key: "startAt",
      defaultSortOrder: "descend",
      width: "200px",

      sorter: (a, b) => a.startAt.localeCompare(b.startAt),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => editeQuiz(record)}>
            EDıT
          </Button>
          <Button type="primary" danger ghost onClick={() => deletee(record)}>
            DELETE
          </Button>
        </Space>
      ),
    },
  ];
  return (
    // <div>aa</div>
    <Table
      columns={columns}
      dataSource={dbQuizList}
      onChange={handleChange}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  );
};

export default QuizList;
