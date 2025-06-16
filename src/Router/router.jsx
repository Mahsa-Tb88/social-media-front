import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import React from "react";

import PublicLayout from "../Layouts/PublicLayout";
import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login";
import SinglePostPage from "../pages/SinglePostPage";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile";
import Post from "../components/profile/shared/post/Post";
import About from "../components/profile/shared/About";
import Overview from "../components/About/Overview/Overview";
import FamilyAndRel from "../components/About/FamilyAndRel/FamilyAndRel";
import WorkEducation from "../components/About/WorkEducation/WorkEducation";
import PlaceLived from "../components/About/PlaceLived/PlaceLived";
import Contact from "../components/About/Contact/Contact";
import Friends from "../components/profile/shared/Friends";
import Galery from "../components/profile/shared/Galery";
import LogOut from "../pages/Auth/LogOut";
import MessagesUsers from "../pages/message/MessagesUsers";
import Chat from "../pages/message/Chat";
import EditUser from "../components/profile/userLogin/EditUser";

// import HomePage from "../pages/User/Profile/page/Home/HomePage";
// import PublicLayout from "../Layouts/PublicLayout";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";
// import LogOut from "../pages/Auth/LogOut";
// import Profile from "../pages/User/Profile/page/Profile";
// import EditUser from "../pages/User/Profile/component/userLogin/EditUser";
// import Galery from "../pages/User/Profile/component/shared/Galery";
// import Friends from "../pages/User/Profile/component/shared/Friends";
// import FamilyAndRel from "../pages/User/About/FamilyAndRel/FamilyAndRel";
// import WorkEducation from "../pages/User/About/WorkEducation/WorkEducation";
// import PlaceLived from "../pages/User/About/PlaceLived/PlaceLived";
// import Contact from "../pages/User/About/Contact/Contact";
// import Overview from "../pages/User/About/Overview/Overview";
// import About from "../pages/User/Profile/component/shared/About";
// import SinglePostPage from "../pages/User/Profile/page/SinglePostPage";
// import Post from "../pages/User/Profile/component/shared/post/Post";
// import MessagesUsers from "../pages/User/Profile/page/message/MessagesUsers";
// import Chat from "../pages/User/Profile/page/message/Chat";

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
          { path: "post/:id", element: <SinglePostPage /> },
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
          { path: "messages/:id", element: <MessagesUsers /> },
          { path: "chat/:id", element: <Chat /> },
          { path: "edit/user/:id", element: <EditUser /> },
        ],
      },
    ],
  },
]);

export default router;
