import Image from 'next/image'
import { useEffect, useState } from 'react'
import ArrowDownForm from '../../../../public/arrowdown.svg'
import BankSlip from '../../../../public/codigo-de-barras.svg'
import CreditCardIcon from '../../../../public/credit-card.png'
import CreditCardSmall from '../../../../public/credit_card.svg'
import ArrowD from '../../../../public/diagonal-arrows.svg'
import MercadoP from '../../../../public/mercadopago.svg'
import Next from '../../../../public/next.svg'
import Offline from '../../../../public/offline.svg'
import ArrowDown from '../../../../public/seta-para-baixo.svg'
import ArrowUp from '../../../../public/up-arrow.svg'
import { api } from '../../../../services/api'
import Cards from '../../../components/Cards'
import { CheckoutMercadoPago } from '../../../components/CheckoutMercadoPago'
import FormCheckoutTicket from '../../../components/FormCheckoutTicket'
import FormPayment from '../../../components/FormPayment'
import { Header } from '../../../components/Header'
import PaymentCards from '../../../components/PaymentCards'
import PurchaseProduct from '../../../components/PurchaseProduct'
import { SnapshotCardNumberRef, SnapshotInstallments, SnapshotProfile, SnapshotProfileShipping, SnapshotRef, SnapshotTicketRef } from '../../../contexts/PaymentContext'
import { useCart } from '../../../contexts/ShoppingCartContext'
import styles from './styles.module.scss'

export function checkFn() {
  window.Mercadopago?.setPublishableKey(
    'TEST-18691270-a48e-45c8-94a4-80263f46cf65'
  )
  window.Mercadopago?.getIdentificationTypes()
  console.log('docType', process.env.PUBLIC_KEY)
}

