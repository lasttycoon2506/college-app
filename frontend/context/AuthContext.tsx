"use client";
import { User } from "@/models/user";
import { UserApplication } from "@/models/userApplication";
import { useRouter } from "next/navigation";
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
  const { replace } = useRouter();
  const [user, setUser] = useState<User | null>(() => {
    const storedValue = localStorage.getItem("user");
    return storedValue ? JSON.parse(storedValue) : "";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
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
      const resAsJson = await res.json();
      if (resAsJson.error) {
        setError("Incorrect Email or Password!");
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
      const userApplications = await getUserApplications();
      loadedUser.userApplications = userApplications;
      setIsAuthenticated(true);
      setUser(loadedUser);
      setError("");
    } catch (error: any) {
      setError(error);
    }
  }

  async function getUserApplications(): Promise<UserApplication[]> {
    try {
      const res: Response = await fetch("/api/userApplications");
      if (!res.ok) {
        const error = await res.json();
        return error;
      }
      const data = await res.json();
      const userApplications: UserApplication[] = data.body.userApplications;
      return userApplications;
    } catch (error: any) {
      setError(error);
      return error;
    }
  }

  async function logout(): Promise<void> {
    try {
      const res: Response = await fetch("/api/logout", { method: "DELETE" });
      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setError("");
        replace("/");
      } else {
        const error = await res.json();
        setError(error.message);
        return;
      }
    } catch (error: any) {
      setError(error);
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
