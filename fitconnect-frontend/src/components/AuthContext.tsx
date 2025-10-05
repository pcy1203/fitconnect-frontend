import { createContext, useState, useContext, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    role: string | null;
    setRole: (role: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("jwt_token"));
    const [role, setRole] = useState<string | null>(() => localStorage.getItem("user_role"));

    const handleSetToken = (value: string | null) => {
        setToken(value);
        if (value) localStorage.setItem("jwt_token", value);
        else localStorage.removeItem("jwt_token");
    };

  const handleSetRole = (value: string | null) => {
        setRole(value);
        if (value) localStorage.setItem("user_role", value);
        else localStorage.removeItem("user_role");
    };

    return (
      <AuthContext.Provider value={{ token, setToken: handleSetToken, role, setRole: handleSetRole }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);