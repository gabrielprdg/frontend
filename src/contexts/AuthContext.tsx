import { createContext, ReactNode } from "react";

type AuthContextTypes = {
  isAuthentication: boolean
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextTypes)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider value={{ isAuthentication: false}}>
      {children}
    </AuthContext.Provider>
  )
}