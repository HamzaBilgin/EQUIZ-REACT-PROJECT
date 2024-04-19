import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";

const MainRoutes = [
  {
    path: "/",

    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default MainRoutes;
