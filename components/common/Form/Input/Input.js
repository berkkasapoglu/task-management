import styles from "./Input.module.scss"

function Input({ label, id, ...props }) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        label={label}
        id={id}
        className={styles.input}
        {...props}
        required
      />
    </div>
  )
}
export default Input
