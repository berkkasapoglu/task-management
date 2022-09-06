import styles from "./Backdrop.module.scss"
import { motion } from "framer-motion"
import variants from "@/utils/variants"

function Backdrop() {
  return (
    <motion.div
      variants={variants.backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.backdrop}
    ></motion.div>
  )
}
export default Backdrop
