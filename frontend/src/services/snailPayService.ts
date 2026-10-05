import { apiClient } from "../lib/apiClient";
import type { ApiResponse } from "../types/api.types";
import type {
  SnailPayRechargeRequest,
  SnailPayResponse,
} from "../types/snailPay.types";

const API_URL = "http://localhost:3000";

export const rechargeBalance = (
  data: SnailPayRechargeRequest,
) => {
  return apiClient<ApiResponse<SnailPayResponse>>(
    `${API_URL}/api/snailpay/recharge`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
};