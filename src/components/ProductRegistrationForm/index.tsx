import { useState } from 'react'
import styles from './styles.module.scss'
import { FiPlus,FiX } from "react-icons/fi";

export default function ProductRegistrationForm() {
  const [previewImages,setPreviewImages] = useState<string[]>([])

  function handleSelectImages(){

  }

  return (
    <div className={styles.prodRegisterContainer}>
      <h2> Cadastrar produto </h2>
      <form action="">
        <div className={styles.inputData}>
          <label htmlFor=""> Nome</label>
          <input type="text" />
        </div>
     
        <div className={styles.inputData}>
          <label htmlFor=""> Descrição </label>
          <input type="text" />
        </div>


        <div className={styles.inputData}>
          <label htmlFor=""> Preço </label>
          <input type="text" />
        </div>
   
        <div className={styles.inputData}>
          <label htmlFor=""> Selecione sua categoria :</label>
          <select name="" id="">

          </select>
        </div>


        <div className={styles.inputData}>
          <label htmlFor=""> Cores disponíveis </label>
          <input type="color"/>
        </div>

        <div className={styles.productSizes}>
          <label htmlFor=""> Tamanhos disponíveis </label>
          <div className={styles.sizes}>
            <div>
              <input type="radio" value="P"/>
              <span>P</span>
            </div>
            
            <div>
              <input type="radio" value="M"/>
              <span>M</span>
            </div>
 
            <div>
              <input type="radio" value="G"/> 
              <span>G</span>
            </div>
                   
            <div>
              <input type="radio" value="GG"/>
              <span>GG</span>
            </div>
                   
            <div>
              <input type="radio" value="XGG"/>
              <span>XGG</span>
            </div>    
           
          </div>
        </div>
     
     
        <div className={styles.inputBlock}> 
          <div className={styles.imagesContainer}>       
            {previewImages.map(image => {
              return (          
                <img key={image} src={image} />              
              )
            })}
    
            <label htmlFor="image[]" className={styles.newImage}>      
              <FiPlus size={24} color="#15b6d6"/>
            </label>
            <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
          </div> 
        </div>

      </form>
    </div>
  )
}