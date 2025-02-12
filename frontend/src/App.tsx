import { Suspense, useState } from "react";
import { RouterProvider } from "react-router";
import "./App.scss";
import LoadingSuspense from "./components/LoadingSuspense";
import { routes } from "./config/routes";

function App() {
  return (
    <Suspense fallback={<LoadingSuspense />}>
      <RouterProvider router={routes} />
    </Suspense>
  );
}

export default App;
