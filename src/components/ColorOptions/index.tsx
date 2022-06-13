import { Container } from '@mui/material'
import { useRef } from 'react'
import styles from './styles.module.scss'

type ColorType = {
  color?: string
  colorSelected ?: boolean
  index: number
}

export function ColorOptions({ color, colorSelected, index }: ColorType) {


  
  return (
    <div className={styles.colorOptionsContainer}>
        <div style={{
          backgroundColor: color,
          height: '30px',
          width: '30px',
          borderRadius: '50%',
          border: '1px solid white',
        }}/>
    </div>
  )
}