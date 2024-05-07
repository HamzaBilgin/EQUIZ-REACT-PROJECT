import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthChecker } from "./hooks/AuthChecker";
const router = createBrowserRouter([
  ...MainRoutes,
  ...InstructorRoutes,
  ...StudentRoutes,
]);
function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}
export default App;
