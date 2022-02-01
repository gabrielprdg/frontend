import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem
} from '@mui/material'

import { useForm } from 'react-hook-form'
import { usePayment } from '../../contexts/PaymentContext'
import styles from './styles.module.scss'

export default function FormPersonal() {
  
  const {register, handleSubmit} = useForm()

  const { userRegistration } = usePayment()

  function handleShippingData(data:any) {
    userRegistration(data)
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
          {...register('name')}
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
            style={{ marginBottom: '13px' , marginLeft:'0.8rem' ,backgroundColor: 'white', width: '22rem'}} 
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

        <div className={styles.location}>
          <TextField
            {...register('cep')}
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
                {...register('state')}
                defaultValue="Estado"
                color="secondary"
                className={styles.select}
                style={{ height: '3.5rem', width:'4.2rem', backgroundColor: 'white'}}
            >
                <MenuItem value="AC">Acre</MenuItem>
                <MenuItem value="AL">Alagoas</MenuItem>
                <MenuItem value="AP">Amapá</MenuItem>
                <MenuItem value="AM">Amazonas</MenuItem>
                <MenuItem value="BA">Bahia</MenuItem>
                <MenuItem value="CE">Ceará</MenuItem>
                <MenuItem value="DF">Distrito Federal</MenuItem>
                <MenuItem value="ES">Espírito Santo</MenuItem>
                <MenuItem value="GO">Goiás</MenuItem>
                <MenuItem value="MA">Maranhão</MenuItem>
                <MenuItem value="MT">Mato Grosso</MenuItem>
                <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
                <MenuItem value="MG">Minas Gerais</MenuItem>
                <MenuItem value="PA">Pará</MenuItem>
                <MenuItem value="PB">Paraíba</MenuItem>
                <MenuItem value="PR">Paraná</MenuItem>
                <MenuItem value="PE">Pernambuco</MenuItem>
                <MenuItem value="PI">Piauí</MenuItem>
                <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                <MenuItem value="RN">Rio Grande do Norte</MenuItem>
                <MenuItem value="RS">Rio Grande do Sul</MenuItem>
                <MenuItem value="RO">Rondônia</MenuItem>
                <MenuItem value="RR">Roraima</MenuItem>
                <MenuItem value="SC">Santa Catarina</MenuItem>
                <MenuItem value="SP">São Paulo</MenuItem>
                <MenuItem value="SE">Sergipe</MenuItem>
                <MenuItem value="TO">Tocantins</MenuItem>
                <MenuItem value="EX">Estrangeiro</MenuItem>
          </Select>
          </FormControl>
        </div>

        <div
          className={styles.labelCharge}
        >
          Dados de Cobrança
        </div>
        
        <TextField
          {...register('cpf')}
          id="outlined-basic" 
          label="CPF" 
          variant="outlined" 
          color="secondary"
          style={{ marginBottom: '13px', backgroundColor: 'white'}} 
        />
        <button id='user-data' type="submit" className={styles.toBeContinued}>Continuar</button>
      </form>
    </div>
  )  
}