import { describe, expect, it } from "vitest";
import { rechargeBalance } from "../services/snailPay.service.js";



describe("SnailPay - rechargeBalance", () => {
  it("debe aprobar una recarga con datos válidos", async () => {
    const response = await rechargeBalance({
      userId: "123",
      payerEmail: "test@example.com",
      cardNumber: "1234123412341234",
      expiration: "12/26",
      cvv: "543",
      fullName: "Usuario de prueba",
      amount: 500,
    });

    expect(response.status).toBe("approved");
    expect(response.status_detail).toBe(
      "La recarga fue aprobada correctamente.",
    );
    expect(response.transaction_amount).toBe(500);
    expect(response.payer_id).toBe("123");
    expect(response.payer_email).toBe(
      "test@example.com",
    );
  });

  it("debe rechazar una tarjeta no autorizada", async () => {
    const response = await rechargeBalance({
      userId: "123",
      payerEmail: "test@example.com",
      cardNumber: "7777777777777777",
      expiration: "12/26",
      cvv: "543",
      fullName: "Usuario de prueba",
      amount: 500,
    });

    expect(response.status).toBe("rejected");

    expect(response.status_detail).toBe(
      "La tarjeta fue rechazada. Verifica los datos o utiliza otra tarjeta.",
    );

    expect(response.transaction_amount).toBe(500);
  });

  it("debe devolver un error cuando SnailPay presenta una falla interna", async () => {
    const response = await rechargeBalance({
      userId: "123",
      payerEmail: "test@example.com",
      cardNumber: "9999999999999999",
      expiration: "12/26",
      cvv: "543",
      fullName: "Usuario de prueba",
      amount: 500,
    });

    expect(response.status).toBe("error");

    expect(response.status_detail).toBe(
      "SnailPay no está disponible en este momento. No se realizó ninguna recarga.",
    );

    expect(response.transaction_amount).toBe(500);
  });
  it("debe rechazar una recarga con datos inválidos", async () => {
    const response = await rechargeBalance({
      userId: "123",
      payerEmail: "test@example.com",
      cardNumber: "1234123412341234",
      expiration: "12/26",
      cvv: "543",
      fullName: "Usuario de prueba",
      amount: 0,
    });

    expect(response.status).toBe("rejected");

    expect(response.status_detail).toBe(
      "Los datos de la recarga no son válidos. Verifica la información e inténtalo nuevamente.",
    );

    expect(response.transaction_amount).toBe(0);
  });
});