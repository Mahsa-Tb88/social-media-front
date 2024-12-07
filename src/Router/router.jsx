import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import PublicLayout from "../Layouts/PublicLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/User/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "profile/:id", element: <Profile /> },
        ],
      },
    ],
  },
]);

export default router;
