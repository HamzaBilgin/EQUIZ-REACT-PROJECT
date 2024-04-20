import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

import UserLayout from "../layout/UserLayout";
const StudentRoutes = [
  {
    path: "/student",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":studentId",
        element: <HomePage layout={"student"} />,
      },
    ],
  },
];

export default StudentRoutes;
