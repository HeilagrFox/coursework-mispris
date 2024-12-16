import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { Classification } from "./classification";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
const future = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_skipActionErrorRevalidation: true,
  v7_partialHydration: true,
};
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Classification />,
    },
    // {
    //   path: "about",
    //   element: <App />,
    // },
  ],
  { future }
);
root.render(
  <React.StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </React.StrictMode>
);
