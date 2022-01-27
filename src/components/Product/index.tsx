import Link from 'next/link'
import { Images } from '../../pages'
import styles from './styles.module.scss'

export type ProductType = {
  id: string
  images: Array<Images>,
  name: string,
  description: string
  price: number
}

export type ProductProps = {
  product: ProductType
}

export function Product ({ product }: ProductProps){

  return(
    <div className={styles.containerProduct}>
      <div className={styles.productImg}>
        <Link href={`/ProductDetails/${product.id}`}>
          <img src={product.images[0].url} alt="dress" />
        </Link>
      </div>
      <div className={styles.desc}> 
        <Link href={`/ProductDetails/${product.id}`}>
          <p className={styles.name}>{ product.name }</p>
        </Link>
      </div>
      <div className={styles.price}>R${product.price}</div>
    </div>
  )
}