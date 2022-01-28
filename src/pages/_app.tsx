import type { AppProps } from 'next/app';
import  Head  from 'next/head';
import { AuthContextProvider } from '../contexts/AuthContext';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';
import Script from 'next/script'


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <AuthContextProvider>
       <ShoppingCartContextProvider>
        <div className={styles.wrapper}>
          <Head>
            <title>Use Fashion</title>
          </Head>
          <main>
            <Script src="https://sdk.mercadopago.com/js/v2"/>
            <Component {...pageProps} />
          </main>
        </div>
      </ShoppingCartContextProvider>
    </AuthContextProvider>
  )
}
export default MyApp
