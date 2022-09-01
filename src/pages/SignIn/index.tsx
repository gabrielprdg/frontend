import Link from 'next/link';
import styles from './styles.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Header } from '../../components/Header';
import { toast } from 'react-toastify';


export default function SignIn() {
  const { register, handleSubmit } = useForm()
  const { signIn } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)

  function handleProgress() {
    setIsLoaded(!isLoaded)
  }

  async function handleSignIn(data:any) {
    setIsLoaded(!isLoaded)
    try {
      await signIn(data)
    }catch(err) {
      toast.error("Email ou senha incorrestos !");
      
      setIsLoaded(!!isLoaded)
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
        {
          !isLoaded ? <button type="submit">Login</button> : <div className={styles.progress}><CircularProgress color='secondary'/></div>
        }
        
      </form>
      <div className={styles.signUp}>Nao possui uma conta? <Link href="/SignUp"><span>Cadastre-se</span></Link></div>
    </div>
  )  
}