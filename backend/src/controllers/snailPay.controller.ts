import type { Request, Response } from "express";

import { rechargeBalance } from "../services/snailPay.service.js";
import { createApiResponse } from "../utils/apiResponse.js";
import type { SnailPayRechargeRequest } from "../types/snailPay.types.js";

export const recharge = (
  req: Request,
  res: Response,
): void => {
  try {
    const data = req.body as SnailPayRechargeRequest;

    const response = rechargeBalance(data);

    if (response.status === "approved") {
      res.status(200).json(
        createApiResponse(
          "success",
          200,
          "Cobro aprobado correctamente",
          response,
        ),
      );

      return;
    }

    if (response.status === "rejected") {
      res.status(200).json(
        createApiResponse(
          "error",
          200,
          "La transacción fue rechazada",
          response,
        ),
      );

      return;
    }

    res.status(500).json(
      createApiResponse(
        "error",
        500,
        "SnailPay no pudo procesar la operación",
        response,
      ),
    );
  } catch {
    res.status(500).json(
      createApiResponse(
        "error",
        500,
        "Error al procesar la solicitud de SnailPay",
        null,
      ),
    );
  }
};