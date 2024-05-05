// import QuizResult from "../components/QuizResult";
// import LiveQuiz from "../components/student/LiveQuiz/LiveQuiz";
import ChangePassword from "../components/ChangePassword";
import UserLayout from "../layout/userLayout/UserLayout";
import ErrorPage from "../pages/ErrorPage";

import StudentPage from "../pages/StudentPage";

const StudentRoutes = [
  {
    path: "/student",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":studentId",
        element: <StudentPage />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
      // {
      //   path: "liveQuiz/:categoryName/:id/:totalQuestions",
      //   element: <LiveQuiz />,
      // },
      // {
      //   path: "quiz/result",
      //   element: <QuizResult />,
      // },
    ],
  },
];

export default StudentRoutes;
