import Image from 'next/image'
import styles from './styles.module.scss'
import Amex from '../../../public/amex.svg'
import Diners from '../../../public/diners.svg'
import Elo from '../../../public/elo.svg'
import Hipercard from '../../../public/hipercard.svg'
import MasterCard from '../../../public/mastercard.svg'
import Visa from '../../../public/visa.svg'

export default function Cards() {
  return (
    <div className={styles.imageCards}>
      <div>
          <Image src={Visa}/>
      </div>
      <div>
        <Image src={MasterCard}/>
      </div>
      <div>
        <Image src={Amex}/>
      </div>
      <div>
        <Image src={Diners}/>
      </div>
      <div>
        <Image src={Hipercard}/>
      </div>
      <div>
        <Image src={Elo}/>
      </div>
    </div>
  )
}