import { useSelector } from "react-redux";
import { getQuizInfo } from "../actions/quizActions";
import ChangePassword from "../components/ChangePassword";
import QuizConfig from "../components/instructor/QuizConfig";
import { auth } from "../firebaseConfig";
import UserLayout from "../layout/userLayout/UserLayout";
import ErrorPage from "../pages/ErrorPage";

import InstructorPage from "../pages/InstructorPage";

const InstructorRoutes = [
  {
    path: "/instructor",
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":instructorId",
        element: <InstructorPage />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
      {
        path: ":quizId/makeQuizConfig",
        element: <QuizConfig />,
        loader: async ({ params }) => {
          const quiz = await getQuizInfo(params.quizId);
          return quiz;
        },
      },
      // { path: "lesson/:categoryName", element: <Lesson /> },
      // { path: "quiz/detail", element: <QuizDetail /> },
      // { path: "makeQuiz", element: <Quiz /> },
      // { path: ":quizId/makeQuizConfig", element: <QuizConfig /> },
      // { path: "result", element: <Result /> },
      //
    ],
  },
];

export default InstructorRoutes;
