import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { api } from "../../services/api"
import { Images } from "../pages"
import styles from '../pages/ProductDetails/styles.module.scss'

type ProductData = {
  id: string
  images: Array<Images>,
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
  myRef: any
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
  const myRef = useRef<HTMLDivElement>(null)
  
  async function productData() {
    const products = await api.get('products')
    const prod = products.data
    
    setProductList(prod)
  };

  useEffect (() => {
    
    const cartData = localStorage.getItem('dataCart')
    const totalData = localStorage.getItem('dataTotal')

    if(cartData){
      setCart(JSON.parse(cartData));
    }

    if(totalData) {
      setTotal(JSON.parse(totalData))
    }

  },[])
  
  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart))
    localStorage.setItem('dataTotal', JSON.stringify(total))
  },[cart,total])

  function addOnCart (id: string) {
    console.log(productList)
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
    
    const price = tot.toFixed(2)
    setTotal(parseFloat(tot.toFixed(2)))
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
    const node = myRef.current as any 
    const images = node.children
    for (let i = 0; i< images.length; i ++) {
      images[i].className = images[i].className.replace("active", "")
    }
    console.log(images)
    images[index].className = styles.active
  }

  return (
    <ShoppingCartContext.Provider value={{productList,total, index, myRef, handleSwapImages,removeProduct, addOnCart, getTotal, reduction, promotion, cart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(ShoppingCartContext)
}