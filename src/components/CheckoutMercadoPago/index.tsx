import { useCart } from '../../contexts/ShoppingCartContext';
import styles from './styles.module.scss'
import mercadopago from 'mercadopago'
import { mercadopagoApi } from '../../../services/apiMercadoPago';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { SnapshotMercadoPago } from '../../contexts/PaymentContext';
import Link from 'next/link';
import Router  from 'next/router';

type ItemsProps = {
  title: string
  unit_price: number
  quantity: number
}

type PreferenceProps = {
  items: Array<ItemsProps>
}

type FormSubmitMercadoPagoProps = (data: {
  preference: PreferenceProps
}) => Promise<any>

export function CheckoutMercadoPago() {




  const { cart, cartBuyNow, total } = useCart()

  const { mercadoPagoPayment ,setMercadoPagoPayment} = SnapshotMercadoPago()

  const formSubmit: FormSubmitMercadoPagoProps = async (data) => {
    try {
      const res = await api.post('process_payment_mp', data)
      return res.data
    }catch(err:any) {
      console.log('err:', err)
    }
  }

  const confirmMercadoPagoFn = () => {
    formSubmit({
      preference: {
        items: [{
          title: cartBuyNow.name && cart.length == 0 ? cartBuyNow.name : cart[0].name,
          unit_price: total,
          quantity: cartBuyNow.count && cart.length == 0 ? cartBuyNow.count : cart[0].count
        }]
      }
    }).then((data:any) => {
      console.log(data)
      const { status, response } = data
      console.log('sts',status)
      console.log(data)
      if (status === 201 || status === 200) {
        setMercadoPagoPayment(Object({
          init_point: response.init_point
        }))

        Router.push(response.init_point)
      } else {
        toast.error('Erro interno do servidor!')
      }
    })
    .catch(() => {
      toast.error('Erro ao iniciar a compra!')
    })
    .finally(function () {
      window.Mercadopago.clearSession()
    })
  }

  return (
    <div className={styles.checkoutMercadoPagoContainer}>
      <div className={styles.hidden}>      
        <button 
          type="submit" 
          className={styles.buttonPayment} 
          onClick={() => 
            confirmMercadoPagoFn()
          }
        >
          Continuar
        </button> 
      </div>
    </div>
  )
}