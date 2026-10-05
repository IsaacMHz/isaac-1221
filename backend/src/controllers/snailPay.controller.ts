import type { Request, Response } from "express";

import { rechargeBalance } from "../services/snailPay.service.js";
import { createApiResponse } from "../utils/apiResponse.js";
import type { SnailPayRechargeRequest } from "../types/snailPay.types.js";

export const recharge = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const data =
      req.body as SnailPayRechargeRequest;

    const response = await rechargeBalance(data);

    if (response.status === "approved") {
      res.status(200).json(
        createApiResponse(
          "success",
          200,
          "La recarga fue aprobada correctamente.",
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
          response.status_detail,
          response,
        ),
      );

      return;
    }

    res.status(500).json(
      createApiResponse(
        "error",
        500,
        response.status_detail,
        response,
      ),
    );
  } catch {
    res.status(500).json(
      createApiResponse(
        "error",
        500,
        "No fue posible comunicarse con SnailPay. Intenta nuevamente.",
        null,
      ),
    );
  }
};