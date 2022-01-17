import React, { useState } from "react"
import styles from './styles.module.scss'
import Link from 'next/link'
import Close from '../../../public/x.svg'
import Menu from '../../../public/menu.svg'
import Image from 'next/image'
import { useCart } from "../../contexts/ShoppingCartContext"

type HeaderProps = {
  isLoginPage: boolean
}

export function Header({isLoginPage}: HeaderProps){

  const {cart} = useCart()
  const [openMenu,setOpenMenu] = useState(false)

  console.log(cart)
  function menuToggle() {
    setOpenMenu(!openMenu)
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.menuhamb} onClick={() => {menuToggle()}}>
        <Image src={Menu} alt="menu" />
      </div>
      <div className={styles.headTitle}>
        <Link href="/">
          <div className={styles.title}>
            <h2 className={styles.use}>
              Use
            </h2>
            <div className={styles.fsl}>
              FashionStoreLook
            </div>
          </div>
        </Link>
      </div>

      {!isLoginPage ? 
        <nav className={styles.menu}>
          <ul className={openMenu ? styles.toggle :""}>
            <li><Link href="/Login">Login / Register</Link></li>
            <li><Link href="/contact"> Contact </Link></li>
            <li><Link href="/about"> About </Link></li>
            <li><Link href="/requests"> Meus pedidos </Link></li>
            <li className={styles.close} onClick={menuToggle} >
              <Image src={Close} alt="" width={25} height={35}/>
            </li>
          </ul>
          <div className={styles.navCart}>
            <span>{cart.length}</span>
            <Link href='/Cart'>
              <img src="/shopping-bag.svg" alt="shoppingbag" width={20} height={20}/>
            </Link>
          </div>
        </nav>
      : 
        <nav className={styles.menu}>
          <ul className={openMenu ? styles.toggle :""}>
            <li><Link href="/Login">Login / Register</Link></li>
            <li><Link href="/contact"> Contact </Link></li>
            <li><Link href="/about"> About </Link></li>
            <li><Link href="/requests"> Meus pedidos </Link></li>
            <li className={styles.close} onClick={menuToggle} >
              <Image src={Close} alt="" width={25} height={35}/>
            </li>
          </ul>
        </nav>
      }
      
    </div>
  )
}
