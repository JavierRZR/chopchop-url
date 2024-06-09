import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Navigate from "./routes/Navigate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "links",
        element: <Dashboard />,
      },
      {
        path: "/:fromUrl",
        element: <Navigate />,
      },
      { path: "*", element: <h1>404 NOT FOUND</h1> },
    ],
  },
  // {
  //   path: "/:fromUrl",
  //   element: <p>SE CIERRA</p>,
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
