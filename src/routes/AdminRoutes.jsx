import ChangePassword from "../components/ChangePassword";
import InstructorInfo from "../components/admin/InstructorInfo";
import InstructorList from "../components/admin/InstructorList";
import QuizzesList from "../components/admin/QuizzesList";
import StudentList from "../components/admin/StudentList";

import AdminLayout from "../layout/AdminLayout";

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
      {
        path: "instructors",
        element: <InstructorList />,
      },
      {
        path: "instructors/:intructorId/info",
        element: <InstructorInfo />,
      },
      {
        path: "students",
        element: <StudentList />,
      },
      {
        path: "quizzes",
        element: <QuizzesList />,
      },
    ],
  },
];

export default AdminRoutes;
