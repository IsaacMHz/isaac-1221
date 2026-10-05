import { CreditCardOutlined } from "@ant-design/icons";
import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  message,
  type InputNumberProps,
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

interface SnailPayFormValues {
  cardNumber: string;
  expiration: string;
  cvv: string;
  fullName: string;
  amount: number;
}

const SnailPayModal = ({
  open,
  onClose,
}: SnailPayModalProps) => {
  const [form] = Form.useForm<SnailPayFormValues>();
  const [loading, setLoading] = useState(false);

  const { user, updateBalance } = useAuth();

  const savedPaymentData = getPaymentData();

  const formatter: InputNumberProps<number>["formatter"] = (
    value,
  ) => {
    const numericValue = `${value ?? ""}`;

    const [start, end] = numericValue.split(".");

    const formattedStart = start.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ",",
    );

    return `$ ${end
      ? `${formattedStart}.${end}`
      : formattedStart
      }`;
  };

  const handleCancel = (): void => {
    form.resetFields();

    if (savedPaymentData) {
      form.setFieldsValue({
        cardNumber: savedPaymentData.cardNumber,
        expiration: savedPaymentData.expiration,
        cvv: savedPaymentData.cvv,
        fullName: savedPaymentData.fullName,
        amount: undefined,
      });
    }

    onClose();
  };

  const handleSubmit = async (): Promise<void> => {
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
      onCancel={handleCancel}
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
            {
              len: 16,
              message:
                "El número de tarjeta debe tener 16 dígitos",
            },
          ]}
        >
          <Input
            placeholder="1234 1234 1234 1234"
            maxLength={16}
            inputMode="numeric"
            onChange={(event) => {
              const value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 16);

              form.setFieldValue(
                "cardNumber",
                value,
              );
            }}
          />
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
                {
                  pattern:
                    /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message:
                    "Ingresa un vencimiento válido",
                },
              ]}
            >
              <Input
                placeholder="MM/YY"
                maxLength={5}
                inputMode="numeric"
                onChange={(event) => {
                  const digits =
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 4);

                  let formattedValue = digits;

                  if (digits.length > 2) {
                    formattedValue = `${digits.slice(
                      0,
                      2,
                    )}/${digits.slice(2)}`;
                  }

                  form.setFieldValue(
                    "expiration",
                    formattedValue,
                  );
                }}
              />
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
                {
                  len: 3,
                  message:
                    "El CVV debe tener 3 dígitos",
                },
              ]}
            >
              <Input.Password
                placeholder="123"
                maxLength={3}
                inputMode="numeric"
                onChange={(event) => {
                  const value =
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 3);

                  form.setFieldValue(
                    "cvv",
                    value,
                  );
                }}
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
              message:
                "Ingresa el nombre completo",
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
          <InputNumber<number>
            min={1}
            placeholder="0.00"
            className="snailpay-modal__amount"
            formatter={formatter}
            parser={(value) => {
              const sanitizedValue =
                value?.replace(/[^\d.]/g, "") ?? "";

              return Number(sanitizedValue) || 0;
            }}
            onKeyDown={(event) => {
              const allowedKeys = [
                "Backspace",
                "Delete",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Home",
                "End",
              ];

              if (
                allowedKeys.includes(event.key) ||
                event.ctrlKey ||
                event.metaKey
              ) {
                return;
              }

              if (!/[\d.]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SnailPayModal;