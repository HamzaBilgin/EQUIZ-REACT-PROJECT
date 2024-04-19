import React, { Fragment } from "react";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-dvh flex flex-col  items-center">
      <Fragment>
        <Outlet />
      </Fragment>
    </div>
  );
};

export default MainLayout;
