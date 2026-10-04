import type { AuthSession, User } from "../types/auth.types";

const USER_KEY = "snailraces_user";
const SESSION_KEY = "snailraces_session";

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as User;
};

export const saveSession = (session: AuthSession): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getSession = (): AuthSession | null => {
  const session = localStorage.getItem(SESSION_KEY);

  if (!session) {
    return null;
  }

  return JSON.parse(session) as AuthSession;
};

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

export const clearAuthStorage = (): void => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(SESSION_KEY);
};