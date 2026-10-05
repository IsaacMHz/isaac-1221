import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginUser,
  register as registerUser,
} from "../services/authService";

import type { PublicUser } from "../types/auth.types";

import {
  clearSession,
  getSession,
  getUser,
  saveUser,
} from "../utils/authStorage";

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  updateBalance: (amount: number) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<
  AuthContextValue | undefined
>(undefined);

const getPublicUser = (): PublicUser | null => {
  const session = getSession();

  if (!session?.isAuthenticated) {
    return null;
  }

  const storedUser = getUser();

  if (!storedUser) {
    return null;
  }

  const {
    passwordHash,
    passwordSalt,
    ...publicUser
  } = storedUser;

  return publicUser;
};

const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<PublicUser | null>(
    getPublicUser,
  );

  const register = async (
    data: RegisterData,
  ): Promise<void> => {
    const registeredUser = await registerUser(data);

    setUser(registeredUser);
  };

  const login = async (
    data: LoginData,
  ): Promise<void> => {
    const loggedUser = await loginUser(data);

    setUser(loggedUser);
  };

  const updateBalance = (amount: number): void => {
    const storedUser = getUser();

    if (!storedUser) {
      return;
    }

    const updatedUser = {
      ...storedUser,
      balance: storedUser.balance + amount,
    };

    saveUser(updatedUser);

    setUser({
      id: updatedUser.id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      balance: updatedUser.balance,
    });
  };

  const logout = (): void => {
    clearSession();
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: user !== null,
    register,
    login,
    logout,
    updateBalance,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider",
    );
  }

  return context;
};

export default AuthProvider;