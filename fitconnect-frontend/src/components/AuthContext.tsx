import { createContext, useState, useContext, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
    role: string | null;
    setRole: (role: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("jwt_token");
        const savedRole = localStorage.getItem("user_role");
        if (savedToken) setToken(savedToken);
        if (savedRole) setRole(savedRole);
    }, []);

    return (
      <AuthContext.Provider value={{ token, setToken, role, setRole }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);