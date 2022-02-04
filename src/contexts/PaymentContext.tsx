import Router from "next/router"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"
import { api } from '../../services/api'
import { ProfileProps } from "../components/FormPayment"

export interface InstallmentsItemProps {
  installments: number
  recommended_message: string
}

export interface CheckoutProps {
  useProfile: ProfileProps
  setProfile: Dispatch<SetStateAction<ProfileProps>>
  userData: UserDataType
  userRegistration:(data:any) => void
  useInstallments: InstallmentsItemProps[]
  setInstallments: Dispatch<SetStateAction<InstallmentsItemProps[]>>
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

const PaymentContext = createContext<CheckoutProps>(null!)

export function PaymentContextProvider({children}: PaymentContextProviderProps) {
  const [paymentResp, setPaymentResp] = useState<any>()
  const [ userData, setUserData ] = useState<UserDataType>({} as UserDataType)
  const [ useProfile, setProfile  ] = useState<ProfileProps>({})
  const [ useInstallments, setInstallments ] = useState([
    {
      installments: 1,
      recommended_message: 'Parcelas'
    }
  ])
  

  function userRegistration(data:any) {
    setUserData(data)
    console.log('user', userData)
    Router.push('/Checkout/Payment')
  }

  return (
    <PaymentContext.Provider value={{ 
      userData, 
      userRegistration, 
      useProfile, 
      setProfile ,
      useInstallments,
      setInstallments
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export const usePayment = () => {
  return useContext(PaymentContext)
}