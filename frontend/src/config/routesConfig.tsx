import type { ReactNode } from "react";

import {
  BarChartOutlined,
  CreditCardOutlined,
  HomeOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Auth from "../pages/Auth/Auth";
import Dashboard from "../pages/Dashboard/Dashboard";

export interface AppRoute {
  path: string;
  element: ReactNode;
  label?: string;
  icon?: ReactNode;
}

export const publicRoutes: AppRoute[] = [
  {
    path: "/auth",
    element: <Auth />,
  },
];

export const privateRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Inicio",
    icon: <HomeOutlined />,
  },
  {
    path: "/races",
    element: <h1>Carreras</h1>,
    label: "Carreras",
    icon: <TrophyOutlined />,
  },
  {
    path: "/top-up",
    element: <h1>Recargar saldo</h1>,
    label: "Recargar saldo",
    icon: <CreditCardOutlined />,
  },
  {
    path: "/history",
    element: <h1>Historial</h1>,
    label: "Historial",
    icon: <BarChartOutlined />,
  },
  {
    path: "/profile",
    element: <h1>Perfil</h1>,
    label: "Perfil",
    icon: <UserOutlined />,
  },
];