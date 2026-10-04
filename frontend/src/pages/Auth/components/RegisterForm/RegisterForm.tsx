import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../../context/AuthContext";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (values: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await register({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      message.success("Cuenta creada correctamente");

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
        return;
      }

      message.error("No fue posible crear la cuenta");
    }
  };

  return (
    <>
      <div className="auth__heading">
        <h2>Crea tu cuenta</h2>

        <p>
          Únete a SnailRaces y comienza a competir
        </p>
      </div>

      <Form
        layout="vertical"
        onFinish={handleRegister}
      >
        <Form.Item
          label="Nombre completo"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Ingresa tu nombre completo",
            },
          ]}
        >
          <Input placeholder="Isaac Montiel" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            {
              required: true,
              message: "Ingresa tu correo electrónico",
            },
            {
              type: "email",
              message: "Ingresa un correo electrónico válido",
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
              message: "Ingresa una contraseña",
            },
            {
              min: 6,
              message:
                "La contraseña debe tener al menos 6 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          label="Confirmar contraseña"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Confirma tu contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  getFieldValue("password") === value
                ) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Las contraseñas no coinciden"),
                );
              },
            }),
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
          Crear cuenta →
        </Button>
      </Form>
    </>
  );
};

export default RegisterForm;