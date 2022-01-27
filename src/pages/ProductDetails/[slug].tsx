import { GetServerSideProps } from "next";
import { Params } from "next/dist/server/router";
import { api } from "../../../services/api";
import { Header } from "../../components/Header";
import { ProductProps } from '../../components/Product';
import { useCart } from "../../contexts/ShoppingCartContext";
import styles from "./styles.module.scss";

export default function ProductDetails({product}: ProductProps) {

  const {addOnCart, handleSwapImages, index, myRef} = useCart()

  console.log(`s`,product.id)

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
          </div>
          <div className={styles.images} ref={myRef}>
            {
              product.images.map((img, index) => (
                <img src={img.url} alt="d" key={index} onClick={() => handleSwapImages(index)}/>
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
  console.log(slug)

  const productData = await api.get(`product/${slug}`)
  const product = productData.data

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    props: {
      product
    }
  }
}