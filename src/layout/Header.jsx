import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];
const Header = () => {
  return (
    <header className={`fixed w-full top-0 left-0 bg-[#ACBFE6] z-10 absolute `}>
      <nav className=" border-gray-200 px-4 lg:px-4">
        <div className="h-14 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="#" relative="path" className="w-[300px]">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              EQuiz
            </span>
          </Link>

          <Dropdown
            className="cursor-pointer"
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <div>
              <Avatar size="small" icon={<UserOutlined />} />
              <span>Hamza</span>
            </div>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Header;
