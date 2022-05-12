import { Category } from '../../pages'
import styles from './styles.module.scss'

type CategoryProps = {
  ct?: Category[]
  getCategory?: (category: string) => void
  handleOptions?: () => void
}

export default function Categories({ct, getCategory, handleOptions}: CategoryProps){
  return (
    <div className={styles.categoriesContainer}>
      <select name="" id="" onChange={(e => {
        if(getCategory){
          getCategory(e.target.value)
        }
        if (handleOptions) {
          handleOptions()
        }
        })}>
        <option  selected hidden> Categorias</option>
        {ct?.map((c,i) => (
          <option key={i} value={c.name}>{c.name}</option>
        ))}
        <option value="todosprod">Todos os produtos</option>
      </select>
    </div>
  )
}



