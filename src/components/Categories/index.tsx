import { Category } from '../../pages'
import styles from './styles.module.scss'

type CategoryProps = {
  ct: Category[]
}

export default function Categories({ct}: CategoryProps){
  return (
    <div className={styles.categoriesContainer}>
      {ct.map(c => (
        <div key={c.id} className={styles.category}>{c.name}</div>
      ))}
    </div>
  )
}

