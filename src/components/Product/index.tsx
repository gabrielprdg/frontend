import styles from './styles.module.scss'
import Link from 'next/link'
import { products } from '../../mock/products'

export type ProductType = {
  id: string
  images: Array<string>,
  name: string,
  description: string
  price: number
}

export type ProductProps = {
  product: ProductType
}

export function Product ({ product }: ProductProps){
  console.log(product.images[0])
  return(
    <div className={styles.containerProduct}>
      <div className={styles.productImg}>
        <Link href={`/ProductDetails/${product.id}`}>
          <img src={product.images[0]} alt="dress" />
        </Link>
      </div>
      <div className={styles.desc}> 
        <p className={styles.name}>{ product.name }</p>
      </div>
      <div className={styles.price}>R${product.price}</div>
    </div>
  )
}