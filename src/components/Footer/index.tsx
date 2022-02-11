import styles from './styles.module.scss'
import Image from 'next/image'
import At from '../../../public/atSign.svg'
import Pin from '../../../public/pin2.svg' 
import Cards from '../Cards'
import Insta from '../../../public/instagram.svg'
import Link from 'next/link'
import Whatsapp from '../../../public/whatsapp.svg'

export function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerInfo}>

        <div className={styles.paymentMethod}>
          <h2>Formas de Pagamento</h2>
          <Cards/>
        </div>

        <div className={styles.contact}>
          <h2>Contato</h2>
          <div className={styles.emailContact}>
            <div className={styles.icon}>
              <Image src={At}/>
            </div>
            <div className={styles.email}>
              usestorefashionlook@hotmail.com
            </div>
          </div>

          <div className={styles.location}>
            <div className={styles.icon}>
              <Image src={Pin}/>
            </div>

            <div className={styles.city}>
              Ribeirão Preto
            </div>
          </div>
        </div>

        <div className={styles.socialMedia}>
          <h2>Redes Sociais</h2>
          <div className={styles.medias}>
            <div>
              <Link href='https://www.instagram.com/use_fashionstorelook/'>
                <Image src={Insta}/>
              </Link>
            </div>
            <div>
              <Link href='api.whatsapp.com/send?phone=553592363011'>
                <Image src={Whatsapp}/>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rights}>
        Use Fashin Store 2022 © Todos os Direitos Reservados. Desenvolvido por 
        <Link href='https://www.instagram.com/gabrielpr7/'><span> Gabriel</span></Link>
      </div>
    </div>
  )
}