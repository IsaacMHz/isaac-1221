import type {
  SnailPayRechargeRequest,
  SnailPayResponse,
} from "../types/snailPay.types.js";

const SUCCESS_CARD = "1234123412341234";
const SUCCESS_EXPIRATION = "12/26";
const SUCCESS_CVV = "543";

const REJECTED_CARD = "7777777777777777";

const SYSTEM_ERROR_CARD = "9999999999999999";

const TIMEOUT_CARD = "8888888888888888";

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

export const rechargeBalance = async (
  data: SnailPayRechargeRequest,
): Promise<SnailPayResponse> => {
  const response = createResponseBase(data);

  // Simulación de timeout de SnailPay.
  if (data.cardNumber === TIMEOUT_CARD) {
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }

  // Simulación de error interno del servicio.
  if (data.cardNumber === SYSTEM_ERROR_CARD) {
    return {
      ...response,
      status: "error",
      status_detail:
        "SnailPay no está disponible en este momento. No se realizó ninguna recarga.",
    };
  }

  // Simulación de tarjeta rechazada.
  if (data.cardNumber === REJECTED_CARD) {
    return {
      ...response,
      status: "rejected",
      status_detail:
        "La tarjeta fue rechazada. Verifica los datos o utiliza otra tarjeta.",
    };
  }

  // Validación de los datos requeridos para un cobro exitoso.
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
      status_detail:
        "La recarga fue aprobada correctamente.",
      authorization_code: `AUTH-${crypto.randomUUID()}`,
    };
  }

  // Cualquier otra combinación representa datos inválidos.
  return {
    ...response,
    status: "rejected",
    status_detail:
      "Los datos de la recarga no son válidos. Verifica la información e inténtalo nuevamente.",
  };
};