import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { api } from "../../services/api"
import { Images } from "../pages"
import styles from '../pages/ProductDetails/styles.module.scss'

export type ProductData = {
  id: string
  images: Array<Images>
  name: string
  description: string
  price: number
  colors?: string
  count: number
  productSize?: string
}

type ShoppingCartContextData = {
  productList: Array<ProductData>
  cart: Array<ProductData>
  index: number
  cartBuyNow: ProductData 
  isAproved: boolean
  shippingPrice: string
  addOnCart: (id: string) => void
  
  shippingValueSetter: (value: string) => void
  buyNow: (id: string, size:string, color: string) => void
  addToTotal: (value: number) => void
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
  const [ shippingPrice, setShippingPrice ] = useState('0')
  const [isAproved, setIsAproved] = useState(false)
  const myRef = useRef<HTMLDivElement>(null)

  function purchaseAproved() {
    setIsAproved(!isAproved)
  }
  
  async function productData() {
    const products = await api.get('products')
    const prod = products.data
    console.log('prod',prod)
    setProductList(prod)
  }

  useEffect (() => {
    
    const cartData = localStorage.getItem('dataCart')
    const totalData = localStorage.getItem('dataTotal')
    const cartBuyNowData = localStorage.getItem('dataCartBuyNow')
    const shippingPriceData = localStorage.getItem('dataShippingPrice')

    if(cartData){
      setCart(JSON.parse(cartData));
    }

    if(totalData) {
      setTotal(Number(totalData))
    }

    if(shippingPriceData) {
      setShippingPrice(shippingPriceData)
      addToTotalOnEffect(parseFloat(shippingPrice))
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
    localStorage.setItem('dataTotal', total.toString())
    localStorage.setItem('dataCartBuyNow', JSON.stringify(cartBuyNow))
    localStorage.setItem('dataShippingPrice', shippingPrice.toString())
  },[cart,total,cartBuyNow, shippingPrice])

  function shippingValueSetter(value: any) {
    console.log('e',value)  
    setShippingPrice(value)

    if(value!='0'){
      const t = addToTotal(parseFloat(value))
      const tot = parseFloat(t.toFixed(2))
      setTotal(tot)
    }else {
      const t = removeToTotal()
      const tot = parseFloat(t.toFixed(2))
      setTotal(tot)
    }
  }

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

  function buyNow(id: string, size: string, color:string){

    const productInBuyNow = productList.filter(element => {
      return element.id === id
    })

    console.log('ddd', productInBuyNow[0])
    productInBuyNow[0].colors = color
    productInBuyNow[0].productSize = size
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

  function addToTotal(value:number) {
   
    if (shippingPrice == '0' || shippingPrice == ''){
      const totalWithShipping = total + value
      return totalWithShipping
    }else {
      return total
    }
  }

  function addToTotalOnEffect(value: number) {
    const totalWithShipping = total + value
    console.log('d4e',totalWithShipping)
    if (totalWithShipping) {
      setTotal(totalWithShipping)
    }
    
  }

  function removeToTotal() {
    const totalWithoutShipping =  total - parseFloat(shippingPrice)
    console.log('gtr',totalWithoutShipping)
    return totalWithoutShipping
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
      productList,
      total,
      index, 
      myRef,
      shippingPrice,
      cartBuyNow,
      isAproved,
      handleSwapImages,
      removeProduct, 
      addOnCart,
      shippingValueSetter,
      buyNow,
      addToTotal,
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