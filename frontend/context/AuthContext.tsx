"use client";
import { User } from "@/models/user";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

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

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { replace } = useRouter();

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
      const loadedUser: User = data.body;
      setIsAuthenticated(true);
      setUser(loadedUser);
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
