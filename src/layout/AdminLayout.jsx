import React, { Fragment } from "react";

import { Outlet } from "react-router-dom";

import UserNavigation from "./UserNavigation";
import AdminNavigation from "./AdminNavigation";

const AdminLayout = () => {
  return (
    <Fragment>
      <AdminNavigation />
      <Outlet />
    </Fragment>
  );
};

export default AdminLayout;
