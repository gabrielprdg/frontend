import styles from './styles.module.scss'

type ColorType = {
  color: string
}

export function ColorOptions({ color }: ColorType) {
  

  function setColor(color:string) {
    if(color === 'verde Lima' || color === 'verde lima'){
      return (
        <div className={styles.greenLemon}></div>
      )
    } else if (color === 'azul' ||  color === 'Azul') {
      return (
        <div className={styles.blue}></div>
      )
    } else if (color === 'rosa' || color === 'Rosa') {
      return (
        <div className={styles.pink}></div>
      )
    } else if (color === 'roxo' || color === 'Roxo') {
      return (
        <div className={styles.purple}></div>
      )
    } else if (color === 'vermelho' || color === 'Vermelho') {
      return (
        <div className={styles.red}></div>
      )
    } else if (color === 'laranja' ||  color === 'Laranja') {
      return (
        <div className={styles.orange}></div>
      )
    } 
  }

  return (
    <div className={styles.colorOptionsContainer}>
      {setColor(color)}
    </div>
  )
}