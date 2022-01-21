import { Header } from '../../components/Header'
import styles from './styles.module.scss'

export default function AdmPanel(){
  return (
    <div className={styles.panelContainer}>
      <Header isAdminPage/>
      <div className={styles.admContainer}></div>
    </div>
  )
}