import { React, useState } from "react";
import { Button, Table } from "antd";

const data = [
  {
    key: "1",
    student: "John Brown",
    score: 70,
    lesson: "Matematik",
  },
  {
    key: "2",
    student: "Jim Green",
    score: 100,
    lesson: "Matematik",
  },
  {
    key: "3",
    student: "Joe Black",
    score: 66,
    lesson: "Matematik",
  },
  {
    key: "4",
    student: "Jim Red",
    score: 58,
    lesson: "Matematik",
  },
];
const ResultTable = () => {
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const setAmountSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "score",
    });
  };

  const columns = [
    {
      title: "Öğrenci",
      dataIndex: "student",
      key: "student",
      filters: [
        { text: "Joe", value: "Joe" },
        { text: "Jim", value: "Jim" },
      ],
      filteredValue: filteredInfo?.name || null,
      onFilter: (value, record) => record.student.includes(value),
      sorter: (a, b) => a.student.length - b.student.length,
      sortOrder: sortedInfo?.columnKey === "student" && sortedInfo.order,
    },
    {
      title: "Puan",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      sortOrder: sortedInfo?.columnKey === "score" && sortedInfo.order,
    },
    {
      title: "Ders",
      dataIndex: "lesson",
      key: "lesson",
      filters: [
        { text: "London", value: "London" },
        { text: "New York", value: "New York" },
      ],
      filteredValue: filteredInfo?.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo?.columnKey === "lesson" && sortedInfo.order,
    },
  ];
  return (
    <div>
      <div className="table-operations">
        <Button onClick={setAmountSort}>Sort score</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </div>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  );
};

export default ResultTable;
