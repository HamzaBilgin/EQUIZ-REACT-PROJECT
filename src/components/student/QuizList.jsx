import React, { useState, useEffect } from "react";
import db from "../../FireBasee/Myfirebase";
import { useDispatch, useSelector } from "react-redux";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAllQuizzesByStudentId } from "../../actions/quizActions/quizActions";
import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

import { quizResultActions } from "../../store/slice/quizResultSlice";

const QuizList = () => {
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
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
    const data = await getAllQuizzesByStudentId(userInfo.uid);
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
    const instuctorRef = doc(db, docu.instructorId.path);
    const quizRef = doc(db, docu.quizId.path);
    const instuctorRefSnap = await getDoc(instuctorRef);
    const { name, surname, uid } = instuctorRefSnap.data();
    const quizRefSnap = await getDoc(quizRef);
    const { startAt, category, quizName, quizDuration } = quizRefSnap.data();
    let docData = {
      instructorName: `${name}  ${surname}`,
      startAt: startAt,
      category: category,
      quizName: quizName,
      details: { ...docu.userAnswer, quizDuration },
    };
    return docData;
  };
  const showQuizResult = (item) => {
    const { answers, elapsedTime, quizDuration } = item.details;
    dispatch(
      quizResultActions.setResult({
        questionsAnswer: [...answers],
        quizTimer: quizDuration,
        elapsedTime: elapsedTime,
      })
    );
    localStorage.setItem(
      "quizResultLocal",
      JSON.stringify({
        questionsAnswer: [...answers],
        quizTimer: quizDuration,
        elapsedTime: elapsedTime,
      })
    );
    console.log(item);
    navigate(`/student/quiz/result`);
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
    <div>
      <Table
        columns={columns}
        dataSource={quizzes}
        onChange={handleChange}
        pagination={{
          position: ["bottomCenter"],
        }}
      />
    </div>
  );
};

export default QuizList;
