import Image from 'next/image'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Amex from '../../../public/amex.svg'
import HiperCard from '../../../public/hipercard.svg'
import MasterCard from '../../../public/mastercard.svg'
import Visa from '../../../public/visa.svg'
import { api } from '../../../services/api'
import { SnapshotInstallments, SnapshotProfile, SnapshotProfileShipping, SnapshotRef } from '../../contexts/PaymentContext'
import { useCart } from '../../contexts/ShoppingCartContext'
import MercadopagoErrorStatus from '../../utils/modules/MercadopagoErrorStatus'
import styles from './styles.module.scss'

type PaymentData = {
  cardExpirationDate: string
  cardNumber: string
  cardholderName: string
  identificationNumber: string
  securityCode: string
}

type InputProps = (data: string, val: string) => void

export interface ProfileProps {
  display_name?: string
  e_mail?: string
  e_mail_valid?: string
  card_number?: string
  card_month?: string
  card_year?: string
  code?: string
  doc?: string
  issuer?: string
  slt_installment?: number
}

type FormSubmitThenProps = {
  status: number
  body: {
    id: number
    transaction_amount: number
    date_approved: string
    first_six_digits: string
    last_four_digits: string
    display_name: string
  }
}

type FormSubmitProps = (data: {
  token: string
  payment_method_id?: string
  transaction_amount: number
  description: string
  installments: number
  email?: string
}) => Promise<FormSubmitThenProps>
 
