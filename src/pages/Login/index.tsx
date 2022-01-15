import { Header } from "../../components/Header";
import styles from './styles.module.scss'
import Link from 'next/link'

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <form action="" className={styles.form}>
        <p className={styles.title}>LOGIN</p>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" autoComplete="email" required className={styles.inputEmail}/>
        <label htmlFor="name">Password</label>
        <input id="name" type="password" autoComplete="password" required className={styles.inputPass}/>
        <button type="submit">Login</button>
      </form>
      <div className={styles.signUp}>Nao possui uma conta? <Link href="/SignUp"><span>Cadastre-se</span></Link></div>
    </div>
  )  
}