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

  return (
    <AuthContext.Provider value={{ loading, user, isAuthenticated, error }}>
      {children}
    </AuthContext.Provider>
  );
}
