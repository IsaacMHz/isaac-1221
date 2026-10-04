export interface User {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  balance: number;
}

export type PublicUser = Omit<
  User,
  "passwordHash" | "passwordSalt"
>;

export interface AuthSession {
  userId: string;
  isAuthenticated: boolean;
}