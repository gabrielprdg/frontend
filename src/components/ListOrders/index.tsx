import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { api } from '../../../services/api'
import { Order } from '../../pages/Admin'
import RemoveButton from '../../../public/trash-can.png'
import Image from "next/image"

export type listOrdersProps = {
  od: Order[]
}

export function ListOrders({od}: listOrdersProps){
  return (
    <div className={styles.listOrdersContainer}>
      
      {od.map(order => (
        // loading all the orders from fetch api
        <div className={styles.orders}>
          <div className={styles.imgProduct}>
            <img src={order.product.images[0].url} alt=""/>
          </div>
          <div className={styles.orderDetails}>
            <div>
              <div className={styles.nameProduct}>Nome</div>
              <div className={styles.name}>
                {order.product.name}
              </div>
            </div>
            <div>
              <div className={styles.nameProduct}>Cliente</div>
              {`${order.user.firstName} ${order.user.surname} `}
            </div>
            <div>
              <div className={styles.nameProduct}>Preço</div>
              {order.product.price}
            </div>

            <div>
              <div className={styles.nameProduct}>Tamanho</div>
              {order.product.productSize}
            </div>

            <div>
              <div className={styles.nameProduct}>Categoria</div>
              {order.product.category}
            </div>

            <div>
              <div className={styles.nameProduct}>Cores</div>
              {order.product?.colors}
            </div>
          </div>

          <div className={styles.removeButton}>
            <Image src={RemoveButton}/>
          </div>
        </div>
      ))}
    </div>
  )
}