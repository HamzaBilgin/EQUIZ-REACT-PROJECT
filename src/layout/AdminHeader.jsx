import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Space } from "antd";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userInfoActions } from "../store/slice/userInfoSlice";
import { authActions } from "../store/slice/authSlice";
const navLinks = [
  {
    id: 1,
    path: "/admin/instructors",
    page: "Instructors",
  },
  {
    id: 2,
    path: "/admin/students",
    page: "Students",
  },
  {
    id: 3,
    path: "/admin/quizzes",
    page: "Quizzes",
  },
];
const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeUrl, setHomeUrl] = useState("");
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  useEffect(() => {
    setHomeUrl(`/admin/${userInfo.uid}`);
  }, []);
  const logout = () => {
    dispatch(authActions.logout());
    dispatch(userInfoActions.setUserInfo([]));

    localStorage.clear();
    navigate(`/`);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to="./changePassword" relative="path" className="">
          <span>Change Password</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: <div onClick={logout}>Logout</div>,
    },
  ];

  return (
    <header className={`fixed w-full top-0 left-0 bg-[#ACBFE6] z-10 absolute `}>
      <nav className="  px-4 lg:px-4">
        <div className="h-14 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={homeUrl} relative="path" className="w-1/3">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              EQuiz
            </span>
          </Link>
          <ul className="w-1/3 h-full  w-cover  flex justify-around  items-center">
            {navLinks.map(({ id, path, page }) => (
              <li key={id}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `p-2 rounded-lg hover:bg-teal-200 hover:text-sky-800
                        ${
                          isActive
                            ? "text-red-700 dark:text-red-700"
                            : "text-black dark:text-black"
                        }
                        `
                  }
                  aria-current="page"
                >
                  {page}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className=" w-1/3 text-end">
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
              <span>
                <Avatar size="small" icon={<UserOutlined />} />
                <span>Hamza</span>
              </span>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
