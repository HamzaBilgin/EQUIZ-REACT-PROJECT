import ChangePassword from "../components/ChangePassword";
import Quiz from "../components/instructor/handleQuiz/Quiz";
import AdminLayout from "../layout/AdminLayout";

import UserLayout from "../layout/UserLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":adminId",
        element: <HomePage layout={"admin"} />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
];

export default AdminRoutes;
