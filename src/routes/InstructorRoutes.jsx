import ChangePassword from "../components/ChangePassword";
import Quiz from "../components/instructor/handleQuiz/Quiz";
import QuizConfig from "../components/instructor/handleQuiz/QuizConfig";
import QuizDetail from "../components/instructor/handleQuiz/QuizDetail";
import Lesson from "../components/instructor/handleResult/Lesson";
import Result from "../components/instructor/handleResult/Result";
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
      { path: "lesson/:categoryName", element: <Lesson /> },
      { path: "quiz/detail", element: <QuizDetail /> },
      { path: "makeQuiz", element: <Quiz /> },
      { path: ":quizId/makeQuizConfig", element: <QuizConfig /> },
      { path: "result", element: <Result /> },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
];

export default InstructorRoutes;
