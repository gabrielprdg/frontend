import { useEffect, useState } from 'react'
import FormPersonal from '../../../components/FormPersonal'
import { Header } from '../../../components/Header'
import PurchaseProduct from '../../../components/PurchaseProduct'
import styles from './styles.module.scss'
import ArrowDown from '../../../../public/seta-para-baixo.svg'
import ArrowUp from '../../../../public/up-arrow.svg'
import Image  from 'next/image'
import { ProductData, useCart } from '../../../contexts/ShoppingCartContext'
import {calcularPrecoPrazo, consultarCep, rastrearEncomendas} from 'correios-brasil';


export type ShippingTypes = {
  sCepOrigem: string
  sCepDestino: string
  nVlPeso: string
  nCdFormato: string
  nVlComprimento: string
  nVlAltura: string
  nVlLargura: string
  nCdServico: Array<string>, //Array com os códigos de serviço
  nVlDiametro: string
}


export default function Delivery () {
  const [isOpen, setIsOpen] = useState(false)
  
  const { cartBuyNow, total, cart } = useCart()
  const [ shippingValue, setShippingValue] = useState(0)
  const [ buyNow, setBuyNow] = useState({} as ProductData)
  const [ tot, setTot ] = useState(0)
   


  function handleOpenToggle (){
    setIsOpen(!isOpen)
  }

 

  return (
    <div className={styles.checkoutContainer}>
      <Header isLoginPage/>
      <div className={styles.checkoutPersonal} >
        <div className={styles.productToggle} onClick={() => {handleOpenToggle()}}>
          {!isOpen ?  
            <div className={styles.arrowDown}>
              <Image src={ArrowDown}/>
            </div>  
          :
            <div className={styles.arrowDown}>
              <Image src={ArrowUp}/>
            </div>
          }
            
          <div>
            Ver detalhes de pedido
          </div>
          {cartBuyNow?.price && cart.length == 0 ? 
            <div className={styles.totToggle}>
              R${total}
            </div>
          : 
            <div className={styles.totToggle}>
              R${total}
            </div>
          }
          
        </div>
        <div className={isOpen ? styles.formPersonal: ''}>
          <FormPersonal />
        </div>

        

        <div className={isOpen ? styles.purchaseToggle: styles.noPurchaseToggle}>
          <PurchaseProduct/>
        </div>
      </div>
    </div>
  )

}