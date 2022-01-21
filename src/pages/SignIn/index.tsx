import Link from 'next/link';
import styles from './styles.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';


export default function SignIn() {
  const { register, handleSubmit } = useForm()
  const { signIn } = useAuth()

  async function handleSignIn(data:any) {
    try {
      await signIn(data)
    }catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.useTitle}>
        <span>Use</span>
        <span>FashionStore</span>
      </div>
      <form action="" className={styles.form} onSubmit={handleSubmit(handleSignIn)}>

        <label htmlFor="email">Email</label>
        <input
          {...register('email')}
          id="email"
          type="text"
          autoComplete="email"
          required className={styles.inputEmail}
        />
        <label htmlFor="name">Password</label>
        <input
          {...register('password')}
          id="password"
          type="password"
          autoComplete="password"
          required className={styles.inputPass}
        />
        <button type="submit">Login</button>
      </form>
      <div className={styles.signUp}>Nao possui uma conta? <Link href="/SignUp"><span>Cadastre-se</span></Link></div>
    </div>
  )  
}