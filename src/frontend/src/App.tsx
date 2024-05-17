import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./routes/Layout";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";

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
      { path: "*", element: <h1>404 NOT FOUND</h1> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
