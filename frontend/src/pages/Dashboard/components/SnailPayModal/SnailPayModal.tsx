import { CreditCardOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Modal, Row, Col } from "antd";
import "./SnailPayModal.css";

interface SnailPayModalProps {
  open: boolean;
  onClose: () => void;
}

const SnailPayModal = ({
  open,
  onClose,
}: SnailPayModalProps) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      console.log("Datos SnailPay:", values);
    } catch {
      // Validaciones del formulario.
    }
  };

  return (
    <Modal
      rootClassName="snailpay-modal"
      title={
        <div className="snailpay-modal__title">
          <CreditCardOutlined />
          <span>Recargar saldo</span>
        </div>
      }
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Recargar"
      cancelText="Cancelar"
      centered
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Número de tarjeta"
          name="cardNumber"
          rules={[
            {
              required: true,
              message: "Ingresa el número de tarjeta",
            },
          ]}
        >
          <Input placeholder="1234 1234 1234 1234" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Vencimiento"
              name="expiration"
              rules={[
                {
                  required: true,
                  message: "Ingresa el vencimiento",
                },
              ]}
            >
              <Input placeholder="MM/AA" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="CVV"
              name="cvv"
              rules={[
                {
                  required: true,
                  message: "Ingresa el CVV",
                },
              ]}
            >
              <Input.Password
                placeholder="123"
                maxLength={3}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Nombre completo"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Ingresa el nombre completo",
            },
          ]}
        >
          <Input placeholder="Isaac Montiel" />
        </Form.Item>

        <Form.Item
          label="Monto a recargar"
          name="amount"
          rules={[
            {
              required: true,
              message: "Ingresa un monto",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            prefix="$"
            placeholder="0.00"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SnailPayModal;