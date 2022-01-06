import '../styles/global.scss'
import type { AppProps } from 'next/app';
import styles from '../styles/app.module.scss';
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <div className={styles.wrapper}>
      <main>
     
        <Component {...pageProps} />
      </main>
    </div>
  )
}
export default MyApp
