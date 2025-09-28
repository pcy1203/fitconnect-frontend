import { createContext, useState, useContext, useEffect } from "react";

type AuthContextType = {
    token: string | null;
    setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("jwt_token");
        if (savedToken) setToken(savedToken);
    }, []);

    return (
      <AuthContext.Provider value={{ token, setToken }}>
        {children}
      </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);