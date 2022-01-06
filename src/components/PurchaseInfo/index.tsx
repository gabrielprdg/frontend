import React from 'react'
import Button from '../Button'
import styles from './styles.module.scss'

type PurchaseProps = {
  name: string
  description: string
  price: number 
}

export default function PurchaseInfo({name, description, price}: PurchaseProps) {
  return (
    <div className={styles.purchaseContainer}>
      <p className={styles.nameP}>{name}</p>
      <div className={styles.priceP}>R${price}</div>
      <div className={styles.descriptionP}>
        {description}
      </div>
      <Button title="Comprar agora" islightButton/>
      <Button title="Adicionar ao carrinho" islightButton={false}/>
    </div>
  )
}