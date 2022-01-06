import { Product, ProductProps, ProductType } from '../components/Product'
import styles from './home.module.scss'
import { Header } from "../components/Header"
import Link from 'next/link'
import Slider from '../components/Slider'
import { GetServerSideProps } from 'next'
import { products } from '../mock/products'
import {} from '../components/Product'
import { DropDown } from '../components/DropDown'

type Product = {
  id: string
  image: string,
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
      <Header/>
      <Slider/>
      <div className={styles.container}>
      <div className={styles.topic}> 
        <span className={styles.dash}></span>
          <p className={styles.titleProd}>CONHEÇA UM POUCO DA NOSSA LOJA </p>
        <span className={styles.dash}></span>
      </div>
    
      <div className={styles.dropDownContainer}>
        <DropDown/>
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