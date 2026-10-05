import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values: {
    email: string;
    password: string;
  }) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });

      message.success("Inicio de sesión correcto");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
        return;
      }

      message.error(
        "No fue posible iniciar sesión",
      );
    }
  };

  return (
    <>
      <div className="auth__heading">
        <h2>¡Bienvenido de vuelta!</h2>

        <p>
          Ingresa a tu cuenta para continuar
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              required: true,
              message:
                "Ingresa tu correo electrónico",
            },
            {
              type: "email",
              message:
                "Ingresa un correo electrónico válido",
            },
          ]}
        >
          <Input placeholder="tu@correo.com" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "Ingresa tu contraseña",
            },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          className="auth__submit"
        >
          Iniciar sesión →
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;