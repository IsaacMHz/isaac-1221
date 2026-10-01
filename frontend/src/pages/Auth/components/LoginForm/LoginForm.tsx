import { Button, Form, Input } from "antd";

const LoginForm = () => {
  return (
    <>
      <div className="auth__heading">
        <h2>¡Bienvenido de vuelta!</h2>

        <p>Ingresa a tu cuenta para continuar</p>
      </div>

      <Form layout="vertical">
        <Form.Item label="Correo electrónico">
          <Input placeholder="tu@correo.com" />
        </Form.Item>

        <Form.Item label="Contraseña">
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <div className="auth__options">
          <label>
            <input type="checkbox" />
            <span>Recordarme</span>
          </label>

          <button type="button">
            ¿Olvidaste tu contraseña?
          </button>
        </div>

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