import "./App.css";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTES from "./router/appRouter";

const router = createBrowserRouter(ROUTES);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
