import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { Header } from "../components/Header"
import { Product } from '../components/Product'
import Slider from '../components/Slider'
import { useAuth } from '../contexts/AuthContext'
import styles from './home.module.scss'

export type Images = {
  name: string
  size: number
  key: string
  url: string
}

type Product = {
  id: string
  images: Array<Images>,
  name: string,
  description: string
  price: number
}

type HomeProps = {
  prod: Array<Product>
}

export default function Home({ prod }: HomeProps) {
  const { user } = useAuth()

  console.log('oi',user?.name)
  return(
    <div>
      <Header isLoginPage={false}/>
      <div className={styles.container}>
      <div className={styles.topic}> 
        <span className={styles.dash}></span>
          <p className={styles.titleProd}>CONHEÇA UM POUCO DA NOSSA LOJA </p>
        <span className={styles.dash}></span>
      </div>

      <div className={styles.contentHome}>
        <div className={styles.products}>
          {prod.map((value,index) => {
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
  const products = await api.get('products')
  const prod = products.data

  return {
    props: {
      prod
    }
  }
}