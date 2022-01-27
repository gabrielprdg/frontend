import { Header } from '../../../components/Header'
import styles from './styles.module.scss'
import Image from 'next/image'
import CreditCartIcon from '../../../../public/credit-card.png'
import  BankSlip from '../../../../public/codigo-de-barras.svg'
import  MercadoPago from '../../../../public/mercadopago.svg'
import Next from '../../../../public/next.svg'
import ArrowD from '../../../../public/diagonal-arrows.svg'
import { useCart } from '../../../contexts/ShoppingCartContext'
import { useState } from 'react'
import Visa from '../../../../public/visa.svg'
import MasterCard from '../../../../public/mastercard.svg'
import Amex from '../../../../public/amex.svg'
import Diners from '../../../../public/diners.svg'
import Hipercard from '../../../../public/hipercard.svg'
import Elo from '../../../../public/elo.svg'
import CreditCardSmall from '../../../../public/credit_card.svg'
import Offline from '../../../../public/offline.svg'


export default function Payment (){
  const [openCardOption, setOpenCardOption] = useState(false)
  const [openBankSlipOption, setOpenBankSlipOption] = useState(false)
  const [openMercadoPagoOption, setOpenMercadoPagoOption] = useState(false)
  const {cart, total} = useCart()

  function handleOpenCardOption() {
    setOpenCardOption(!openCardOption)
    console.log(openCardOption)
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
                  <Image src={CreditCartIcon} width={40} height={40}/>
                </div>
                <div>Cartão de crédito</div>
              </div>

              <div className={styles.arrowRight}>
                <Image src={Next}/>
              </div>

            </div>

            <div className={!openCardOption ? styles.cardData : ''}>
              <form action="" className={styles.formCard}>
                <label htmlFor="">Numero do cartão</label>
                <input type="text" required/>
                <div className={styles.nameNasCv}>
                  <div className={styles.cardName}>
                    <label htmlFor="">Nome impresso no cartão</label>
                    <input type="text" required/>
                  </div>
                  <div className={styles.cardExpiration}>
                    <label htmlFor="">Vencimento(MM/AA)</label>
                    <input type="text" required/>
                  </div>
                  <div className={styles.cardCvv}>
                    <label htmlFor="">CVV</label>
                    <input type="text" required/>
                  </div>
                </div>
                <label htmlFor="">Parcelas</label>
                <select name="" id="">
                  <option value="">1x de 344,44</option>
                </select>
                <label htmlFor="">CPF ou CNPJ do portador do cartão</label>
                <input type="text" />
              </form>
 
              <div className={styles.cards}>
                <div className={styles.title}>Cartões aceitos por <span>Mercado Pago</span></div>
                <div className={styles.imageCards}>
                  <div>
                    <Image src={Visa}/>
                  </div>
                  <div>
                    <Image src={MasterCard}/>
                  </div>
                  <div>
                    <Image src={Amex}/>
                  </div>
                  <div>
                    <Image src={Diners}/>
                  </div>
                  <div>
                    <Image src={Hipercard}/>
                  </div>
                  <div>
                    <Image src={Elo}/>
                  </div>
                </div>
              </div>
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
                  Gabriel
                </div>
              </div>

              <div className={styles.cpfSlip}>
                <div>
                  CPF/CNPJ
                </div>
                <div className={styles.dataSlip}>
                  143.592.976-45
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
                  <Image src={MercadoPago}/>
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

              <div className={styles.cardImages}>
                <div>
                  <Image src={Visa}/>
                </div>
                <div>
                  <Image src={MasterCard}/>
                </div>
                <div>
                  <Image src={Amex}/>
                </div>
                <div>
                  <Image src={Diners}/>
                </div>
                <div>
                  <Image src={Hipercard}/>
                </div>
                <div>
                  <Image src={Elo}/>
                </div>
              </div>

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
              <div className={styles.cartDetails}>
                <div className={styles.imageProd}>
                  <img src={product.images[0].url} alt="imageproductcart" />
                </div>
                <div className={styles.name}>{product.name} x <span className={styles.countP}>{product.count}</span><span>R${product.price * product.count}</span></div>
              </div>
            )
          })}

          <div className={styles.cartPrice}>
            <div className={styles.subTot}>
              <div>Subtotal</div>
              <span>R${total}</span>
            </div>

            <div className={styles.shipping}>
              <div>Custo de Frete</div>
              <span>R${total}</span>
            </div>
          </div>

          <div className={styles.cartTotal}>
            <span>Total</span>
            <div className={styles.tot}>
              R$ {total}
            </div>
          </div>
        </div>

      </div>

      <button className={styles.buttonPayment}>Finalizar pedido</button>
    </div>
  )
}