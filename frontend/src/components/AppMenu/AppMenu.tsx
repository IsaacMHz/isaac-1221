import { LogoutOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { privateRoutes } from "../../config/routesConfig";

import "./AppMenu.css";

const AppMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const menuItems = privateRoutes
    .filter((route) => route.label)
    .map((route) => ({
      key: route.path,
      icon: route.icon,
      label: route.label,
    }));

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="app-menu">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        className="sidebar-menu"
      />

      <Button
        type="text"
        icon={<LogoutOutlined />}
        className="app-menu__logout"
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
    </div>
  );
};

export default AppMenu;