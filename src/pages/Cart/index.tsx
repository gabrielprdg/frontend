import Link from 'next/link';
import { useEffect } from "react";
import { Header } from "../../components/Header";
import { useCart } from "../../contexts/ShoppingCartContext";
import styles from "./styles.module.scss";

export default function Cart () {
  
  const {cart, total, promotion, reduction, getTotal, removeProduct} = useCart()

  useEffect(() => {
    getTotal()
  },)

  useEffect(() => {

  })

  if(cart.length == 0){
    return (
      <div className={styles.noProducts}>
        <Header isLoginPage/>
        <span>Nenhum produto adicionado no carrinho</span>
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
          
          <div className={styles.tab}>
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
            
            <tbody className={styles.tbody}>
  
            {cart.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td>
                    <div className={styles.imageProd}>
                      <img src={product.images[0]} alt="imageproductcart" />
                    </div>
                  </td>
                  <td className={styles.name}><span>Nome  </span>{product.name}</td>
                  <td className={styles.price}><span>Preço  </span>R${product.price}</td>
                  <td className={styles.amount}>
                      <div className={styles.qtd}><span>Quantidade</span></div>
                      <div className={styles.qtdButtons}>
                        <button className={styles.count} onClick={() => reduction(product.id)}> - </button>
                        <span>{product.count}</span>
                        <button className={styles.count} onClick={() => promotion(product.id)}> + </button>
                      </div>
                  </td>
                  <td className={styles.totalPerProd}><span>Total</span>R${product.price * product.count}</td>
                  <td className={styles.d}>
                    <div className={styles.removeItem} onClick={() => removeProduct(product.id)}>
                      <img src="/x.svg" alt="closeimge" />
                    </div>
                  </td>
                </tr>
              )
            })}
            </tbody>           
          </table>
  
          </div>
          
          <div className={styles.titleTotal}>Total no carrinho</div>
          
          <div className={styles.tabTotal}>
            <table className={styles.total} cellSpacing={0}>
              <tbody>
                <tr>
                  <th>
                    <td>Subtotal <span>R${total}</span></td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Entrega<span>SEDEX - Frete grátis</span></td>
                  </th>
                </tr>
                <tr>
                  <th>
                    <td>Total<span>R${total}</span></td>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
  
          <div className={styles.finalizePurchaseContainer}>
            <Link href="/Checkout">
              <button className={styles.finalizePurchase}>Finalizar compra</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}