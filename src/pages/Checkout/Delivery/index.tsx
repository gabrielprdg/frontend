import { TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import Link  from 'next/link';
import { useForm } from 'react-hook-form';
import { Header } from "../../../components/Header";
import { useCart } from '../../../contexts/ShoppingCartContext';
import styles from './styles.module.scss'


export default function Checkout () {

  const {register, handleSubmit} = useForm()

  const { cart, total } = useCart()

  return (
    <div className={styles.checkoutContainer}>
      <Header isLoginPage/>
      <div className={styles.contentForm}>
        <form action="" className={styles.formCheckout}>
          <div
            className={styles.labelContact}
          >
            Dados de Contato
          </div>
          <TextField 
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
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px',backgroundColor: 'white' }} 
          />

          <TextField 
            id="outlined-basic"
            label="Sobrenome"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px' ,backgroundColor: 'white'}} 
          />

          <TextField 
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
            id="outlined-basic"
            label="Endereço"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px', backgroundColor: 'white' }} 
          />

          <div className={styles.publicPlace}>
            <TextField
              id="outlined-basic"
              label="Número"
              variant="outlined"
              color="secondary"
              style={{ marginBottom: '13px',backgroundColor: 'white' }} 
            />

            <TextField
              id="outlined-basic"
              label="Complemento"
              variant="outlined"
              color="secondary"
              style={{ marginBottom: '13px' , marginLeft:'0.8rem' ,backgroundColor: 'white', width: '22rem'}} 
            />
          </div>

          <TextField 
            id="outlined-basic"
            label="Bairro"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: '13px',backgroundColor: 'white' }} 
          />

          <div className={styles.location}>
            <TextField
              id="outlined-basic" 
              label="CEP" 
              variant="outlined"
              className={styles.cep}
              color="secondary"
              style={{ marginBottom: '13px' ,backgroundColor: 'white', width: '22rem', marginRight:'1rem'}} 
            />
            <FormControl>
              <InputLabel id="demo-simple-select-label" color='secondary'>Estado</InputLabel>
              <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Estado"
                  defaultValue="Estado"
                  color="secondary"
                  className={styles.select}
                  style={{ height: '3.5rem', width:'4.2rem', backgroundColor: 'white'}}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            </FormControl>
          </div>

          <div
            className={styles.labelCharge}
          >
            Dados de Cobrança
          </div>
          
          <TextField
            id="outlined-basic" 
            label="CPF" 
            variant="outlined" 
            color="secondary"
            style={{ marginBottom: '13px', backgroundColor: 'white'}} 
          />
        </form>

        <Link href='/Checkout/Payment'>
          <button className={styles.toBeContinued}>Continuar</button>
        </Link>
       
      </div>

      <div className={styles.cartContent}>
        {cart.map((product,index) => {
          return ( 
            <div className={styles.cartDetails}>
              <div className={styles.imageProd}>
                <img src={product.images[0].url} alt="imageproductcart" />
              </div>
              <div className={styles.name}>{product.name} x <span className={styles.countP}>{product.count}</span><span>R${(product.price * product.count).toFixed(2)}</span></div>
            </div>
          )
        })}
        <div className={styles.cartPrice}>
          <div className={styles.subTot}>
            <div>Subtotal</div>
            <span>R${total.toFixed(2)}</span> 
          </div>
          <div className={styles.shipping}>
            <div>Custo de Frete</div> 
            <span>R${total.toFixed(2)}</span> 
          </div>
        </div>
        <div className={styles.cartTotal}>
          <span>Total</span>
          <div className={styles.tot}>
            R$ {total.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}