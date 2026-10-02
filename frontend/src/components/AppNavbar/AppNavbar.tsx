import { BellOutlined, DownOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";

import "./AppNavbar.css";

const AppNavbar = () => {
  return (
    <header className="app-navbar">
      <div className="app-navbar__content">
        <div className="app-navbar__notifications">
          <Button
            type="text"
            icon={<BellOutlined />}
            className="app-navbar__notification-button"
          />
        </div>

        <div className="app-navbar__user">
          <Avatar
            size={40}
            icon={<UserOutlined />}
            className="app-navbar__avatar"
          />

          <div className="app-navbar__user-info">
            <strong>Isaac Montiel</strong>
            <span>isaac@email.com</span>
          </div>

          <DownOutlined className="app-navbar__user-arrow" />
        </div>
      </div>
    </header>
  );
};

export default AppNavbar;