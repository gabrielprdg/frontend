import { Container } from '@mui/material'
import styles from './styles.module.scss'

type ColorType = {
  color?: string
}

export function ColorOptions({ color }: ColorType) {
  
  return (
    <div className={styles.colorOptionsContainer}>
      <Container style={{color: color, width: '5px', height: '5px'}}></Container>
    </div>
  )
}