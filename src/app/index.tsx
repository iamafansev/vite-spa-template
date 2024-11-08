import { StrictMode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import './entry.css';

const router = createBrowserRouter(routes);

export const App = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </StrictMode>
  )
};
