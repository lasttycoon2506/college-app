"use client";
import { User } from "@/models/user";
import { UserApplication } from "@/models/user-application";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  error: string;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  error: "",
  login: async () => Promise.resolve(),
  logout: async () => Promise.resolve(),
  getUser: async () => Promise.resolve(),
});

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { replace }: AppRouterInstance = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    const storedValue = localStorage?.getItem("user");
    return storedValue ? JSON.parse(storedValue) : "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
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

      const result = await res.json();
      if (result.status !== 200) {
        setError("Incorrect Email or Password!");
        setIsAuthenticated(false);
        return;
      }

      getUser();
      setIsAuthenticated(true);
      setError("");
      replace("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error.message);
      } else {
        setError("unknown error occured while logging in");
        console.error("unknown error occured while logging in");
      }
    }
  }

  async function getUser(): Promise<void> {
    try {
      const res: Response = await fetch("/api/user");
      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        return;
      }

      const loadedUser: User = result.body;
      const userApplications: UserApplication[] = await getUserApplications();
      loadedUser.userApplications = userApplications;
      setIsAuthenticated(true);
      setUser(loadedUser);
      setError("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error.message);
      } else {
        setError("unknown error occured while loading user");
        console.error("unknown error occured while loading user");
      }
    }
  }

  async function getUserApplications(): Promise<UserApplication[]> {
    try {
      const res: Response = await fetch("/api/userApplications");
      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
      }
      const userApplications: UserApplication[] = result.body;
      return userApplications;
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error.message);
      } else {
        setError("unknown error occured while retrieving user apps");
        console.error("unknown error occured while retrieving user apps");
      }
      return [];
    }
  }

  async function logout(): Promise<void> {
    try {
      const res: Response = await fetch("/api/logout", { method: "DELETE" });
      const result = await res.json();
      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setError("");
        replace("/");
      } else {
        setError(result.error);
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error(error.message);
      } else {
        setError("unknown error occured while logging out");
        console.error("unknown error occured while logging out");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
