import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@/pages";

import './entry.css';

const router = createBrowserRouter(routes);

export const App = () => {
  return (
    <RouterProvider router={router} />
  )
};
