import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  publicRoutes,
  privateRoutes,
} from "../config/routesConfig";

import AppLayout from "../layouts/AppLayout/AppLayout";
import { getSession } from "../utils/authStorage";

const AppRouteTree = () => {
  const location = useLocation();
  void location;

  const session = getSession();

  const isAuthenticated =
    session?.isAuthenticated === true;

  return (
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
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AppRouteTree />
    </BrowserRouter>
  );
};

export default AppRoutes;