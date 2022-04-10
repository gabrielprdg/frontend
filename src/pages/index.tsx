import { GetServerSideProps } from 'next'
import { api } from '../../services/api'
import { Footer } from '../components/Footer'
import { Header } from "../components/Header"
import { Product } from '../components/Product'
import { useAuth } from '../contexts/AuthContext'
import  Slider  from '../components/Slider'
import styles from './home.module.scss'
import Categories from '../components/Categories'
import { ReactNode, useEffect, useState } from 'react'

export type Images = {
  name: string
  size: number
  key: string
  url: string
}

export type Product = {
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
  const [isItemSelected, setIsItemSelected] = useState(true)
  const [ category, setCategory ] = useState('')
  const [ productsByCat, setProductsByCat] = useState<Product[]>([])
  function loadAllProducts() {
    setIsFetchingData(!isFechtingData)
 
  }

  function handleOptions() {
    setIsFetchingData(false)
  }

  async function getCategory(category: string) {
    try {
     
      setCategory(category)
      const productsByCategory:any = await api.get(`products/${category}`)
      console.log('e', productsByCategory.data)
      setProductsByCat(productsByCategory.data)
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log('pro', productsByCat)

  },[])

 

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

      <Categories ct={categories} getCategory={getCategory} handleOptions={handleOptions}/>

      <div className={styles.contentHome}>
        <div className={styles.products}>
        {
          //Condition 1
          !isFechtingData  ?
          //Condition 2
          productsByCat.length ?
            //Expression 1           
            productsByCat.map((value,index) => {
            return(
              <Product key={value.id} product={value}/>
            )
          })
          : 
          //Expression 2
          latestProducts.map((value,index) => {
            return(
                <Product key={value.id} product={value}/>
              )
            })
          :
          //Expression 3
          prod.map((value,index) => {
            return(
              <Product key={value.id} product={value}/>
            )
           })
        }
        </div>
      </div>

      <div className={styles.showTheRest}> 
        <button className={ isFechtingData || productsByCat.length ? styles.removeButton: styles.createB} onClick={() => {loadAllProducts()}}>Exibir todos os produtos ...</button>
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