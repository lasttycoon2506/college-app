import { createContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
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
