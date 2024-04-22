import ChangePassword from "../components/ChangePassword";
import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

const InstructorRoutes = [
  {
    path: "/instructor",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":instructorId",
        element: <HomePage layout={"instructor"} />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
];

export default InstructorRoutes;
