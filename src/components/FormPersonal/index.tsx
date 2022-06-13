import {
  CircularProgress, TextField
} from '@mui/material'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { api } from '../../../services/api'
import { SnapshotProfile, SnapshotProfileShipping } from '../../contexts/PaymentContext'
import { useCart } from '../../contexts/ShoppingCartContext'
import styles from './styles.module.scss'





type InputProps = (val: string) => void

export default function FormPersonal() {
  const {register, handleSubmit} = useForm()

  const {addToTotal} = useCart()

  const [ isLoading, setIsLoading] = useState(false)
  const [isCheckedPac, setIsCheckedPac ] = useState(false)
  const [ isCheckedNoShipping, setIsCheckedNoShipping ] = useState(false)
  const [ pacPrice, setPacPrice ] = useState(null)
  const [ cep, setCep ] = useState('')
  const [ calcLoading, setCalcLoading ] = useState(false)
  const [ sedexPrice, setSedexPrice ] = useState()
  const [ isCepSeleted, setIsCepSelected ] = useState(false)
  const { useProfile, setProfile } = SnapshotProfile()
  const { useProfileShipping, setProfileShipping } = SnapshotProfileShipping()

  const orderData = {...useProfileShipping, shippingType: isCheckedPac ? 'sedex' : 'retirar da loja'} 


  useEffect(() => {
    console.log(pacPrice)
    console.log(orderData)
  },[])

  function handleLoadingComponent () {
    
  }


  function handleRadioPac() {
    if(isCheckedNoShipping){
      setIsCheckedNoShipping(!isCheckedNoShipping)
    }
    setIsCheckedPac(!isCheckedPac)
  }

  function handleRadioNoShipping() {
    if(isCheckedPac){
      setIsCheckedPac(!isCheckedPac)
    }
    setIsCheckedNoShipping(!isCheckedNoShipping)
  }

  function handleSelectRadio(e: any) {
    console.log(e.target.value)
    addToTotal(Number(e.target.value))
  }

  const inputFn: InputProps = (val) => setCep(val)

  const isValidInput = (id: string, val: string, size: number) =>
  !isNaN(Number(val)) && val.replace(/\D/g, '') !== id && val.length <= size

  const inputValidFn = (id: string, val: string) => {
    switch (id) {
      case 'cep':
        if (isValidInput(id, val, 8)) {
          inputFn(val)
        }
        break
      default:
          inputFn(val)
    }
  } 
  async function handleGetPriceShipping (args: any) {
    try {
      console.log(args.sCepDestino.length)
      if(args.sCepDestino.length === 8) {
        const res = await api.post('shipping',args)
        setPacPrice(res.data[0].Valor)

      }else {
        toast.error("Cep nao encontrado ou nao digitado!", {
          position: 'top-center'
        })
        setTimeout(function(){
          setCalcLoading(!!calcLoading)
          setIsCepSelected(!!isCepSeleted)
        },1000);
      }
    
    }catch (err) {
      console.log(err)
    }
  }

  function handleCepValues() {
    setIsCepSelected(!isCepSeleted)
    setCalcLoading(!calcLoading)
 

    let args = {
      // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
      sCepOrigem: '37970000',
      sCepDestino: cep,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço
      nVlDiametro: '0',
    };
  
    handleGetPriceShipping(args)

 
  }

  useEffect(() => {
    console.log(cep)
    const useProfileShippingData = localStorage.getItem('dataProfileShipping')
    console.log(useProfileShippingData)
    if(useProfileShippingData){
      setProfileShipping(JSON.parse(useProfileShippingData));
    }
  },[])

  useEffect(() => {
    localStorage.setItem('dataProfileShipping', JSON.stringify(useProfileShipping))
  },[useProfileShipping])

  function handleShippingData(data:any) {
    setIsLoading(!isLoading)
    const orderData = {...data, shippingType: isCheckedPac ? 'sedex' : 'retirar da loja'}
    setProfileShipping(orderData)
    if(isCheckedPac || isCheckedNoShipping){
      Router.push('/Checkout/Payment')
    }else {
      setIsLoading(!!isLoading)
      toast.error("Escolha a forma de frete", {
        position: 'top-center'
      })
      
    }
  }

  return (
    <div className={styles.contentForm}>
      <form id='user-data' className={styles.formCheckout} onSubmit={handleSubmit(handleShippingData)}>
       
        
        <div
          className={styles.labelContact}
        >
          Dados de Contato
        </div>
        <TextField 
          {...register('email')}
          id="outlined-basic"
          label="Email"
          variant="outlined"
          color="secondary"
          className={styles.emailField}
          style={{ marginBottom: '13px', backgroundColor: 'white'}} 
        />
        <div
          className={styles.labelData}
        >
          Dados do destinatário
        </div>
      
        
        <TextField
          {...register('firstName')}
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px',backgroundColor: 'white' }} 
        />

        <TextField 
          {...register('surname')}
          id="outlined-basic"
          label="Sobrenome"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px' ,backgroundColor: 'white'}} 
        />

        <TextField 
          {...register('telephone')}
          id="outlined-basic"
          label="Telefone"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px',backgroundColor: 'white' }} 
        />
        <div
          className={styles.labelAdress}
        >
          Endereço do destinatário
        </div>

        <TextField
          {...register('address')}
          id="outlined-basic"
          label="Endereço"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px', backgroundColor: 'white' }} 
        />

        <div className={styles.publicPlace}>
          <TextField
            {...register('number')}
            id="outlined-basic"
            label="Número"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px',backgroundColor: 'white' }} 
          />

          <TextField
            {...register('complement')}
            id="outlined-basic"
            label="Complemento"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px' , marginLeft:'0.8rem' ,backgroundColor: 'white', width: '25.9rem'}} 
          />
        </div>

        <TextField
          {...register('district')}
          id="outlined-basic"
          label="Bairro"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px',backgroundColor: 'white' }} 
        />
 
      
        <div
          className={styles.labelData}
        >
          Dados do comprador
        </div>
      
        
        <TextField
          {...register('doc')}
          id="outlined-basic"
          label="CPF"
          variant="outlined"
          color="secondary"
          style={{ marginBottom: '13px',backgroundColor: 'white' }} 
        />

       
        { !isLoading ?
            <div className={styles.buttonContinue}>
              <button 
                id='user-data' 
                type="submit" 
                className={!isCepSeleted || pacPrice === 0 ? styles.toBeContinued: styles.noToBeContinued}
               
              >
                Continuar
              </button>
            </div>
            
          :
          <div className={styles.circular}>
            <CircularProgress color='secondary'/>
          </div>
          
        }

        
      </form>

        <div className={styles.shipping}>
  
         
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.searchCep}>
              <div className={styles.shippingTitle}>
                Frete
              </div>

              <div className={styles.shippingInput}>
                <div>
                  <TextField
                  
                  id="outlined-basic" 
                  label="CEP" 
                  variant="outlined"
                  className={styles.cep}
                  onInput={(e) => {inputValidFn('cep', (e.target as HTMLInputElement).value)}}
                  color="secondary"
                  value={cep}
                  style={{ marginBottom: '13px', backgroundColor: 'white'}} 
                />

                </div>
              
                { !calcLoading || pacPrice ?
                  <button
                    onClick={() => handleCepValues()}
                  > 
                    Calcular 
                  </button>
                :
                  <div className={styles.circularCalc}>
                    <CircularProgress color='secondary'/>
                  </div>
                
                }
                </div>             
            </div>
          </form>

          

          {pacPrice ?
            <div className={styles.shippingOptions}>
              <div  className={isCheckedPac ? styles.pacSelected : styles.pac} onClick={() => handleRadioPac()}>
                <input 
                  type="radio" 
                  name="pac" 
                  id="pac"
                  color="secondary"
                  value={pacPrice}
                  checked={isCheckedPac}
                  onChange={(e) => handleSelectRadio(e as any)}
                />
                <div className={styles.priceAndText} id="pac">
                  <div className={styles.price}>Frete R${pacPrice}</div>
                  <div className={styles.text}> Frete utilizando o serviço PAC dos correios. </div>
                </div>

              </div>

              <div className={isCheckedNoShipping ? styles.sedexSelected : styles.sedex} onClick={(e) => handleRadioNoShipping()}>
                <input 
                    type="radio" 
                    name="sedex" 
                    id="sedex"
                    value={0}
                    checked={isCheckedNoShipping}
                    onChange={(e) => handleSelectRadio(e as any)}
                  />

                  <div className={styles.priceAndText}>
                    <div className={styles.price}>Grátis</div>
                    <div className={styles.text}> Grátis ao retirar diretamente da loja.</div>
                  </div>
              </div>
            </div>
            :
            <>
            </>
          }
        

        </div>
        
      
    </div>
  )  
}