import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import {
  describe,
  expect,
  it,
  beforeEach,
} from "vitest";

import AuthProvider, {
  useAuth,
} from "../src/context/AuthContext";

import {
  clearAuthStorage,
  getUser,
  saveSession,
  saveUser,
} from "../src/utils/authStorage";

import type {
  AuthSession,
  User,
} from "../src/types/auth.types";

const TestComponent = () => {
  const { user, updateBalance } = useAuth();

  return (
    <button
      onClick={() => updateBalance(500)}
    >
      {user?.balance}
    </button>
  );
};

describe("AuthContext - updateBalance", () => {
  beforeEach(() => {
    clearAuthStorage();

    const user: User = {
      id: "user-123",
      fullName: "Usuario de prueba",
      email: "test@example.com",
      passwordHash: "fake-hash",
      passwordSalt: "fake-salt",
      balance: 1000,
    };

    const session: AuthSession = {
      userId: user.id,
      isAuthenticated: true,
    };

    saveUser(user);
    saveSession(session);
  });

  it("debe actualizar el balance en el estado y en LocalStorage", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("1000");

    fireEvent.click(button);

    expect(button.textContent).toBe("1500");

    const storedUser = getUser();

    expect(storedUser?.balance).toBe(1500);
  });
});