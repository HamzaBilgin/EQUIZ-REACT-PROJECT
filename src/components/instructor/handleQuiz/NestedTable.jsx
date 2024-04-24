import { Table, Badge, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import Instructor from "../Instructor";

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: "End Date", dataIndex: "endDate", key: "endDate" },
      {
        title: "Status",
        key: "state",
        render: () => (
          <span className="flex gap-2">
            <Badge status="error" size="2xl" />
            <p>Not Started Yet</p>
          </span>
        ),
      },
      { title: "Total Participants", dataIndex: "totalPar", key: "totalPar" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <span className="table-operation flex gap-2">
            <Link
              to="/Instructor/quiz/detail"
              className=" text-green-600 border px-2 py-1 bg-slate-200 rounded-lg"
            >
              View Details
            </Link>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 1; ++i) {
      data.push({
        key: i,
        endDate: "2014-12-24 23:12:00",
        totalPar: "58",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Lesson",
      dataIndex: "lesson",
      key: "lesson",
    },
    { title: "Quiz Name", dataIndex: "quizName", key: "quizName" },
    { title: "Created Date", dataIndex: "createdAt", key: "ccreatedAt" },
    { title: "Starting Date", dataIndex: "startingDate", key: "startingDate" },
    { title: "Quiz Duration", dataIndex: "quizDuration", key: "quizDuration" },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: () => (
        <span className="table-operation flex gap-2">
          <button className=" text-green-600 border px-2 py-1 bg-slate-200 rounded-lg">
            Start
          </button>
          <button className=" text-red-600 border px-2 py-1 bg-slate-200 rounded-lg">
            Delete
          </button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: 0,
      lesson: "Matematik",
      quizName: "Cebir",
      createdAt: "2023-01-01 10:00:00",
      startingDate: "2023-02-01 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 1,
      lesson: "Fizik",
      quizName: "Klasik Mekanik",
      createdAt: "2023-01-02 10:00:00",
      startingDate: "2023-02-02 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 2,
      lesson: "Kimya",
      quizName: "Organik Kimya",
      createdAt: "2023-01-03 10:00:00",
      startingDate: "2023-02-03 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 3,
      lesson: "Biyoloji",
      quizName: "Hücre Biyolojisi",
      createdAt: "2023-01-04 10:00:00",
      startingDate: "2023-02-04 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 4,
      lesson: "Edebiyat",
      quizName: "Şiir Analizi",
      createdAt: "2023-01-05 10:00:00",
      startingDate: "2023-02-05 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 5,
      lesson: "Tarih",
      quizName: "Osmanlı Tarihi",
      createdAt: "2023-01-06 10:00:00",
      startingDate: "2023-02-06 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 6,
      lesson: "Coğrafya",
      quizName: "Dünya Suları",
      createdAt: "2023-01-07 10:00:00",
      startingDate: "2023-02-07 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 7,
      lesson: "Felsefe",
      quizName: "Etik",
      createdAt: "2023-01-08 10:00:00",
      startingDate: "2023-02-08 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 8,
      lesson: "Sanat",
      quizName: "Rönesans Sanatı",
      createdAt: "2023-01-09 10:00:00",
      startingDate: "2023-02-09 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 9,
      lesson: "Müzik",
      quizName: "Klasik Müzik Tarihi",
      createdAt: "2023-01-10 10:00:00",
      startingDate: "2023-02-10 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 10,
      lesson: "Programlama",
      quizName: "Veri Yapıları",
      createdAt: "2023-01-11 10:00:00",
      startingDate: "2023-02-11 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 11,
      lesson: "Mühendislik",
      quizName: "Termodinamik",
      createdAt: "2023-01-12 10:00:00",
      startingDate: "2023-02-12 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 12,
      lesson: "Psikoloji",
      quizName: "Gelişim Psikolojisi",
      createdAt: "2023-01-13 10:00:00",
      startingDate: "2023-02-13 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 13,
      lesson: "Ekonomi",
      quizName: "Makroekonomi",
      createdAt: "2023-01-14 10:00:00",
      startingDate: "2023-02-14 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 14,
      lesson: "Hukuk",
      quizName: "Medeni Hukuk",
      createdAt: "2023-01-15 10:00:00",
      startingDate: "2023-02-15 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 15,
      lesson: "Politika Bilimi",
      quizName: "Uluslararası İlişkiler",
      createdAt: "2023-01-16 10:00:00",
      startingDate: "2023-02-16 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 16,
      lesson: "Arkeoloji",
      quizName: "Eski Medeniyetler",
      createdAt: "2023-01-17 10:00:00",
      startingDate: "2023-02-17 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 17,
      lesson: "Antropoloji",
      quizName: "Kültürel Antropoloji",
      createdAt: "2023-01-18 10:00:00",
      startingDate: "2023-02-18 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 18,
      lesson: "Astronomi",
      quizName: "Gökbilim",
      createdAt: "2023-01-19 10:00:00",
      startingDate: "2023-02-19 10:00:00",
      quizDuration: "60 Min.",
    },
    {
      key: 19,
      lesson: "Spor Bilimi",
      quizName: "Spor Psikolojisi",
      createdAt: "2023-01-20 10:00:00",
      startingDate: "2023-02-20 10:00:00",
      quizDuration: "60 Min.",
    },
  ];

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}
export default NestedTable;
