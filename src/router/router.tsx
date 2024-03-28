import { createBrowserRouter } from "react-router-dom";
import Login from "../screens/Login";
import App from "../screens/Drivedashboard";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
]);
