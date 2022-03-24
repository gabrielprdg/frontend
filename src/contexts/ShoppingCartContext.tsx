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
  colors?: string[]
  productSize: string[]
  count: number
}

type ShoppingCartContextData = {
  productList: Array<ProductData>
  cart: Array<ProductData>
  index: number
  cartBuyNow: ProductData 
  isAproved: boolean
  addOnCart: (id: string) => void
  buyNow: (id: string) => void

  reduction: (id: string) => void
  promotion: (id: string) => void
  getTotal: () => void
  removeProduct: (id: string) => void
  handleSwapImages: (index: number) => void
  purchaseAproved: () => void
  total: number
  myRef: any
}

type ShoppingCartContextProviderProps = {
  children: ReactNode
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextData)

export function ShoppingCartContextProvider({children}: ShoppingCartContextProviderProps) {
  const [productList, setProductList] = useState<ProductData[]>([])
  const [ cartBuyNow, setCartBuyNow ] = useState({} as ProductData)
  const [cart, setCart] = useState<ProductData[]>([])
  const [total, setTotal] = useState(0)
  const [index, setIndex] = useState(0)
  const [isAproved, setIsAproved] = useState(false)
  const myRef = useRef<HTMLDivElement>(null)

  function purchaseAproved() {
    setIsAproved(!isAproved)
  }
  
  async function productData() {
    try {
      const products = await api.get('products')
      const prod = products.data
      console.log('prod',prod)
      setProductList(prod)
    }catch(err) {
      console.log(err)
    }
  };

  useEffect (() => {
    
    const cartData = localStorage.getItem('dataCart')
    const totalData = localStorage.getItem('dataTotal')
    const cartBuyNowData = localStorage.getItem('dataCartBuyNow')

    if(cartData){
      setCart(JSON.parse(cartData));
    }

    if(totalData) {
      setTotal(Number(totalData))
    }

    if(cartBuyNowData) {
      try {
        setCartBuyNow(JSON.parse(cartBuyNowData))
      } catch(err) {
        console.log(err)
      }
      
    }

    productData()

  },[])
  
  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart))
    localStorage.setItem('dataTotal', total?.toString())
    localStorage.setItem('dataCartBuyNow', JSON.stringify(cartBuyNow))
  },[cart,total,cartBuyNow])

  function addOnCart (id: string) {
    console.log(productList,process.env.PUBLIC_KEY_MERCADO_PAGO)
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

  function buyNow(id: string){

    const productInBuyNow = productList.filter(element => {
      return element.id === id
    })

    console.log('ddd', productInBuyNow[0])

    setCartBuyNow(productInBuyNow[0])
    setTotal(Number(productInBuyNow[0]?.price))
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
    
    setTotal(Number(tot.toFixed(2)))
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
    <ShoppingCartContext.Provider value={{
      productList,total,
      index, 
      myRef,
      cartBuyNow,
      isAproved,
      handleSwapImages,
      removeProduct, 
      addOnCart, 
      buyNow,
      getTotal,
      reduction, 
      promotion, 
      purchaseAproved,
      cart}}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(ShoppingCartContext)
}