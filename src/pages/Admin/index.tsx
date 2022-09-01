import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { Images } from '..'
import { api } from '../../../services/api'
import { Header } from '../../components/Header'
import { ListOrders } from '../../components/ListOrders'
import ProductRegistrationForm from '../../components/ProductRegistrationForm'
import styles from './styles.module.scss'

export type UserProfile = {
  email: string
	firstName: string
	surname: string
	telephone: string
	address: string
	number: string
	complement: string
	district: string
	doc: string
	shippingType: string
}

type productShoppingCart = {
  name: string
  description: string
  category: string
  price: string
  colors: string
  productSize: string
  images: Array<Images>
  createdAt: string
  count: number
  id: string
}

export type Order = {
  id :string
  user: UserProfile
  product: productShoppingCart
}

type AdminProps = {
  orders: Order[]
}

export default function AdmPanel({orders}: AdminProps){

  const [optionView, setOptionView] = useState(1)

  const changeOption = (optionNumber: number) => {
    setOptionView(optionNumber)
  }

  function choseAction ():any {
    if (optionView === 1){
      return <ProductRegistrationForm/>
    } else if(optionView === 2) {

    } else if(optionView === 3) {

    } else if(optionView === 4) {

    } else if(optionView === 5) {
      return <ListOrders od={orders}/>
    } else {
      return 'Opção nao encontrada'
    }
  }


  return (
    <div className={styles.panelContainer}>
      <Header isAdminPage/>
      <div className={styles.admContainer}>
        <div className={styles.topics}>
          <li onClick={() => {changeOption(1)}}> Adicionar Produto</li>
          <li onClick={() => {changeOption(2)}}> Excluir algum produto</li>
          <li onClick={() => {changeOption(3)}}> Adicionar Categoria </li>
          <li onClick={() => {changeOption(4)}}> Excluir Categoria </li>
          <li onClick={() => {changeOption(5)}}> Orders </li>
        </div>

        <div className={styles.content}>
          {choseAction()}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const ordersData = await api.get('order')
  

  const orders = ordersData.data

  return {
    props: {
      orders
    }
  }
}
