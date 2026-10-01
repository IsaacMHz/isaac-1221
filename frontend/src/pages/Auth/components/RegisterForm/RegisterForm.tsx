import { Button, Form, Input } from "antd";

const RegisterForm = () => {
  return (
    <>
      <div className="auth__heading">
        <h2>Crea tu cuenta</h2>

        <p>Únete a SnailRaces y comienza a competir</p>
      </div>

      <Form layout="vertical">
        <Form.Item label="Nombre completo">
          <Input placeholder="Isaac Montiel" />
        </Form.Item>

        <Form.Item label="Correo electrónico">
          <Input placeholder="tu@correo.com" />
        </Form.Item>

        <Form.Item label="Contraseña">
          <Input.Password placeholder="••••••••" />
        </Form.Item>

        <Form.Item label="Confirmar contraseña">
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