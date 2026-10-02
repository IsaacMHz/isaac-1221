import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { privateRoutes } from "../../config/routesConfig";

import "./AppMenu.css";

const AppMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = privateRoutes
    .filter((route) => route.label)
    .map((route) => ({
      key: route.path,
      icon: route.icon,
      label: route.label,
    }));

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={({ key }) => navigate(key)}
      className="sidebar-menu"
    />
  );
};

export default AppMenu;