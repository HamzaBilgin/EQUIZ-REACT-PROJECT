import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [homeUrl, setHomeUrl] = useState("");
  const userInfo = useSelector((state) => state.authReducer.user);
  useEffect(() => {
    if (userInfo.role === "admin") {
      setHomeUrl(`/admin/${userInfo.uid}`);
    } else if (userInfo.role === "instructor") {
      setHomeUrl(`/instructor/${userInfo.uid}`);
    } else if (userInfo.role === "student") {
      setHomeUrl(`/student/${userInfo.uid}`);
    } else {
      setHomeUrl(`/`);
    }
  }, []);
  const logout = async () => {
    await logoutUser();
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
      <nav className=" border-gray-200 px-4 lg:px-4">
        <div className="h-14 flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={homeUrl} relative="path" className="w-[300px]">
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
