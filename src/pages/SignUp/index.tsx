import styles from './styles.module.scss'
import Link from 'next/link'

export default function SignUp(){
  return (
    <div className={styles.loginContainer}>
      <div className={styles.useTitle}>
        <span>Use</span>
        <span>FashionStore</span>
      </div>
      <form action="" className={styles.form}>

        <label htmlFor="name">Nome</label>
        <input id="name" type="text" autoComplete="name" required className={styles.inputName}/>
        <label htmlFor="name">Email</label>
        <input id="email" type="email" autoComplete="email" required className={styles.inputEmail}/>
        <label htmlFor="name">Senha</label>
        <input id="pass" type="password" autoComplete="password" required className={styles.inputPass}/>
        <label htmlFor="name">Confirmar senha</label>
        <input id="cfpass" type="password" autoComplete="password" required className={styles.inputCfPass}/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}