import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";


import { publicRoutes, privateRoutes } from "../config/routesConfig";
import AppLayout from "../layouts/AppLayout/AppLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

function AppRoutes() {
  const isAuthenticated = false; // temporal

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
          <Route element={<AuthLayout />}>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Route>
        )}

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;