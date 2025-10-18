import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    role: string | null;
    setRole: (role: string | null) => void;
    loading: boolean;
};

type JwtPayload = {
  exp: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("jwt_token"));
    const [role, setRole] = useState<string | null>(() => sessionStorage.getItem("user_role"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("jwt_token");
        const storedRole = sessionStorage.getItem("user_role");
        if (storedToken) {
          try {
            const decoded: JwtPayload = jwtDecode(storedToken);
            const now = Date.now() / 1000;
            if (decoded.exp < now) {
              sessionStorage.clear();
              setToken(null);
              setRole(null);
            } else {
              setToken(storedToken);
              setRole(storedRole);
            }
          } catch (err) {
            console.error("Invalid JWT:", err);
            sessionStorage.clear();
          }
        }
        setLoading(false);
    }, []);

    const handleSetToken = (value: string | null) => {
        setToken(value);
        if (value) sessionStorage.setItem("jwt_token", value);
        else sessionStorage.removeItem("jwt_token");
    };

  const handleSetRole = (value: string | null) => {
        setRole(value);
        if (value) sessionStorage.setItem("user_role", value);
        else sessionStorage.removeItem("user_role");
    };

    return (
      <AuthContext.Provider value={{ token, setToken: handleSetToken, role, setRole: handleSetRole, loading }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);