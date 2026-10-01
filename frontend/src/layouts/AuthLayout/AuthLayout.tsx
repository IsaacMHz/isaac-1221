import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <h1>SnailRaces</h1>

      <Outlet />
    </div>
  );
};

export default AuthLayout;