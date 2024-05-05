import MainLayout from "../layout/MainLayout";
import DefaultHomePage from "../pages/DefaultHomePage";
import ErrorPage from "../pages/ErrorPage";

import LoginPage from "../pages/authPages/LoginPage";
import RegisterPage from "../pages/authPages/RegisterPage";
const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DefaultHomePage />,
      },
      { path: "auth/register", element: <RegisterPage /> },
      { path: "auth/login", element: <LoginPage /> },
    ],
  },
];

export default MainRoutes;
