"use client";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  error: "",
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { replace } = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    const storedValue = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null;
    return storedValue ? JSON.parse(storedValue) : "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  useEffect(() => {
    if (!user) getUser();
  }, [user]);

  async function login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
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
      replace("/");
    } catch (error: any) {
      setError(error);
    }
  }

  async function getUser(): Promise<void> {
    try {
      const res: Response = await fetch("/api/user");

      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }

      const data = await res.json();
      const loadedUser: User = data.body.user;
      setIsAuthenticated(true);
      setUser(loadedUser);
      setError("");
    } catch (error: any) {
      setError(error);
    }
  }

  async function logout(): Promise<void> {
    try {
      const res: Response = await fetch("/api/logout", { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        return;
      }

      setIsAuthenticated(false);
      setUser(null);
      setError("");
    } catch (error: any) {
      setError(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
