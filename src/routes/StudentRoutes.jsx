import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

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