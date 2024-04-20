import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";
import StudentRoutes from "./routes/StudentRoutes";
const router = createBrowserRouter([...MainRoutes, ...StudentRoutes]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
