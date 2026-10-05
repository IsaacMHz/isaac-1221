import type {
  SnailPayRechargeRequest,
  SnailPayResponse,
} from "../types/snailPay.types.js";

const SUCCESS_CARD = "1234123412341234";
const SUCCESS_EXPIRATION = "12/26";
const SUCCESS_CVV = "543";

const SYSTEM_ERROR_CARD = "9999999999999999";

const createResponseBase = (
  data: SnailPayRechargeRequest,
): SnailPayResponse => {
  return {
    id: crypto.randomUUID(),
    status: "",
    status_detail: "",
    transaction_amount: data.amount,
    date_created: new Date().toISOString(),
    authorization_code: "",
    reference: `SNP-${crypto.randomUUID()}`,
    payer_id: data.userId,
    payer_email: data.payerEmail,
    card_number: data.cardNumber,
    cvv: data.cvv,
  };
};

export const rechargeBalance = (
  data: SnailPayRechargeRequest,
): SnailPayResponse => {
  const response = createResponseBase(data);

  // Simulación de error interno del servicio
  if (data.cardNumber === SYSTEM_ERROR_CARD) {
    return {
      ...response,
      status: "error",
      status_detail:
        "Error interno del servicio de SnailPay",
    };
  }

  // Datos válidos para realizar el cobro
  const isSuccessfulTransaction =
    data.cardNumber === SUCCESS_CARD &&
    data.expiration === SUCCESS_EXPIRATION &&
    data.cvv === SUCCESS_CVV &&
    data.fullName.trim() !== "" &&
    data.amount > 0;

  if (isSuccessfulTransaction) {
    return {
      ...response,
      status: "approved",
      status_detail: "Cobro aprobado",
      authorization_code: `AUTH-${crypto.randomUUID()}`,
    };
  }

  // Cualquier otra combinación simula un rechazo
  return {
    ...response,
    status: "rejected",
    status_detail:
      "La transacción fue rechazada por SnailPay",
  };
};