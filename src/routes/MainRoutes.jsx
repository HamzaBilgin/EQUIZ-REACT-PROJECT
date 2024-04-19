import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/authPages/RegisterPage";
import LoginPage from "../pages/authPages/LoginPage";
const MainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "auth/register", element: <RegisterPage /> },
      { path: "auth/login", element: <LoginPage /> },
    ],
  },
];

export default MainRoutes;
