import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import PublicLayout from "../Layouts/PublicLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import LogOut from "../pages/Auth/LogOut";
import Profile from "../pages/User/Profile/Profile";
import EditUser from "../pages/User/EditUser";
import Post from "../pages/User/Profile/Post";
import About from "../pages/User/Profile/About";
import Galery from "../pages/User/Profile/Galery";
import Friends from "../pages/User/Profile/Friends";
import FamilyAndRel from "../pages/User/About/FamilyAndRel/FamilyAndRel";
import WorkEducation from "../pages/User/About/WorkEducation/WorkEducation";
import PlaceLived from "../pages/User/About/PlaceLived/PlaceLived";
import Contact from "../pages/User/About/Contact/Contact";
import Overview from "../pages/User/About/Overview/Overview";

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
          {
            path: "profile/:id",
            element: <Profile />,
            children: [
              { index: true, element: <Post /> },
              {
                path: "about",
                element: <About />,
                children: [
                  { index: true, element: <Overview /> },
                  { path: "overview", element: <Overview /> },

                  { path: "family", element: <FamilyAndRel /> },
                  { path: "work&education", element: <WorkEducation /> },
                  { path: "placeLived", element: <PlaceLived /> },
                  { path: "contact", element: <Contact /> },
                ],
              },
              { path: "friends", element: <Friends /> },
              { path: "galery", element: <Galery /> },
            ],
          },

          { path: "logout", element: <LogOut /> },
          { path: "edit/user/:id", element: <EditUser /> },
        ],
      },
    ],
  },
]);

export default router;
