import styles from './styles.module.scss'

type ButtonProps = {
  title: string,
  islightButton: boolean
}

export default function Button({title, islightButton}: ButtonProps) {
  return (
    <button className={islightButton ? styles.buttonContainer : styles.lightButton}>
      {title}
    </button>
  )
}



