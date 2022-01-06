import styles from './styles.module.scss'
import Link from 'next/link'
import { products } from '../../mock/products'

export type ProductType = {
  id: string
  image: string,
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
      <Link href={`/ProductDetails/${product.id}`}>
        <img src={product.image} alt="dress"  className={styles.productImg}/>
      </Link>
      <div className={styles.desc}> 
        <p className={styles.name}>{ product.name }</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      <div className={styles.price}>R${product.price}</div>
    </div>
  )
}