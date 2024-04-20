import React, { Fragment } from "react";

import { Outlet } from "react-router-dom";
import UserNavigation from "./UserNavigation";

const UserLayout = () => {
  return (
    <Fragment>
      <UserNavigation />
      <Outlet />
    </Fragment>
  );
};

export default UserLayout;
