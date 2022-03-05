import { Header } from '../../../components/Header'
import styles from './styles.module.scss'
import Image from 'next/image'
import Ok from '../../../../public/ok.svg'
import Bar from '../../../../public/download.png'
import Link from 'next/link'
import { SnapshotTicket } from '../../../contexts/PaymentContext'
import { useCart } from '../../../contexts/ShoppingCartContext'
import { transformDate } from '../../../utils/dateUtil/transformDate'
import { useEffect } from 'react'

export default function Ticket() {

  const {  ticketPayment, setTicketPayment } = SnapshotTicket()
  const { total } = useCart()

  const { 
    barcode ,
    date_created,
    date_of_expiration,
    status,
    transaction_details,
  } = ticketPayment

  useEffect (() => {

    const ticketData = localStorage.getItem('ticketData')

    if(ticketData){
      setTicketPayment(JSON.parse(ticketData));
    }

  },[])
  
  useEffect(() => {
    localStorage.setItem('ticketData', JSON.stringify(ticketPayment))
  },[ticketPayment])

  console.log('trikas',ticketPayment)

  return (
    <div className={styles.ticketContainer}>
      <Header isLoginPage/>
      
      <div className={styles.ticketModal}>
        <div className={styles.ticketTitle}>
          <div>
            <img className={styles.okLogo} src='/ok.svg'/>
          </div>
          
          <div className={styles.title}>
            Pedido aceito, aguardando pagamento
          </div>
        </div>

        <div className={styles.barcode}>
          <div className={styles.codeContent}>
            <div className={styles.codPayment}>
              Código de pagamento
            </div>
            <div className={styles.cod}>
              {ticketPayment?.barcode?.content}
            </div>
          </div>

          <div className={styles.barContent}>
            <div className={styles.bar}>
              Boleto para
            </div>

            <div className={styles.barPic}>
              <Image width={200} height={40}  src={Bar}/>
            </div>

           
            <a href={ticketPayment?.transaction_details?.external_resource_url} className={styles.saveDoc}>
              Salvar documento de boleto
            </a>
           
          </div>
        </div>

        <div className={styles.infoTitle}>Informações do Pedido</div>

        <div className={styles.paymentInfo}>
          <div className={styles.requestNumber}>
            <div> Número do pedido </div>
            <span>{ticketPayment?.transaction_details?.payment_method_reference_id}</span>
          </div>

          <div className={styles.requestDate}>
            <div> Data do pedido </div>
            <span>{transformDate(ticketPayment.date_created)}</span>
          </div>

          <div className={styles.value}>
            <div> Valor </div>
            <span>R${total}</span>
          </div>
        </div>
        <Link href='/'>
          <div className={styles.back}>Volta pro ínicio</div>
        </Link>
      </div>
    </div>
  )
}