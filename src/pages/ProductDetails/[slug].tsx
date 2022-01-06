import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../../components/Header";
import PurchaseInfo from "../../components/PurchaseInfo";
import SelectedImage from "../../components/SelectImage";
import styles from "./styles.module.scss";
import { products } from '../../mock/products'
import { ProductProps } from '../../components/Product'
import { Params } from "next/dist/server/router";
import Image from "next/image"
import Button from "../../components/Button";

export default function ProductDetails({product}: ProductProps) {
  return(
    <div>
    <Header/> 
    <div className={styles.containerDetails}>
      <SelectedImage image={product.image}/>
      <PurchaseInfo name={product.name}  description={product.description} price={product.price}/>
     </div>
  </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({params}: Params) => {
  const { slug } = params
  const prod = products.filter(prod => {
    if(prod.id === slug)
    return prod
  })


  const product = {
    id: prod[0].id,
    name: prod[0].name,
    description: prod[0].description,
    image: prod[0].image,
    price: prod[0].price,
  }

 
 

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return {
    props: {
      product
    }
  }
}