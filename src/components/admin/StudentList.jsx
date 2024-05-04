import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import db from "../../FireBasee/Myfirebase";
const StudentList = () => {
  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  // const params = useParams();

  const [list, setList] = useState([]); // Boş bir liste ile başlayan bir state oluşturuyoruz

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("role", "==", "student"));

        const usersSnapshot = await getDocs(usersQuery);
        const usersArray = usersSnapshot.docs.map((doc) => doc.data());

        // Response'dan gelen veriyi setList ile state içine alıyoruz
        setList(usersArray);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    // fetchData fonksiyonunu çağırarak veriyi alıyoruz
    fetchData();
  }, []); // useEffect, bileşen ilk kez render edildiğinde çalışacak

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="ant-btn-default"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "20%",
      ...getColumnSearchProps("phoneNumber"),
      defaultSortOrder: "descend",
      sorter: (a, b) => a.phoneNumber - b.phoneNumber,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" ghost onClick={() => seeDetails(record)}>
            SEE DETAILS
          </Button>
        </Space>
      ),
    },
  ];
  const seeDetails = (item) => {
    console.log(item);
  };
  return (
    <Table
      className="mt-[70px] max-w-screen-xl w-full m-auto  "
      columns={columns}
      dataSource={list.map((item) => ({ ...item, key: item.uid }))}
      pagination={{
        position: ["bottomCenter"],
      }}
    />
  );
};

export default StudentList;
