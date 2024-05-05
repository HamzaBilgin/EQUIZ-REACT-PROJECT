import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";

const router = createBrowserRouter([
  ...MainRoutes,
  ...InstructorRoutes,
  ...StudentRoutes,
]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
