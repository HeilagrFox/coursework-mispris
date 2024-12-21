import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import { BodyContent } from "./classification-body";
import { ProductBodyContent } from "./product-body";
import { SpecBodyContent } from "./spec-body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FlexWrapper } from "./flex-main-wrapper";
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
      element: <FlexWrapper BodyContent={<BodyContent />} />,
    },
    {
      path: "/product",
      element: <FlexWrapper BodyContent={<ProductBodyContent />} />,
    },
    {
      path: "/spec",
      element: <FlexWrapper BodyContent={<SpecBodyContent />} />,
    },
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
