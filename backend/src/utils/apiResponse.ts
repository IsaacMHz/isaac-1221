import type { ApiResponse } from "../types/api.types.js";

export const createApiResponse = <T>(
  status: "success" | "error",
  code: number,
  message: string,
  data: T,
): ApiResponse<T> => {
  return {
    status,
    code,
    message,
    data,
  };
};