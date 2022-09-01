import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { api } from '../../services/api'
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import jwt from 'jsonwebtoken'
import { toast } from "react-toastify"

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
  accessToken: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextTypes)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState('')
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'usestore-token' : token } = parseCookies()
    const { 'usestore-userdata' : user } = parseCookies()
    if(token) {
      console.log('user',user)
      setUser(JSON.parse(user))
      setAccessToken(token)
    }
  },[])

  async function signIn({ email, password }: SignInData){
    const res = await api.post('login', {
      email, 
      password
    })

    console.log('resdata',res)
    const { accessToken :token, user} = res.data
    const { role } = user 

    setAccessToken(token)


    setCookie(undefined, 'usestore-token', token, {
      maxAge: 60 * 60 * 3 // 1 hour 
    })

    setCookie(undefined, 'usestore-userdata', JSON.stringify(user), {
      maxAge: 60 * 60 * 3 // 1 hour 
    })

    setUser(user)
    console.log(role)
    role === 'admin' ? Router.push('/Admin') : Router.push('/')
    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, accessToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}