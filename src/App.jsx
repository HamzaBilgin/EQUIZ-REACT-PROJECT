import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import AdminRoutes from "./routes/AdminRoutes";
const router = createBrowserRouter([
  ...MainRoutes,
  ...StudentRoutes,
  ...InstructorRoutes,
  ...AdminRoutes,
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
