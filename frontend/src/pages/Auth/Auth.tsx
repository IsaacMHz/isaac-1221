import { useState } from "react";

import AuthHero from "./components/AuthHero/AuthHero";
import AuthTabs from "./components/AuthTabs/AuthTabs";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

import "./Auth.css";

const Auth = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="auth">
      <AuthHero />

      <section className="auth__panel">
        <div className="auth__panel-content">
          <AuthTabs
            isRegistering={isRegistering}
            onLogin={() => setIsRegistering(false)}
            onRegister={() => setIsRegistering(true)}
          />

          {isRegistering ? <RegisterForm /> : <LoginForm />}
        </div>
      </section>
    </div>
  );
};

export default Auth;