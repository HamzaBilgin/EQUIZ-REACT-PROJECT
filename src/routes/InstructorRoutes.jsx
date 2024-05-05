import ChangePassword from "../components/ChangePassword";
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
