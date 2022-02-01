import { useCart } from "../../contexts/ShoppingCartContext"
import styles from './styles.module.scss'


export default function PurchaseProduct() {
  const {cart, total} = useCart()

  return (
      <div className={styles.cartContent}>
        {cart.map((product,index) => {
          return ( 
            <div className={styles.cartDetails}>
              <div className={styles.imageProd}>
                <img src={product.images[0].url} alt="imageproductcart" />
              </div>
              <div className={styles.name}>{product.name} x <span className={styles.countP}>{product.count}</span><span>R${(product.price * product.count).toFixed(2)}</span></div>
            </div>
          )
        })}
        <div className={styles.cartPrice}>
          <div className={styles.subTot}>
            <div>Subtotal</div>
            <span>R${total.toFixed(2)}</span> 
          </div>
          <div className={styles.shipping}>
            <div>Custo de Frete</div> 
            <span>R${total.toFixed(2)}</span> 
          </div>
        </div>
        <div className={styles.cartTotal}>
          <span>Total</span>
          <div className={styles.tot}>
            R$ {total.toFixed(2)}
          </div>
        </div>
      </div>
  )
} 