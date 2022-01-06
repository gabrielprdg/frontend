import { useContext, createContext } from "react"
import { ReactNode } from "react"

type ProductContextData = {
  name: string
  description: string
  price: number
}

type ProductContextProviderProps = {
  children: ReactNode
}

export const productContext = createContext({} as ProductContextData)

export default function ProductContextProvider({children}: ProductContextProviderProps) {

}