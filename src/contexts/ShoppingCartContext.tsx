import { useContext, createContext, useState, useEffect } from "react"
import { ReactNode } from "react"
import { NavItem } from "react-bootstrap"
import {products} from '../mock/products'

type ProductData = {
  id: string
  images: Array<string>,
  name: string,
  description: string
  price: number
  count: number
}

type ShoppingCartContextData = {
  productList: Array<ProductData>
  cart: Array<ProductData>
  index: number
  addOnCart: (id: string) => void
  reduction: (id: string) => void
  promotion: (id: string) => void
  getTotal: () => void
  removeProduct: (id: string) => void
  handleSwapImages: (index: number) => void
  total: number

}

type ShoppingCartContextProviderProps = {
  children: ReactNode
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export function ShoppingCartContextProvider({children}: ShoppingCartContextProviderProps) {
  const [productList, setProductList] = useState<ProductData[]>([])
  const [cart, setCart] = useState<ProductData[]>([])
  const [total, setTotal] = useState(0)
  const [index, setIndex] = useState(0)
  
  useEffect(() => {
    const cartData = localStorage.getItem('dataCart')
    const totalData = localStorage.getItem('totalCart')

    if(cartData){
      setCart(JSON.parse(cartData));
    }

    if(totalData) {
      setTotal(JSON.parse(totalData))
    }

    setProductList(products)
  },[])
  
  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart))
    localStorage.setItem('dataTotal', JSON.stringify(total))
  },[cart,total])

  function addOnCart (id: string) {
    const check = cart.every(item => {
      return item.id !== id
    })

    if(check) {
      const productsInCart = productList.filter(product => {
        return product.id === id
      })

      setCart([...cart, ...productsInCart])
      getTotal()
    }else {
      alert('Produto ja adicionado no carrinho')
    }
  }

  function reduction (id:string) {
    cart.forEach(item => {
      if(item.id === id) {
        item.count === 1 ? item.count = 1 : item.count-=1
        setTotal(item.count*item.price)
      }
    })

    setCart([...cart])
    getTotal()
  }

  function promotion (id:string) {
    cart.forEach(item => {
      if(item.id === id) {
        item.count += 1
        setTotal(item.count*item.price)
      }
    })

    setCart([...cart])
    getTotal()
  }

  function getTotal() {
    const tot = cart.reduce((prev, item) => {
      console.log('prev',prev)
      return prev + (item.price * item.count)
    },0)
    
    setTotal(tot)
  }

  function removeProduct(id: string) {
    cart.forEach((item, index) => {
      if(item.id === id){
        cart.splice(index,1)
      }
    })

    setCart([...cart])
    getTotal()
  }

  function handleSwapImages(index: number) {
    setIndex(index)
  }

  return (
    <ShoppingCartContext.Provider value={{productList,total, index, handleSwapImages,removeProduct, addOnCart, getTotal, reduction, promotion, cart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(ShoppingCartContext)
}