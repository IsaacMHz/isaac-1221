interface AuthTabsProps {
  isRegistering: boolean;
  onLogin: () => void;
  onRegister: () => void;
}

const AuthTabs = ({
  isRegistering,
  onLogin,
  onRegister,
}: AuthTabsProps) => {
  return (
    <div className="auth__tabs">
      <button
        className={!isRegistering ? "active" : ""}
        onClick={onLogin}
      >
        Iniciar sesión
      </button>

      <button
        className={isRegistering ? "active" : ""}
        onClick={onRegister}
      >
        Crear cuenta
      </button>
    </div>
  );
};

export default AuthTabs;