import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { Footer } from '../components/Footer'
import { Header } from "../components/Header"
import { Product } from '../components/Product'
import { useAuth } from '../contexts/AuthContext'
import  Slider  from '../components/Slider'
import styles from './home.module.scss'
import Categories from '../components/Categories'
import { useState } from 'react'

export type Images = {
  name: string
  size: number
  key: string
  url: string
}

type Product = {
  id: string
  images: Array<Images>
  name: string,
  description: string
  price: number
  colors?: string[]
  productSize: string[]
}

export type Category = {
  id: string
  name: string
}


type HomeProps = {
  prod: Array<Product>
  latestProducts: Array<Product>
  categories: Array<Category>
}



export default function Home({ prod, latestProducts, categories }: HomeProps) {
  const { user } = useAuth()
  const [isFechtingData, setIsFetchingData] = useState(false)

  function loadAllProducts() {
    setIsFetchingData(!isFechtingData)
  }

  console.log()
  return(
    <div>
      <Header isLoginPage={false}/>
      <Slider/>
      <div className={styles.container}>
      
      <div className={styles.topic}> 
        <span className={styles.dash}></span>
          <p className={styles.titleProd}> CONHEÇA UM POUCO DA NOSSA LOJA </p>
        <span className={styles.dash}></span>
      </div>

      <Categories ct={categories}/>

      <div className={styles.contentHome}>
        <div className={styles.products}>
          {!isFechtingData ? latestProducts.map((value,index) => {
            return(
              <Product key={value.id} product={value}/>
            )
          }): prod.map((value,index) => {
            return(
              <Product key={value.id} product={value}/>
            )
          })
        }
        </div>
      </div>

      <div className={styles.showTheRest}> 
        <button className={ isFechtingData ? styles.removeButton: styles.createB} onClick={() => {loadAllProducts()}}>Exibir todos os produtos ...</button>
      </div>

      <Footer/>
    </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await api.get('products')
  const prod = products.data
  console.log('prod1')

  const latestProducts = prod.slice(0, 9)

  const categoriesData = await api.get('categories')
  const categories = categoriesData.data

  return {
    props: {
      latestProducts,
      prod,
      categories
    }
  }
}