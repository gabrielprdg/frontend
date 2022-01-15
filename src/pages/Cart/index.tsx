import { useEffect } from "react";
import { Header } from "../../components/Header";
import { useCart } from "../../contexts/ShoppingCartContext";
import styles from "./styles.module.scss";
import Link from 'next/link'
import Image from "next/image";
import Close from '../../../public/x.svg'

export default function Cart () {
  
  const {cart, total, promotion, reduction, getTotal, removeProduct} = useCart()

  useEffect(() => {
    getTotal()
  },[])

  if(cart.length == 0){
    return (
      <div className={styles.noProducts}>
        <Header isLoginPage/>
        Nenhum produto adicionado no carrinho
      </div>
    )
  }else {
    return (
      <div>
        <Header isLoginPage={false}/>
        <div className={styles.content}>
          <div className={styles.title}>
            Carrinho
          </div>
  
          <table className={styles.cartTable} cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>Produto</th>
                <th>Preco</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            
            <tbody>
  
            {cart.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>
                    <div className={styles.imageProd}>
                      <img src={product.images[0]} alt="imageproductcart" />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className={styles.amount}>
                      <button className={styles.count} onClick={() => reduction(product.id)}> - </button>
                      <span>{product.count}</span>
                      <button className={styles.count} onClick={() => promotion(product.id)}> + </button>
                    </div>
                  </td>
                  <td>R${product.price * product.count}</td>
                  <td>
                    <div className={styles.removeItem} onClick={() => removeProduct(product.id)}>
                      <img src="/x.svg" alt="closeimge" />
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>           
          </table>
  
          <div className={styles.titleTotal}>Total no carrinho</div>
       
          <table className={styles.total} cellSpacing={0}>
            <tbody>
              <tr>
                <th>
                  <td>Subtotal <span>{total}</span></td>
                </th>
              </tr>
              <tr>
                <th>
                  <td>Entrega<span>SEDEX - Frete grátis</span></td>
                </th>
              </tr>
              <tr>
                <th>
                  <td>Total<span>{total}</span></td>
                </th>
              </tr>
            </tbody>
          </table>
  
          <Link href="/Checkout">
            <button className={styles.finalizePurchase}>Finalizar compra</button>
          </Link>
        </div>
      </div>
    )
  }
}