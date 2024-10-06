import { Suspense } from "react";
import { Route, createRoutesFromElements } from "react-router-dom";
import MainLayout from "../layouts/main-layout/main-layout";
import UserTemplate from "../pages/users/templates/user.template";
import LoginLoading from "../pages/loading/templates/loading.template";

const ROUTES = createRoutesFromElements(
  <Route path="/" element={<MainLayout />}>
    <Route
      path="/"
      element={
        <Suspense fallback={<LoginLoading />}>
          <UserTemplate />
        </Suspense>
      }
    />
  </Route>
);

export default ROUTES;
