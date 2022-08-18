import styles from "./Dropdown.module.scss"

function Dropdown({ children }) {
  return <div className={styles.dropdown}>{children}</div>
}
export default Dropdown
