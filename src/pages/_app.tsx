import type { AppProps } from 'next/app';
import { ShoppingCartContextProvider } from '../contexts/ShoppingCartContext';
import styles from '../styles/app.module.scss';
import '../styles/global.scss';


function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ShoppingCartContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ShoppingCartContextProvider>
  )
}
export default MyApp
