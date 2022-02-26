import { createContext, useContext, Dispatch, SetStateAction, MutableRefObject } from 'react'

export type Address = {
  streetName: string
  streetNumber: string
  complement: string
  district: string
  cep: string
  state: string
}

export type ProfileShipping = {
  email: string
  firstName: string
  surname: string
  telephone: string
  address: Address
  doc: string
} 

export interface ProfileProps {
  display_name?: string
  e_mail?: string
  e_mail_valid?: string
  card_number?: string
  card_month?: string
  card_year?: string
  code?: string
  doc?: string
  issuer?: string
  slt_installment?: number
}


export interface SectionProps {
  screen: number
  id?: number
}

export interface InstallmentsItemProps {
  installments: number
  recommended_message: string

}

type WithChildren = { children?: React.ReactNode }
type ProviderProps = WithChildren & CheckoutProps
export interface CheckoutProps {
  useProfile: ProfileProps
  setProfile: Dispatch<SetStateAction<ProfileProps>>
  useInstallments: InstallmentsItemProps[]
  setInstallments: Dispatch<SetStateAction<InstallmentsItemProps[]>>
  useProfileShipping: ProfileShipping
  setProfileShipping:Dispatch<SetStateAction<ProfileShipping>>
  formRef: MutableRefObject<HTMLFormElement>
  cardNumberRef: any
}

const ElementContext = createContext<CheckoutProps>(null!)

export default function ElementProvider({
  children,
  useProfile,
  setProfile,
  useInstallments,
  setInstallments,
  formRef,
  useProfileShipping,
  setProfileShipping,
  cardNumberRef
}: ProviderProps) {
  return (
    <ElementContext.Provider
      value={{
        useProfile,
        setProfile,
        useInstallments,
        setInstallments,
        formRef,
        useProfileShipping,
        setProfileShipping,
        cardNumberRef
      }}
    >
      {children}
    </ElementContext.Provider>
  )
}

export function SnapshotProfile() {
  const context = useContext(ElementContext)
  const { useProfile, setProfile } = context
  return { useProfile, setProfile }
}

export function SnapshotInstallments() {
  const context = useContext(ElementContext)
  const { useInstallments, setInstallments } = context
  return { useInstallments, setInstallments }
}

export function SnapshotRef() {
  const context = useContext(ElementContext)
  const { formRef } = context
  return { formRef }
}

export function SnapshotProfileShipping() {
  const context = useContext(ElementContext)
  const { useProfileShipping, setProfileShipping } = context
  return { useProfileShipping, setProfileShipping }
}

export function SnapshotCardNumberRef() {
  const context = useContext(ElementContext)
  const { cardNumberRef } = context
  return { cardNumberRef }
}
