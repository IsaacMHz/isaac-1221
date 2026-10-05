export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 3000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    const data = (await response.json()) as T & {
      message?: string;
    };

    if (!response.ok) {
      throw new Error(
        data.message ??
          "No fue posible procesar la solicitud.",
      );
    }

    return data;
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "SnailPay tardó demasiado en responder. No se realizó ninguna recarga. Intenta nuevamente.",
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};