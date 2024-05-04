import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import db from "../../FireBasee/Myfirebase";
import { getAllQuizzes } from "../../actions/quizActions/quizActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
  };
  useEffect(() => {
    getQuizList();
  }, []);
  const getQuizList = async () => {
    const data = await getAllQuizzes();
    const updatedQuizzes = await Promise.all(
      data.map(async (docu) => {
        const item = await aaa(docu);
        return item;
      })
    );
    setQuizzes(updatedQuizzes);
  };
  const aaa = async (docu) => {
    console.log(docu);
    const { startAt, category, quizName, quizDuration, id } = docu;
    const instuctorRef = doc(db, docu.instructorId.path);
    // const quizRef = doc(db, docu.quizId.path);
    const instuctorRefSnap = await getDoc(instuctorRef);
    const { name, surname, uid } = instuctorRefSnap.data();
    // const quizRefSnap = await getDoc(quizRef);
    // const { startAt, category, quizName, quizDuration } = quizRefSnap.data();
    let docData = {
      key: id,
      instructorName: `${name}  ${surname}`,
      startAt: startAt,
      category: category,
      quizName: quizName,
    };
    return docData;
  };
  const showQuizResult = (item) => {
    // const { answers, elapsedTime, quizDuration } = item.details;
    // dispatch(
    //   quizResultActions.setResult({
    //     questionsAnswer: [...answers],
    //     quizTimer: quizDuration,
    //     elapsedTime: elapsedTime,
    //   })
    // );
    // localStorage.setItem(
    //   "quizResultLocal",
    //   JSON.stringify({
    //     questionsAnswer: [...answers],
    //     quizTimer: quizDuration,
    //     elapsedTime: elapsedTime,
    //   })
    // );
    // console.log(item);
    // navigate(`/student/quiz/result`);
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
      title: "instructorName",
      dataIndex: "instructorName",
      width: "200px",
      key: "instructorName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.instructorName.localeCompare(b.instructorName),
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
          <Button type="primary" ghost onClick={() => showQuizResult(record)}>
            SEE DETAILS
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      className="mt-[70px] max-w-screen-xl w-full m-auto  "
      columns={columns}
      dataSource={quizzes}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  );
};

export default QuizzesList;
