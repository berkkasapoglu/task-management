import styles from "./Button.module.scss"
function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${styles.base} ${styles[props.type || "primary"]} ${
        styles[props.size]
      }`}
    >
      {children}
    </button>
  )
}
export default Button
