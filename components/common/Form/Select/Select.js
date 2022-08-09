import styles from "../Input/Input.module.scss"

function Select({ label, options, ...props }) {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <select className={styles.input} {...props}>
        {options.map((option, idx) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Select
