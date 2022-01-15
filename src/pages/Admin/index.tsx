import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function AdmPanel(){
  return (
    <div className={styles.panelContainer}>
      <Header isLoginPage={false}/>
    </div>
  )
}