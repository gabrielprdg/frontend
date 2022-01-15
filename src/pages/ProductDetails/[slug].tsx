import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import Button from "../../components/Button";
import { Header } from "../../components/Header";
import { ProductProps } from '../../components/Product';
import { products } from '../../mock/products';
import styles from "./styles.module.scss";
import Link from 'next/link'
import { useCart } from "../../contexts/ShoppingCartContext";

export default function ProductDetails({product}: ProductProps) {

  const {addOnCart, cart} = useCart()

  return(
    <div>
    <Header isLoginPage={false}/> 
    <div className={styles.containerDetails}>
      <div className={styles.details}>
        <div className={styles.mainImg}>
          <img src={product.images[0]} alt="imagemain" />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <h2>{product.name}</h2>
            <span>R${product.price}</span>
            <p>{product.description}</p>
          </div>
          <div className={styles.images}>
            {
              product.images.map(img => (
                <img src={img} alt="d" />
              ))
            }
          </div>
          <div className={styles.buttons}>
            
            <div className={styles.isColorfulButton}>Comprar agora</div>
      
            
            <button className={styles.isLightButton} onClick={() => addOnCart(product.id)}>Adicionar ao carrinho</button>
     
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}: Params) => {
  const { slug } = params
  const prod = products.filter(prod => {
    if(prod.id === slug)
    return prod
  })


  const product = {
    id: prod[0].id,
    name: prod[0].name,
    description: prod[0].description,
    images: prod[0].images,
    price: prod[0].price,
  }

 
 

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    props: {
      product
    }
  }
}