import styles from "./Dropdown.module.scss"
import useClickOutside from "@/hooks/useClickOutside"

function Dropdown({ children, setIsDropdownOpen }) {
  const dropdownRef = useClickOutside(() => setIsDropdownOpen(false))
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {children}
    </div>
  )
}
export default Dropdown
