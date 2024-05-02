import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ErrorPage from "./ErrorPage";

import InstructorPage from "./InstructorPage";
import DefaultHomePage from "./DefaultHomePage";
import StudentPage from "./StudentPage";

import AdminPage from "./AdminPage";

const HomePage = ({ layout }) => {
  const [userComponent, setUserComponent] = useState(null);

  useEffect(() => {
    switch (layout) {
      case "default":
        setUserComponent(<DefaultHomePage />);
        break;
      case "instructor":
        setUserComponent(<InstructorPage />);
        break;
      case "student":
        setUserComponent(<StudentPage />);
        break;
      case "admin":
        setUserComponent(<AdminPage />);
        break;
      default:
        setUserComponent(<ErrorPage />);
        break;
    }
  }, [layout]);
  return (
    <div className="mt-[70px] max-w-screen-xl w-full m-auto">
      <Fragment>{userComponent}</Fragment>
    </div>
  );
};
HomePage.propTypes = {
  layout: PropTypes.string,
};
export default HomePage;
