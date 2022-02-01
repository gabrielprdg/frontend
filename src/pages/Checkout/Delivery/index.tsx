import FormPersonal from '../../../components/FormPersonal'
import { Header } from '../../../components/Header'
import PurchaseProduct from '../../../components/PurchaseProduct'
import styles from './styles.module.scss'

export default function Checkout () {

  return (
    <div className={styles.checkoutContainer}>
      <Header isLoginPage/>
      <FormPersonal/>
      <PurchaseProduct/>
    </div>
  )

}