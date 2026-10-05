export const apiClient = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options);

  const data = (await response.json()) as T;

  if (!response.ok) {
    throw new Error(
      "Ocurrió un error al procesar la solicitud",
    );
  }

  return data;
};