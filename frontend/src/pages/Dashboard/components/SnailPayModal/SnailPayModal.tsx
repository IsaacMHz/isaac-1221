import { CreditCardOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
} from "antd";
import { useState } from "react";

import { useAuth } from "../../../../context/AuthContext";
import { rechargeBalance } from "../../../../services/snailPayService";

import {
  getPaymentData,
  savePaymentData,
} from "../../../../utils/paymentStorage";

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
  const [loading, setLoading] = useState(false);

  const { user, updateBalance } = useAuth();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (!user) {
        message.error("No hay un usuario autenticado");
        return;
      }

      setLoading(true);

      const response = await rechargeBalance({
        userId: user.id,
        payerEmail: user.email,
        cardNumber: values.cardNumber,
        expiration: values.expiration,
        cvv: values.cvv,
        fullName: values.fullName,
        amount: Number(values.amount),
      });

      if (
        response.status === "success" &&
        response.code === 200 &&
        response.data.status === "approved"
      ) {
        updateBalance(
          response.data.transaction_amount,
        );

        savePaymentData({
          cardNumber: values.cardNumber,
          expiration: values.expiration,
          cvv: values.cvv,
          fullName: values.fullName,
        });

        message.success(response.message);

        form.resetFields();
        onClose();

        return;
      }

      message.error(response.message);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
        return;
      }

      message.error(
        "No fue posible procesar la recarga",
      );
    } finally {
      setLoading(false);
    }
  };

  const savedPaymentData = getPaymentData();

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
      confirmLoading={loading}
      centered
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={savedPaymentData ?? undefined}
      >
        <Form.Item
          label="Número de tarjeta"
          name="cardNumber"
          rules={[
            {
              required: true,
              message:
                "Ingresa el número de tarjeta",
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
            className="snailpay-modal__amount"
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