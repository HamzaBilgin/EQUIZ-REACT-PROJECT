import QuizResult from "../components/QuizResult";
import LiveQuiz from "../components/student/LiveQuiz/LiveQuiz";
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
      {
        path: "liveQuiz/:categoryName/:id/:totalQuestions",
        element: <LiveQuiz />,
      },
      {
        path: "quiz/result",
        element: <QuizResult />,
      },
    ],
  },
];

export default StudentRoutes;
