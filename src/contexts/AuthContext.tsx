import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from '../../services/api'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import jwt from 'jsonwebtoken'

type SignInData = {
  email: string
  password: string
}

type User = {
  id: string
  name: string
  email: string
  role?: string
}

type AuthContextTypes = {
  isAuthenticated: boolean
  signIn: (data: SignInData) => void
  user: User | null
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextTypes)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'usestore-token' : token } = parseCookies()
    const { 'usestore-userdata' : user } = parseCookies()
    if(token) {
      setUser(JSON.parse(user))
    }
  },[])

  async function signIn({email, password}: SignInData){
    const res = await api.post('login', {
      email, 
      password
    })

    console.log(res.data)
    const { accessToken :token, user } = res.data

    setCookie(undefined, 'usestore-token', token, {
      maxAge: 60 * 60 * 1 // 1 hour 
    })

    setCookie(undefined, 'usestore-userdata', user, {
      maxAge: 60 * 60 * 1 // 1 hour 
    })

    setUser(user)

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}