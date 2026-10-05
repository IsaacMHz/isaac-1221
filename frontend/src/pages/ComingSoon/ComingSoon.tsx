import type { ReactNode } from "react";

import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import "./ComingSoon.css";

interface ComingSoonProps {
  icon: ReactNode;
}

const ComingSoon = ({
  icon,
}: ComingSoonProps) => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon">
      <div className="coming-soon__icon">
        {icon}
      </div>

      <h1 className="coming-soon__title">
        Próximamente
      </h1>

      <p className="coming-soon__description">
        Esta funcionalidad estará disponible
        próximamente.
      </p>

      <Button
        type="primary"
        onClick={() => navigate("/dashboard")}
      >
        Volver al dashboard
      </Button>
    </div>
  );
};

export default ComingSoon;