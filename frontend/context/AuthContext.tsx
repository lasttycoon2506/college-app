"use client";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  loading: boolean;
  user: any;
  isAuthenticated: boolean;
  error: string;
  login: any;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  user: null,
  isAuthenticated: false,
  error: "",
  login: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const res: Response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      getUser();
      setIsAuthenticated(true);
      setError("");
    } catch (error: any) {
      setError(error);
    }
  }

  async function getUser() {
    try {
      const res: Response = await fetch("/api/user");

      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }
      setIsAuthenticated(true);
      setError("");
    } catch (error: any) {
      setError(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, error, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
