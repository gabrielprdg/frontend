import Link from 'next/link'
import { useState } from 'react'
import { Header } from '../../components/Header'
import ProductRegistrationForm from '../../components/ProductRegistrationForm'
import styles from './styles.module.scss'

export default function AdmPanel(){

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