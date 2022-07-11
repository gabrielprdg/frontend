import styles from './styles.module.scss'
import Lottie from 'react-lottie'
import animationData from '../../../public/animationOk.json'
import Link from 'next/link'
import { Header } from '../../components/Header';

const defaultOptions = {
  loop: false,
  autoplay: true, 
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

export default function PurchaseSuccessfuly() {
  return (
    <div className={styles.successfulyContainer}>
      <Header isLoginPage/>
      <div className={styles.preference}>
        <h2>Obrigado pela <br/>preferência!</h2>
      </div>
      
      <div className={styles.successModel}>
        <Lottie 
          options={defaultOptions}
          height={200}
          width={200}
        />
        <div className={styles.textSuccessfuly}>
          <div> Compra efetuada com sucesso. Verifique o email para detalhes de compra ! </div>
          <div> Para voltar para a pagina inicial<Link href='/'><span> clique aqui !</span></Link></div>
        </div>
      </div>
    </div>
  )
}