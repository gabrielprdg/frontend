import Cards from '../Cards'
import styles from './styles.module.scss'

export default function PaymentCards() {
  return (
    <div className={styles.cards}>
      <div className={styles.title}>Cartões aceitos por <span>Mercado Pago</span></div>
      <Cards/>
    </div>
  )
}