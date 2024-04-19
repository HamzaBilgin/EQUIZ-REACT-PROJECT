import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainRoutes from "./routes/MainRoutes";

const router = createBrowserRouter([...MainRoutes]);
function App() {
  return <RouterProvider router={router} />;
}
export default App;
