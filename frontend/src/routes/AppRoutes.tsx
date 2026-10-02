import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { publicRoutes, privateRoutes } from "../config/routesConfig";
import AppLayout from "../layouts/AppLayout/AppLayout";

function AppRoutes() {
  const isAuthenticated = true; // temporal

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route element={<AppLayout />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        ) : (
          publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))
        )}

        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/auth"}
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;