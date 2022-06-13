import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { style } from "@mui/system";
import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import Router from "next/router";
import { useRef, useState } from "react";
import { api } from "../../../services/api";
import { ColorOptions } from "../../components/ColorOptions";
import { Header } from "../../components/Header";
import { ProductProps } from '../../components/Product';
import { useCart } from "../../contexts/ShoppingCartContext";
import styles from "./styles.module.scss";

export default function ProductDetails({product}: ProductProps) {

  const {addOnCart, buyNow, handleSwapImages, index, myRef} = useCart()

  const [ size, setSize ] = useState<string>("")
  const [ color, setColor ] = useState<string>("")
  const [ isLoading, setIsLoading ] = useState(false)
  const [ colorSelected, setColorSelected ] = useState(false)
 
  const colorRef = useRef<HTMLDivElement>(null)

  const [sizeSelected, setSizeSelected] = useState('')

  function handleSwapColor(color: string, index: number) {
    console.log('idx',index)
    const node = colorRef.current as any 
    const cl = node.children
    for (let i = 0; i< cl.length; i ++) {
      cl[i].className = cl[i].className.replace("active", "")
    }
    console.log(cl)
    cl[index].className = styles.active
    setColor(color)
    console.log(color)
  }

  console.log(`s`, size)


  function setBuyNow (id: string) {
    setIsLoading(!isLoading)
    console.log('idpr',id)
    buyNow(id)
    Router.push('/Checkout/Delivery')
  }

  function handleSelectSize(event: EventTarget & HTMLSelectElement){
    setSize(event.value)
  }

  function handleSelectColor(color: string, index: number) {
    console.log(index)
    setColorSelected(!colorSelected)
    setColor(color)
  }

  return(
    <div>
    <Header isLoginPage={false}/> 
    <div className={styles.containerDetails}>
      <div className={styles.details}>
        <div className={styles.mainImg}>
          <img src={product.images[index].url} alt="imagemain" />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <h2>{product.name}</h2>
            <span>R${product.price}</span>
            <p>{product.description}</p>

            {product.colors ? (
              <span className={styles.colorTitle}>Cores</span>
            ): ''}
            <div className={styles.colors} ref={colorRef} >
              {Array.isArray(product.colors) ? product.colors.map((color,index) => (
                <div onClick={() => {handleSwapColor(color,index)}}>
                  <ColorOptions 
                    color={color} 
                    colorSelected={colorSelected}
                    index={index}
                  />
                </div>
              )): <></> }
            </div>
        
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tamanho</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tamanho"
                value={size}
                onChange={(e) => handleSelectSize((e.target as HTMLSelectElement))}
              >
                {product.productSize ? product.productSize.map((value,index) => (
                  <MenuItem 
                    key={index} 
                    value={value}
                  >
                    {value}
                  </MenuItem>
                )): (<div></div>)}

              </Select>
            </FormControl>
          </div>

          <div className={styles.images} ref={myRef}>
            {
              product.images.map((img, index) => (
                <img src={img.url} alt="d" key={index} onClick={() => handleSwapImages(index)}/>
              ))
            }
          </div>

          {
              !isLoading ? 
              <div className={styles.buttons}>
                <div 
                  className={styles.isColorfulButton}
                  onClick={() => {setBuyNow(product.id)}}
                >
                  Comprar agora
                </div>
         
                <button 
                  className={styles.isLightButton} 
                  onClick={() => addOnCart(product.id)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
              :
              <div className={styles.progressCircle}>
                <CircularProgress color="secondary"/>
              </div>
             
          }
         
        </div>
      </div>
    </div>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}: Params) => {
  const { slug } = params
  console.log(slug)

  const productData = await api.get(`product/${slug}`)
  const product = productData.data 
  console.log('prx', product)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    props: {
      product
    }
  }
}