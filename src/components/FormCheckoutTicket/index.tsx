import { api } from '../../../services/api'
import { SnapshotProfileShipping, SnapshotTicket, SnapshotTicketRef } from '../../contexts/PaymentContext'
import { useCart } from '../../contexts/ShoppingCartContext'
import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Router from 'next/router'

type IndentificationType = {
  type: string
  number: string
}

type payerType = {
  email: string
  first_name: string
  last_name: string
  identification: IndentificationType 
}


type FormSubmitTicketProps = (data: {
  payment_method_id?: string
  transaction_amount: number
  description: string
  payer: payerType
}) => Promise<any>

export default function FormCheckoutTicket() {

  const clickRef = useRef(true)
  const { cartBuyNow } = useCart()
  const { useProfileShipping } = SnapshotProfileShipping()
  const {  setTicketPayment } = SnapshotTicket()


  function ticketPagination() {
    Router.push('/Checkout/Ticket')
  }



  const formSubmit: FormSubmitTicketProps = async (data) => {
    try {
      const res = await api.post('process_payment_ticket', data)
      return res.data
    }catch(err:any) {
      console.log('err:', err)
    }
  }

  const confirmTicketFn = () => {
    formSubmit({
      payment_method_id: 'bolbradesco',
      transaction_amount: Number(cartBuyNow.price) ,
      description: cartBuyNow.description,
      payer: {
        email: useProfileShipping.email,
        first_name: useProfileShipping.firstName,
        last_name: useProfileShipping.surname,
        identification: {
          type: 'CPF',
          number: useProfileShipping.doc
        }
      }
    })
      .then((data:any) => {
        console.log(data)
        const { status, response } = data
        console.log('sts',status)
        console.log(data)
        if (status === 201 || status === 200) {
          setTicketPayment(
            Object({
              barcode: {content: response.barcode.content},
              date_created: response.date_created,
              date_of_expiration: response.date_of_expiration,
              status: response.status,
              transaction_details: {
                external_resource_url: response.transaction_details.external_resource_url,
                payment_method_reference_id: response.transaction_details.payment_method_reference_id
              },
            })
          )
      
          ticketPagination()
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
  }
  return(
    <div className={styles.formCheckoutTicketContainer}>
      <div className={styles.hidden}>
           
              <button 
                type="submit" 
                className={styles.buttonPayment} 
                onClick={() => 
                  confirmTicketFn()
                }
              >
                Finalizar Pedido
              </button> 
          
        </div>
    </div>
  )
} 