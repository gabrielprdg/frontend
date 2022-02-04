import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../../../services/api'
import { usePayment } from '../../contexts/PaymentContext'
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
  const formRef = useRef<HTMLFormElement>(null!)
  const clickRef = useRef(true)
  const cardNumberRef = useRef(false)
  const [cardNumber, setCardNumber] = useState('')
  const { useProfile, setProfile, userData, useInstallments, setInstallments} = usePayment()
  const { total } = useCart()

  const {
    card_number = cardNumber,
    card_month = '',
    card_year = '',
    code = '',
    e_mail = '',
    issuer,
    slt_installment = 1
  } = useProfile

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
    const res = await api.post('/process_payment', data)
    console.log('DATA',res.data)
    return res.data
  }

  const confirmFn = () => {
    toast.success(`4`)
    if (clickRef.current) {
      clickRef.current = false
      window.Mercadopago.createToken(formRef.current, (status, response) => {
        if (status === 200 || status === 201) {

          formSubmit({
            token: response.id,
            payment_method_id: issuer,
            transaction_amount: total,
            description: 'Vestuário Comprado',
            installments: slt_installment,
            email: e_mail
          })
            .then((data:any) => {
              console.log(data)
              const { status, body } = data

              if (status === 200) {
                toast.success('Compra realizada com sucesso!')
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

          clickRef.current = true
          MercadopagoErrorStatus(error.code)
        } else {
          toast.error('Certifique-se que todos os dados estão corretos!')
          clickRef.current = true
        }
      })
    }
  }

 
  useEffect(() => {
    console.log('oie',process.env.PUBLIC_KEY_MERCADO_PAGO)
    window.onload = () => {
      function checkFn() {
        window.Mercadopago.setPublishableKey('TEST-57ab01b0-15a9-42a8-8da8-72194265fd45')
        window.Mercadopago.getIdentificationTypes()
      }
      checkFn()

      setTimeout(() => {
        if (!window.Mercadopago.initialized) {
          checkFn()
          console.log('Reconectando...')
        }
      }, 1000)
    }
  }, [])

  useEffect(() => {
    if (cardNumberRef.current) {
      if (card_number || (!card_number && issuer)) {
        // recebe o nome do cartão antecipado
        if (card_number.length > 5 && !issuer) {
          const bin = card_number.substring(0, 6)
          window.Mercadopago.getPaymentMethod({ bin }, (status, response) => {
            if (status === 200) {
              setProfile((prevState) => {
                const assoc = { ...prevState }
                assoc.issuer = response[0].id
                return assoc
              })
            } else {
              console.log('error:', response)
            }
          })

          window.Mercadopago.getInstallments(
            { bin, amount: total },
            function (status, response) {
              if (status === 200) {
                setInstallments(
                  response[0].payer_costs.map(
                    ({ recommended_message, installments }) => {
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
                recommended_message: 'Parcelas'
              }
            ])
            setProfile((prevState) => {
              const assoc = { ...prevState }
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
      <form action="" id="paymentForm" className={styles.formCard} ref={formRef} >

        <div className={styles.cardInputs}>
          <div className={styles.fields}>
            <label htmlFor="cardNumber">Número do cartão</label>
            <input 
              type="text" 
              id="cardNumber" 
              data-checkout="cardNumber" 
              onInput={(e) =>
                inputValidFn('card_number', (e.target as HTMLInputElement).value)
              }
              value={card_number}
            />
          </div>

          <div className={styles.nameNasCv}>
            <div className={styles.fields}>
              <label htmlFor="cardholderName">Nome impresso no cartão</label>
              <input 
                id="cardholderName" 
                data-checkout="cardholderName" 
                type="text" 
                className={styles.nameCard}
              />
            </div>

            <div className={styles.fields}>
              <label htmlFor="">Data de vencimento</label>
              <div className={styles.exp}>
                <input 
                  className={styles.expM} 
                  type="text" placeholder="MM" 
                  id="cardExpirationMonth" 
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
                  id="cardExpirationYear" 
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
                id="securityCode" 
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
         
          <div className={styles.fields}>
            <label htmlFor="installments">Parcelas</label>
             <select id="installments" onChange={(e) => selectFn(e.target)}>
              {useInstallments.map(({ recommended_message, installments }, i) => (
                <option key={i} value={installments}>
                  {recommended_message}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.hidden}>
            <input type="hidden" name="transactionAmount" id="transactionAmount" value={total}/>
           
            <input type="hidden" name="description" id="description" value="Compra de vestuário"/>
            <input type="hidden" id="email" name="email" value={userData.email}/>

            <button type="submit" className={styles.buttonPayment} onClick={() => confirmFn()}>Pagar</button>
          </div>
       </div>
      </form>
    </div>
  )
}