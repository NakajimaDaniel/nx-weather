
import styles from './styles.module.scss'

export function SearchBar() {

  return (
    <div className={styles.searchContainer}>
      <input type="text" placeholder="Search ...">
      </input>
    </div>
  )

} 