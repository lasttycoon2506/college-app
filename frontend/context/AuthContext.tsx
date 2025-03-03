"use client";
import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  loading: boolean;
  user: any;
  isAuthenticated: boolean;
  error: string;
};

const AuthContext = createContext<AuthContextType>({
  loading: true,
  user: null,
  isAuthenticated: false,
  error: "",
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function Login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ loading, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
}
