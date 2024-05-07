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
        // loader: async ({ params }) => {
        //   const user = auth.currentUser;

        //   const quiz = await getQuizInfo(params.quizId);

        //   if (!quiz) {
        //     const error = new Error("Quiz bulunamadı");
        //     error.code = 0;
        //     console.log(error);
        //     throw error;
        //   }

        //   if (quiz.instructorId.id === user.uid) {
        //     return quiz;
        //   } else {
        //     const error = new Error("Bu quiz'e erişim izniniz yok");
        //     error.code = 1;

        //     throw error;
        //   }
        // },
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
