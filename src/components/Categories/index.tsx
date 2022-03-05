import { Category } from '../../pages'
import styles from './styles.module.scss'

type CategoryProps = {
  ct: Category[]
}

export default function Categories({ct}: CategoryProps){
  return (
    <div className={styles.categoriesContainer}>
      {ct.map((c,i) => (
        <div key={i} className={styles.category}>{c.name}</div>
      ))}
    </div>
  )
}

