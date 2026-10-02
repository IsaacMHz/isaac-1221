import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import AppMenu from "../../components/AppMenu/AppMenu";
import AppNavbar from "../../components/AppNavbar/AppNavbar";

import "./AppLayout.css";

const { Sider, Content } = Layout;

const AppLayout = () => {
  return (
    <Layout className="app-layout">
      <Sider className="app-layout__sidebar" width="var(--sidebar-width)">
        <div className="app-layout__brand">
          <span className="app-layout__brand-icon">◉</span>
          <span>SnailRaces</span>
        </div>

        <AppMenu />
      </Sider>

      <Layout>
        <AppNavbar />

        <Content className="app-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;