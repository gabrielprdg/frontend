import React, { useState } from "react"
import styles from './styles.module.scss'
import Link from 'next/link'
import Close from '../../../public/x.svg'
import Menu from '../../../public/menu.svg'
import Image from 'next/image'
import { useCart } from "../../contexts/ShoppingCartContext"
import Logo from '../../../public/logo.jpg'

type HeaderProps = {
  isLoginPage?: boolean
  isAdminPage?: boolean
}

export function Header({isLoginPage, isAdminPage}: HeaderProps){

  const {cart} = useCart()
  const [openMenu,setOpenMenu] = useState(false)

  console.log(cart)
  function menuToggle() {
    setOpenMenu(!openMenu)
  }

  if(isAdminPage){
    return (
      <div className={styles.headerContainer}>
        <div className={styles.menuhamb} onClick={() => {menuToggle()}}>
          <Image src={Menu} alt="menu" />
        </div>
        <div className={styles.headTitle}>
          <Link href="/">
            <div className={styles.title}>
              <h2 className={styles.use}>
                {process.env.BASE_URL}
              </h2>
              <div className={styles.fsl}>
                FashionStoreLook
              </div>
            </div>
          </Link>
        </div>

        <nav className={styles.menu}>
            <ul className={openMenu ? styles.toggle :""}>
              <li><Link href="/Login">Adicionar Produto</Link></li>
              <li><Link href="/contact"> Excluir algum produto</Link></li>
              <li><Link href="/about"> Adicionar Categoria </Link></li>
              <li><Link href="/requests"> Excluir Categoria </Link></li>
              <li><Link href="/requests"> Orders </Link></li>
              <li><Link href="/requests"> Logout </Link></li>
              <li className={styles.close} onClick={menuToggle} >
                <Image src={Close} alt="" width={25} height={35}/>
              </li>
            </ul>
        </nav>
      </div>
    )
  }else if(!isLoginPage){
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
        
        <nav className={styles.menu}>
          <ul className={openMenu ? styles.toggle :""}>
            <li><Link href="/SignIn">Sign In</Link></li>
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
      </div>
    )
  } else {
    return (
      <div className={styles.headerContainer}>
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
      </div>
    )
  }
}
