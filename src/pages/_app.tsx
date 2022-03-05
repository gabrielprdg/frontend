import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '../contexts/AuthContext';
import ElementProvider, { MercadoPagoProps, ProfileProps, TicketProps} from '../contexts/PaymentContext';
import { ProfileShipping } from '../contexts/PaymentContext';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';



function MyApp({ Component, pageProps }: AppProps) {
  const [ ticketPayment, setTicketPayment] = useState({} as TicketProps)
  const [ mercadoPagoPayment, setMercadoPagoPayment] = useState({} as MercadoPagoProps)
  const formRef = useRef<HTMLFormElement>(null!)
  const formTicketRef = useRef<HTMLFormElement>(null!)
  const [ useProfile, setProfile ] = useState<ProfileProps>({})
  const [ useProfileShipping, setProfileShipping ] = useState({} as ProfileShipping)
  const cardNumberRef = useRef(false)
  const [useInstallments, setInstallments] = useState([
    {
      installments: 1,
      recommended_message: 'Parcelas'
    }
  ])

  return(
    <AuthContextProvider>
      <ShoppingCartContextProvider>
        <ElementProvider
            {...{
              useProfile,
              setProfile,
              ticketPayment,
              setTicketPayment,
              mercadoPagoPayment, 
              setMercadoPagoPayment,
              useInstallments,
              setInstallments,
              formRef,
              formTicketRef,
              useProfileShipping,
              setProfileShipping,
              cardNumberRef
            }}
          >
            <div className={styles.wrapper}>
              <Head>
                <title>Use Fashion</title>
              </Head>
              <main>
                <Script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></Script>
                <ToastContainer></ToastContainer>
                <Component {...pageProps} />
              </main>
            </div>
          </ElementProvider>
      </ShoppingCartContextProvider>
    </AuthContextProvider>
  )
}
export default MyApp
