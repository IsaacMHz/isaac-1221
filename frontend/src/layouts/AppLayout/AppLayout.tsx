import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <header>
        <h1>SnailRaces</h1>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;