import MODAL_TYPES from "../modalTypes"
import Input from "../../Form/Input/Input"
import styles from "../Modal.module.scss"
import Button from "../../Button/Button"
import { useState } from "react"

function Auth({ type }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const { username, password, email } = formData

  const onChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value,
    })
  }
  return (
    <>
      <h2 className={styles.title}>Sign In</h2>
      {type === MODAL_TYPES.signUp && (
        <Input
          label="Email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onChange}
        />
      )}
      <Input
        label="Username"
        name="username"
        id="username"
        value={username}
        onChange={onChange}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={onChange}
      />
      <div className={styles.footer}>
        <Button>Sign Up</Button>
      </div>
    </>
  )
}
export default Auth