export default function Payment (){
  const [openCardOption, setOpenCardOption] = useState(false)
  const [openBankSlipOption, setOpenBankSlipOption] = useState(false)
  const [openMercadoPagoOption, setOpenMercadoPagoOption] = useState(false)


  const { total, cartBuyNow, isAproved } = useCart()
  const { useProfile, setProfile } = SnapshotProfile()
  const { cardNumberRef } = SnapshotCardNumberRef()

  const { formRef } = SnapshotRef()
  const { formTicketRef } = SnapshotTicketRef()
  const { card_number = '', issuer } = useProfile
  const { setInstallments } = SnapshotInstallments()

  const { useProfileShipping } = SnapshotProfileShipping()

  const [isOpen, setIsOpen] = useState(false)


  function handleOpenToggle (){
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    checkFn()
  }, [])

  useEffect(() => {
    if (cardNumberRef.current) {
      console.log('3',cardNumberRef)
      if (card_number || (!card_number && issuer)) {
        // recebe o nome do cartão antecipado
        if (card_number.length > 5 && !issuer) {
          const bin = card_number.substring(0, 6)
          console.log(bin)

          window.Mercadopago.getPaymentMethod({ bin }, (status, response) => {
            console.log('status', status)
            console.log('response', response)
            if (status === 200) {
              setProfile((prevState) => {
                const assoc = { ...prevState }
                assoc.issuer = response[0].id
                console.log(assoc.issuer)
                return assoc
              })
            } else {
              console.log('error:', response)
            }
          })

          window.Mercadopago.getInstallments(
            { bin, amount: cartBuyNow.price ? cartBuyNow.price : total },
            function (status, response) {
              console.log('statu', status)
              console.log('respons', response)
              const inst = response[0]?.payer_costs.slice(0, 3)
              console.log('inst', inst)
              if (status === 200) {
                setInstallments(
                  inst?.map(
                    ({ recommended_message, installments}, i ) => {
                      console.log(i)
                      return {
                        recommended_message,
                        installments
                      }
                    }
                  )
                )
              } else {
                console.log('error:', response)
              }
            }
          )
        } else {
          if (card_number.length < 6 && issuer) {
            setInstallments([
              {
                installments: 1,
                recommended_message: 'Parcelas',

              }
            ])
            setProfile((prevState) => {
              const assoc = { ...prevState }
              console.log('r', assoc.issuer)
              delete assoc.issuer
              return assoc
            })
          }
        }
      }
    } else {
      cardNumberRef.current = true
    }
  }, [card_number])

  const formSubmit: any = async (data:any) => {
    try {
      console.log(data)
      const res = await api.post('process_payment', data)
      return res.data
    }catch(err:any) {
      console.log('err:', err)
    }
  }



  function handleOpenCardOption() {
    setOpenCardOption(!openCardOption)
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

      
      <div className={!isAproved ? styles.f : styles.nof}>
      <div className={styles.checkoutPayment}>

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
          Ver detalhes do pedido
        </div>

        {cartBuyNow?.price ? 
          <div className={styles.totToggle}>
            R${cartBuyNow?.price}
          </div>
        :
          <div className={styles.totToggle}>
            R${total}
          </div>
        }    
        </div>

      <div className={styles.paymentTitle}>Formas de pagamento</div>

      <div className={styles.paymentMethods}>

      <div className={ !isOpen ? styles.menuPaymentOption: styles.menuPaymentOptionOpacity}>

      <div className={openBankSlipOption || openMercadoPagoOption ? styles.noCreditCard : styles.cc}>
        <div className={styles.modalCard} onClick={() => handleOpenCardOption()}>

        <div className={styles.cardAndText}>
          <div className={styles.imageCard}>
            <Image src={CreditCardIcon} width={40} height={40}/>
          </div>
          <div>Cartão de crédito</div>
        </div>
        { !openCardOption ? 
          <div className={styles.arrowRight}>
            <Image src={Next}/>
          </div>

        :
          <div >
            <Image src={ArrowDownForm}/>
          </div>
        }

      </div>

      <div className={!openCardOption ? styles.cardData : styles.cardCont}>
        <form 
          id="paymentForm" 
          className={styles.formCard} ref={formRef}
          onSubmit={(e) => e.preventDefault()}
        >
          <FormPayment/>
        </form>
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

        { !openBankSlipOption? 
          <div className={styles.arrowRight}>
            <Image src={Next}/>
          </div>

        :
          <div >
            <Image src={ArrowDownForm}/>
          </div>
        }
      </div>

      <div className={!openBankSlipOption? styles.slipContent : styles.slipC}>
        <div className={styles.titleSlip}>Ao fazer o pedido, você recebe o boleto por e-mail e também pode acessá-lo no passo seguinte.</div>
        <div className={styles.nameSlip}>
          <div>
            Nome
          </div>
          <div className={styles.dataSlip}>
            {useProfileShipping?.firstName} {useProfileShipping?.surname}
          </div>
        </div>

        <div className={styles.cpfSlip}>
          <div>
            CPF/CNPJ
          </div>
          <div className={styles.dataSlip}>
            {useProfileShipping?.doc}
          </div>
        </div>

        <div className={!openBankSlipOption ? styles.noTicket : styles.ticket}>
          <form 
            id="paymentForm" 
            className={styles.formTicket} ref={formTicketRef}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormCheckoutTicket/>
          </form>
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

        { !openMercadoPagoOption ? 
          <div className={styles.arrowRight}>
            <Image src={Next}/>
          </div>

        :
          <div >
            <Image src={ArrowDownForm}/>
          </div>
        }
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

        <div className={!openMercadoPagoOption ? styles.noTicket : styles.ticket}>
          <form 
            id="paymentForm" 
            className={styles.formTicket} 
            onSubmit={(e) => e.preventDefault()}
          >
            <CheckoutMercadoPago/>
          </form>
        </div>

          </div>
          </div>     
          </div>
          </div>
        </div>
      </div>

      <div className={isOpen ? styles.purchaseToggle: styles.noPurchaseToggle}>
        <PurchaseProduct/>
      </div>

    </div>
  )
}