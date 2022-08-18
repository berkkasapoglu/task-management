import styles from "./DropdownItem.module.scss"

function DropdownItem({ color, onClick, children }) {
  return (
    <button className={`${styles.item} ${styles[color]}`} onClick={onClick}>
      {children}
    </button>
  )
}
export default DropdownItem
