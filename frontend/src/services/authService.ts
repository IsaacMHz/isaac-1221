import {
  getUser,
  saveSession,
  saveUser,
} from "../utils/authStorage";

import {
  clearPaymentData,
} from "../utils/paymentStorage";

import {
  hashPassword,
  verifyPassword,
} from "../utils/password";

import type {
  AuthSession,
  PublicUser,
  User,
} from "../types/auth.types";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

const generateSalt = (): string => {
  const bytes = new Uint8Array(16);

  crypto.getRandomValues(bytes);

  return Array.from(bytes)
    .map((byte) =>
      byte.toString(16).padStart(2, "0"),
    )
    .join("");
};

const toPublicUser = (
  user: User,
): PublicUser => {
  const {
    passwordHash,
    passwordSalt,
    ...publicUser
  } = user;

  return publicUser;
};

export const register = async (
  data: RegisterData,
): Promise<PublicUser> => {
  const existingUser = getUser();

  const email = data.email.trim().toLowerCase();
  const fullName = data.fullName.trim();

  if (
    existingUser &&
    existingUser.email === email
  ) {
    throw new Error(
      "El correo electrónico ya está registrado",
    );
  }

  const passwordSalt = generateSalt();

  const passwordHash = await hashPassword(
    data.password,
    passwordSalt,
  );

  const user: User = {
    id: crypto.randomUUID(),
    fullName,
    email,
    passwordHash,
    passwordSalt,
    balance: 0,
  };

  saveUser(user);

  const session: AuthSession = {
    userId: user.id,
    isAuthenticated: true,
  };

  saveSession(session);

  clearPaymentData();

  return toPublicUser(user);
};

export const login = async (
  data: LoginData,
): Promise<PublicUser> => {
  const user = getUser();

  if (!user) {
    throw new Error(
      "No existe un usuario registrado",
    );
  }

  const email = data.email.trim().toLowerCase();

  if (user.email !== email) {
    throw new Error(
      "El correo o la contraseña son incorrectos",
    );
  }

  const validPassword = await verifyPassword(
    data.password,
    user.passwordSalt,
    user.passwordHash,
  );

  if (!validPassword) {
    throw new Error(
      "El correo o la contraseña son incorrectos",
    );
  }

  const session: AuthSession = {
    userId: user.id,
    isAuthenticated: true,
  };

  saveSession(session);

  return toPublicUser(user);
};