import type { ReactNode } from "react";

import Auth from "../pages/Auth/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";

export interface AppRoute {
  path: string;
  element: ReactNode;
}

export const publicRoutes: AppRoute[] = [
  {
    path: "/auth",
    element: <Auth />,
  }
];

export const privateRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];