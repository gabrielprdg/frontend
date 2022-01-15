import { GetServerSideProps } from 'next'
import { Header } from "../components/Header"
import { Product } from '../components/Product'
import Slider from '../components/Slider'
import { useCart } from '../contexts/ShoppingCartContext'
import { products } from '../mock/products'
import styles from './home.module.scss'

type Product = {
  id: string
  images: Array<string>,
  name: string,
  description: string
  price: number
}

type HomeProps = {
  p: Array<Product>
}

export default function Home({ p }: HomeProps) {

  return(
    <div>
      <Header isLoginPage={false}/>
      <Slider/>
      <div className={styles.container}>
      <div className={styles.topic}> 
        <span className={styles.dash}></span>
          <p className={styles.titleProd}>CONHEÇA UM POUCO DA NOSSA LOJA </p>
        <span className={styles.dash}></span>
      </div>

      <div className={styles.contentHome}>
        <div className={styles.products}>
          {p.map((value,index) => {
            return(
              <Product key={value.id} product={value}/>
            )
          })}
          
        </div>
      </div>
      
    </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const p = products

  return {
    props: {
      p
    }
  }
}