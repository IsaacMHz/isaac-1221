export interface SavedPaymentData {
  cardNumber: string;
  expiration: string;
  cvv: string;
  fullName: string;
}

const PAYMENT_KEY = "snailraces_payment";

export const savePaymentData = (
  data: SavedPaymentData,
): void => {
  localStorage.setItem(
    PAYMENT_KEY,
    JSON.stringify(data),
  );
};

export const getPaymentData = (): SavedPaymentData | null => {
  const data = localStorage.getItem(PAYMENT_KEY);

  if (!data) {
    return null;
  }

  try {
    return JSON.parse(data) as SavedPaymentData;
  } catch {
    return null;
  }
};

export const clearPaymentData = (): void => {
  localStorage.removeItem(PAYMENT_KEY);
};