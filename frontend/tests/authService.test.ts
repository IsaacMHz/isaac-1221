import { describe, expect, it } from "vitest";

import { login, register } from "../src/services/authService";
import {
  clearAuthStorage,
  clearSession,
  getSession,
  getUser,
} from "../src/utils/authStorage";

describe("authService - register", () => {
  it("debe registrar un usuario con balance inicial en cero", async () => {
    clearAuthStorage();

    const user = await register({
      fullName: "Usuario de prueba",
      email: "test@example.com",
      password: "Password123",
    });

    expect(user.fullName).toBe("Usuario de prueba");
    expect(user.email).toBe("test@example.com");
    expect(user.balance).toBe(0);
    expect(user.id).toBeDefined();

    const savedUser = getUser();
    const session = getSession();

    expect(savedUser).not.toBeNull();
    expect(savedUser?.email).toBe(
      "test@example.com",
    );
    expect(savedUser?.balance).toBe(0);

    expect(session).not.toBeNull();
    expect(session?.isAuthenticated).toBe(true);
    expect(session?.userId).toBe(user.id);
  });
  it("debe rechazar el registro si el correo ya está registrado", async () => {
    clearAuthStorage();

    await register({
      fullName: "Usuario de prueba",
      email: "test@example.com",
      password: "Password123",
    });

    await expect(
      register({
        fullName: "Otro usuario",
        email: "test@example.com",
        password: "Password456",
      }),
    ).rejects.toThrow(
      "El correo electrónico ya está registrado",
    );
  });

  it("debe iniciar sesión con credenciales correctas", async () => {
    clearAuthStorage();

    await register({
      fullName: "Usuario de prueba",
      email: "test@example.com",
      password: "Password123",
    });

    clearSession();

    const user = await login({
      email: "test@example.com",
      password: "Password123",
    });

    expect(user.fullName).toBe("Usuario de prueba");
    expect(user.email).toBe("test@example.com");
    expect(user.balance).toBe(0);
    expect(user.id).toBeDefined();
  });
  it("debe rechazar el inicio de sesión con una contraseña incorrecta", async () => {
    clearAuthStorage();

    await register({
      fullName: "Usuario de prueba",
      email: "test@example.com",
      password: "Password123",
    });

    clearSession();

    await expect(
      login({
        email: "test@example.com",
        password: "Password456",
      }),
    ).rejects.toThrow(
      "El correo o la contraseña son incorrectos",
    );
  });
  it("debe rechazar el inicio de sesión si no existe un usuario registrado", async () => {
    clearAuthStorage();

    await expect(
      login({
        email: "noexiste@example.com",
        password: "Password123",
      }),
    ).rejects.toThrow(
      "No existe un usuario registrado",
    );
  });
});