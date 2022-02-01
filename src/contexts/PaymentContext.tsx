import Router from "next/router"
import { createContext, ReactNode, useContext, useState } from "react"
import { api } from '../../services/api'

type PaymentData = any

type PaymentContextTypes = {

  paymentResp: any
  userData: UserDataType
  userRegistration: (data: any) => void
}

type AdressType = {
  addressName: string
  number: string
  complement: string
  district: string
  cep: string
}

type UserDataType = {
  email: string
  name: string
  surname: string
  telephone: string
  address: AdressType
  cpf: string
}

export type PaymentContextProviderProps = {
  children: ReactNode
}

const PaymentContext = createContext({} as PaymentContextTypes)

export function PaymentContextProvider({ children }: PaymentContextProviderProps) {
  const [paymentResp, setPaymentResp] = useState<any>()
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType)
  

  function userRegistration(data:any) {
    setUserData(data)
    console.log('user', userData)
    Router.push('/Checkout/Payment')
  }

  return (
    <PaymentContext.Provider value={{ paymentResp, userData, userRegistration }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  return useContext(PaymentContext)
}