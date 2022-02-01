import type { AppProps } from 'next/app';
import  Head  from 'next/head';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';
import Script from 'next/script'
import { PaymentContextProvider } from '../contexts/PaymentContext';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
      <ShoppingCartContextProvider>
        <PaymentContextProvider>
          <div className={styles.wrapper}>
              <Head>
                <title>Use Fashion</title>
              </Head>
              <main>
                <script src="https://sdk.mercadopago.com/js/v2"></script>
                <Component {...pageProps} />
              </main>
          </div>
        </PaymentContextProvider>
      </ShoppingCartContextProvider>
    </AuthContextProvider>
  )
}
export default MyApp
