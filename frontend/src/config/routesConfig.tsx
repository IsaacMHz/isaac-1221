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
import ComingSoon from "../pages/ComingSoon/ComingSoon";

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
    element: (
      <ComingSoon icon={<TrophyOutlined />} />
    ),
    label: "Carreras",
    icon: <TrophyOutlined />,
  },
  {
    path: "/top-up",
    element: (
      <ComingSoon icon={<CreditCardOutlined />} />
    ),
    label: "Recargar saldo",
    icon: <CreditCardOutlined />,
  },
  {
    path: "/history",
    element: (
      <ComingSoon icon={<BarChartOutlined />} />
    ),
    label: "Historial",
    icon: <BarChartOutlined />,
  },
  {
    path: "/profile",
    element: (
      <ComingSoon icon={<UserOutlined />} />
    ),
    label: "Perfil",
    icon: <UserOutlined />,
  },
];