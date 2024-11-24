import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PublicLayout from "../Layouts/PublicLayout";

const router = createBrowserRouter({
  path: "/",
  element: <App />,
  children: [
    {
      path: "/",
      element: <PublicLayout />,
      element: [{ index: true, element: <HomePage /> }],
    },
  ],
});

export default router;
