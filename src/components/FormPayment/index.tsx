import { useForm } from 'react-hook-form'
import { usePayment } from '../../contexts/PaymentContext'
import styles from './styles.module.scss'
import MercadoPago from 'mercadopago'
import { useCart } from '../../contexts/ShoppingCartContext'
import { api } from '../../../services/api'

type PaymentData = {
  cardExpirationDate: string
  cardNumber: string
  cardholderName: string
  identificationNumber: string
  securityCode: string
}

const mp = MercadoPago

export default function FormPayment() {
  
  const {register, handleSubmit} = useForm()
  const { total } = useCart()
  const { userData } = usePayment()

  function handlePayment(data:PaymentData | any) {
    pay(data)
  }

  function pay ({
    cardExpirationDate,
    cardNumber,
    cardholderName,
    identificationNumber,
    securityCode
  }: PaymentData) {
    const cardForm = mp.card({
      amount: total,
      autoMount: true,
      form: {
        id: "form-checkout",
        cardholderName: cardholderName,
        cardholderEmail: userData.email,
        cardNumber: cardNumber,
        cardExpirationDate: cardExpirationDate,
        securityCode: securityCode,
        identificationNumber: identificationNumber,
      },
      callbacks: {
        onFormMounted: (error:any) => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: async (event:any) => {
          event.preventDefault();
    
          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();
    
          const res = await api.post("/process_payment", {
          
              token,
              issuer_id,
              payment_method_id,
              transaction_amount: Number(amount),
              installments: Number(installments),
              description: "Descrição do produto",
              payer: {
                email,
                identification: {
                  type: identificationType,
                  number: identificationNumber,
                },
              },
          
          });

          console.log(res)
        }
      },
    });
  }

  return (
    <div>
      <form action="" className={styles.formCard} onSubmit={handleSubmit(handlePayment)}>
        <label htmlFor="form-checkout__cardNumber">Numero do cartão</label>

        <input 
          {...register('cardNumber')}
          type="text"
          required
          name="cardNumber"
          id="form-checkout__cardNumber"
        />

        <div className={styles.nameNasCv}>
          <div className={styles.cardName}>
            <label htmlFor="form-checkout__cardholderName" >Nome impresso no cartão</label>

            <input 
              {...register('cardholderName')}
              type="text"
              required
              name="cardholderName" 
              id="form-checkout__cardholderName"
            />

          </div>
          <div className={styles.cardExpiration}>
            <label htmlFor="form-checkout__cardExpirationDate">Vencimento(MM/AA)</label>

            <input
              {...register('cardExpirationDate')}
              type="text" 
              required
              name="cardExpirationDate"
              id="form-checkout__cardExpirationDate"
            />
          </div>
          <div className={styles.cardCvv}>
            <label htmlFor="form-checkout__securityCode">CVV</label>
      
            <input 
              {...register('securityCode')}
              type="text"
              required
              name="securityCode"
              id="form-checkout__securityCode"
            />
          </div>
        </div>

        <label htmlFor="form-checkout__installments">Parcelas</label>
        <select id="installments">
          <option value="">1x de 34 conto</option>
        </select>
        <label htmlFor="form-checkout__identificationNumber">CPF ou CNPJ do portador do cartão</label>
        <input
          {...register('identificationNumber')}
          type="text"
          required
          value={userData.cpf}
          name="identificationNumber" 
          id="form-checkout__identificationNumber"
        />

        <button type="submit">enviar</button>
      </form>
    </div>
  )
}