export default function FormPayment() {
  const clickRef = useRef(true)
  const { total, purchaseAproved, cartBuyNow } = useCart()
  const { useInstallments, setInstallments } = SnapshotInstallments()
  const { formRef } = SnapshotRef()
  const { useProfile, setProfile } = SnapshotProfile()
  const { useProfileShipping } = SnapshotProfileShipping()

  
  const [loading, setLoading] = useState(false)
 

  const {
    card_number = '',
    card_month = '',
    card_year = '',
    code = '',
    doc = '',
    display_name = '',
    e_mail,
    issuer,
    slt_installment = 1
  } = useProfile

  
  const selectImageCard = (issuer: string| undefined) => {
    console.log('man',issuer)
    if(issuer == 'master'){
      return(
        <Image src={MasterCard}/>
      )
    }

    if(issuer == 'visa'){
      return(
        <Image src={Visa}/>
      )
    }

    if(issuer == 'amex'){
      return(
        <Image src={Amex}/>
      )
    }

    if(issuer == 'hipercard'){
      return(
        <Image src={HiperCard}/>
      )
    }

  }
  
  const inputFn: InputProps = (data, val) =>
  setProfile((prevState) =>
    Object({
      ...prevState,
      [data]: val
    })
  )

  const selectFn = (event: EventTarget & HTMLSelectElement) =>
  setProfile((prevState) =>
    Object({
      ...prevState,
      slt_installment: Number(event.options[event.selectedIndex].value)
    })
  )

  const formSubmit: FormSubmitProps = async (data) => {
    try {
      console.log(data)
      const res = await api.post('process_payment', data)
      console.log('DATA',res.data)
      console.log(slt_installment)
      return res.data
    }catch(err:any) {
      console.log('err:', err)
    }
  }

  const confirmFn = () => {
    setLoading(!loading)
    
    if (clickRef.current) {
      clickRef.current = false
      window.Mercadopago.createToken(formRef.current, (status, response) => {
        if (status === 200 || status === 201) {
          console.log(response, issuer)
          console.log('cartBuyNow',typeof(total))
          formSubmit({
            token: response.id,
            payment_method_id: issuer,
            transaction_amount: Number(cartBuyNow.price) ,
            description: 'Vestuário Comprado',
            installments: slt_installment,
            email: e_mail
          })
            .then((data:any) => {
              console.log(data)
              const { status, body } = data
              console.log('sts',status)
              console.log('bd', body)
              if (status === 201 || status === 200) {
                toast.success('compra efetuada with sucess')
              } else {
                toast.error('Erro interno do servidor!')
              }
            })
            .catch(() => {
              toast.error('Erro ao iniciar a compra!')
            })
            .finally(function () {
              window.Mercadopago.clearSession()
              clickRef.current = true
            })

          clickRef.current = true
        } else if (status === 423) {
          toast.error('Espere um momento e tente novamente.')
          clickRef.current = true
        } else if (status === 400) {
          const { cause } = response
          const [error] = cause
          console.log(error)
          clickRef.current = true
          MercadopagoErrorStatus(error.code)
        } else {
          toast.error('Certifique-se que todos os dados estão corretos!')
          clickRef.current = true
        }
      })
    }
  }

  const isValidInput = (id: string, val: string, size: number) =>
    !isNaN(Number(val)) && val.replace(/\D/g, '') !== id && val.length <= size

  const inputValidFn = (id: string, val: string) => {
    switch (id) {
      case 'card_number':
        if (isValidInput(id, val, 16)) {
          inputFn(id, val)
        }
        break
      case 'card_month':
        if (isValidInput(id, val, 2)) {
          inputFn(id, val)
        }
        break
      case 'card_year':
        if (isValidInput(id, val, 2)) {
          inputFn(id, val)
        }
        break
      case 'code':
        if (isValidInput(id, val, 4)) {
          inputFn(id, val)
        }
        break
      default:
        inputFn(id, val)
    }
  }
  
  return (
    <div>
        <div className={styles.cardInputs}>
          <div className={styles.fields}>
            <label htmlFor="cardNumber">Número do cartão</label>
            <input 
              type="text"
              data-checkout="cardNumber"
              onInput={(e) =>
                inputValidFn('card_number', (e.target as HTMLInputElement).value)
              }
              value={card_number}
          
            />
              <div className={styles.imageCard}>
                {selectImageCard(issuer)}
              </div>
          </div>

          <div className={styles.nameNasCv}>
            <div className={styles.fields}>
              <label htmlFor="cardholderName">Nome impresso no cartão</label>
              <input 
                type="text"
                data-checkout="cardholderName"
                className={styles.nameCard}
                onInput={(e) =>
                  inputFn(
                    'display_name',
                    (e.target as HTMLInputElement).value.toUpperCase()
                  )
                }

                value={display_name}
              />
            </div>

            <div className={styles.expAndCvv}>
              <div className={styles.fieldsForm}>
                <label htmlFor="">Data de vencimento</label>
                <div className={styles.exp}>
                  <input 
                    className={styles.expM} 
                    type="text" placeholder="MM" 
                    data-checkout="cardExpirationMonth"
                    onInput={(e) =>
                      inputValidFn('card_month', (e.target as HTMLInputElement).value)
                    }
                    value={card_month}
                  />
                  <span className="date-separator">/</span>
                  <input 
                    className={styles.expY} 
                    type="text" placeholder="YY" 
                    data-checkout="cardExpirationYear"
                    onInput={(e) =>
                      inputValidFn('card_year', (e.target as HTMLInputElement).value)
                    }
                    value={card_year}
                  />
                </div>
              </div>
              <div className={styles.cvvCard}>
                <label htmlFor="securityCode">CVV</label>
                <input 
                  data-checkout="securityCode" 
                  type="text" 
                  className={styles.cvv}
                  onInput={(e) =>
                    inputValidFn('code', (e.target as HTMLInputElement).value)
                  }
                  value={code}
                />
              </div>
             
            </div>

       
          </div>
         

          <div className={styles.fields}>
            <label htmlFor="installments">Parcelas</label>
             <select id="installments" className={styles.installments} onChange={(e) => selectFn(e.target)}>
              {useInstallments.map(({ recommended_message, installments }, i) => (
                <option key={i} value={installments}>
                  {recommended_message}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.docNumber}>
          <select id="docType" data-checkout="docType" className={styles.docType}/>
          <div className={styles.docGroup}>
            <label> Num. documento </label>
            <input
              type="text"
              data-checkout="docNumber"
              className={styles.docn}
              onInput={(e) =>
                inputFn('doc', (e.target as HTMLInputElement).value)
              }
              value={doc}
            />
          </div>
        </div>
 

        <div className={styles.hidden}>
            <button 
              type="submit" 
              className={styles.buttonPayment} 
              onClick={() => 
                confirmFn()
              }
            >
                Finalizar pedido
          </button> 
        </div>
      </div>
    </div>
  )
}

