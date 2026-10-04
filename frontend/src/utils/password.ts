const encoder = new TextEncoder();

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  const data = encoder.encode(password + salt);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data,
  );

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const verifyPassword = async (
  password: string,
  salt: string,
  passwordHash: string,
): Promise<boolean> => {
  const hash = await hashPassword(password, salt);

  return hash === passwordHash;
};