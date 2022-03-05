import { useCart } from "../../contexts/ShoppingCartContext"
import styles from './styles.module.scss'
import Image from 'next/image'

export default function PurchaseProduct() {
  const {cart, total, cartBuyNow} = useCart()
  

  return (
      <div className={styles.cartContent}>
        
        { cartBuyNow?.images?.length > 0 && cart.length == 0  ? 

        <div className={styles.cartDetails}>
          <div className={styles.imgWithPrice}>
            <div className={styles.imageProd}>
              <img src={cartBuyNow?.images[0].url}/>
            </div>
            <div className={styles.name}>{cartBuyNow.name} x <span className={styles.countP}>{cartBuyNow.count}</span><span>R${(cartBuyNow.price * cartBuyNow.count)}</span></div>
          </div>
          
          <div className={styles.cartPrice}>
            <div className={styles.subTot}>
              <div>Subtotal</div>
              <span>R${cartBuyNow.price}</span> 
            </div>
           
          </div>

          <div className={styles.cartTotal}>
            <span>Total</span>
            <div className={styles.tot}>
              R$ {cartBuyNow.price}
            </div>
          </div>
        </div>

        : (
          <div>
            {cart.map((product,index) => {
            return ( 
              <div>
                <div key={index} className={styles.cartDetails}>
                  <div className={styles.imgWithPrice}>
                    <div className={styles.imageProd}>
                      <img src={product?.images[0].url} alt="imageproductcart" key={product.id}/>
                    </div>
                    <div className={styles.name}>{product.name} x <span className={styles.countP}>{product.count}</span><span>R${(product.price * product.count).toFixed(2)}</span></div>
                  </div>  
                  <div className={styles.cartPrice}>
                  <div className={styles.subTot}>
                    <div>Subtotal</div>
                      <span>R${product.price}</span> 
                    </div>
                  </div>
                </div> 
              </div>
            )
          })}

          <div className={styles.cartTotal}>
            <span>Total</span>
            <div className={styles.tot}>
              R$ {total.toFixed(2)}
            </div>
          </div>
          
        
        </div>
        )
        
       
        }
        
      </div>
  )
} 

