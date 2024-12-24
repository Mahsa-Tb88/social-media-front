import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import PublicLayout from "../Layouts/PublicLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import LogOut from "../pages/Auth/LogOut";
import Profile from "../pages/User/Profile/Profile";
import EditUser from "../pages/User/EditUser";

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
          { path: "logout", element: <LogOut /> },
          { path: "edit/user/:id", element: <EditUser /> },
        ],
      },
    ],
  },
]);

export default router;
