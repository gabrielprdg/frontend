
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Cards from '../../../components/Cards'
import FormPayment from '../../../components/FormPayment'
import { Header } from '../../../components/Header'
import PaymentCards from '../../../components/PaymentCards'
import { usePayment } from '../../../contexts/PaymentContext'
import { useCart } from '../../../contexts/ShoppingCartContext'
import styles from './styles.module.scss'
import Next from '../../../../public/next.svg'
import CreditCardIcon from '../../../../public/credit-card.png'
import BankSlip from '../../../../public/codigo-de-barras.svg'
import ArrowD from '../../../../public/diagonal-arrows.svg'
import CreditCardSmall from '../../../../public/credit_card.svg'
import MercadoP from '../../../../public/mercadopago.svg'
import Offline from '../../../../public/offline.svg'


export default function Payment (){
  const [openCardOption, setOpenCardOption] = useState(false)
  const [openBankSlipOption, setOpenBankSlipOption] = useState(false)
  const [openMercadoPagoOption, setOpenMercadoPagoOption] = useState(false)
  const {cart, total} = useCart()
  const { userData } = usePayment()
  const { register, handleSubmit } = useForm()


  function handleOpenCardOption() {
    setOpenCardOption(!openCardOption)
    console.log(userData)
  }

  function handleOpenBankSlipOption() {
    setOpenBankSlipOption(!openBankSlipOption)
    console.log(openBankSlipOption)
  }

  function handleOpenMercadoPagoOption() {
    setOpenMercadoPagoOption(!openMercadoPagoOption)
    console.log(openMercadoPagoOption)
  }

  return (
    <div className={styles.paymentContainer}>
      <Header isLoginPage/>
      <div className={styles.paymentTitle}>Formas de pagamento</div>
      <div className={styles.paymentMethods}>

        <div className={styles.menuPaymentOption}>

          <div className={openBankSlipOption || openMercadoPagoOption ? styles.noCreditCard : styles.cc}>
            <div className={styles.modalCard} onClick={() => handleOpenCardOption()}>

              <div className={styles.cardAndText}>
                <div className={styles.imageCard}>
                  <Image src={CreditCardIcon} width={40} height={40}/>
                </div>
                <div>Cartão de crédito</div>
              </div>

              <div className={styles.arrowRight}>
                <Image src={Next}/>
              </div>

            </div>

            <div className={!openCardOption ? styles.cardData : ''}>
              <FormPayment/>
              <PaymentCards/>
            </div>
          </div>


          <div className={openCardOption || openMercadoPagoOption ? styles.noSlip: styles.bs}>
            <div className={styles.modalCard} onClick={() => {handleOpenBankSlipOption()}}>

              <div className={styles.bankSlipAndText}>
                <div className={styles.imageCard}>
                  <Image src={BankSlip}/>
                </div>
                <div>Boleto Bancário</div>
              </div>

              <div className={styles.arrowRight}>
                <Image src={Next}/>
              </div>
            </div>

            <div className={!openBankSlipOption? styles.slipContent : styles.slipC}>
              <div className={styles.titleSlip}>Ao fazer o pedido, você recebe o boleto por e-mail e também pode acessá-lo no passo seguinte.</div>
              <div className={styles.nameSlip}>
                <div>
                  Nome
                </div>
                <div className={styles.dataSlip}>
                  {userData.name} {userData.surname}
                </div>
              </div>

              <div className={styles.cpfSlip}>
                <div>
                  CPF/CNPJ
                </div>
                <div className={styles.dataSlip}>
                  {userData.cpf}
                </div>
              </div>
            </div>
          </div>

          <div className={openCardOption || openBankSlipOption ? styles.noMercadoPago: styles.mp}>
            <div className={styles.modalCard} onClick={() => {handleOpenMercadoPagoOption()}}>
              <div className={styles.mercadoPagoFirstImages}>
                <div className={styles.imageCard}>
                  <Image src={ArrowD}/>
                </div>
                <div>
                  <Image src={MercadoP}/>
                </div>
              </div>

              <div className={styles.arrowRight}>
                <Image src={Next}/>
              </div>
            </div>

            <div className={!openMercadoPagoOption ? styles.mercadoPagoContent : styles.mercP}>
              <div>Usando a opção Pagar através de <span>Mercado Pago</span> você será redirecionado e pode pagar das seguintes formas:</div>
              <div className={styles.mercadoPagoCreditCard}>
                <div>
                  <Image src={CreditCardSmall}/>
                </div>
                <div>
                  Cartão de Crédito
                </div>
              </div>
              <Cards/>

              <div className={styles.lineSeparate}></div>

              <div className={styles.mercadoPagoBankSlip}>
                <div>
                  <Image src={Offline}/>
                </div>
                <div>
                  Boleto Bancário
                </div>
              </div>
            </div>
          </div>     
        </div>


        <div className={styles.cartContent}>
          {cart.map((product,index) => {
            return (
              <div className={styles.cartDetails} key={index}>
                <div className={styles.imageProd}>
                  <img src={product.images[0].url} alt="imageproductcart"/>
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
      </div>
    
      {!openCardOption ?  
      <button 
        type="submit"
        id="form-checkout__submit"
        className={styles.buttonPayment}
      >
        Finalizar Pedido
      </button> : ''}

    </div>
  )
}