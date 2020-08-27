import React, { createContext, useContext } from "react";

interface AuthContext {
  authenticated: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
const AuthContext = createContext<Partial<AuthContext>>({
  authenticated: false,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ authenticated: false }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
