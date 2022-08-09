import { useEffect, useRef } from "react"

function useClickOutside(cb) {
  const domRef = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (domRef.current && !domRef.current.contains(e.target)) {
        cb()
      }
    }

    document.addEventListener("click", handleClick, true)
    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  })
  return domRef
}

export default useClickOutside
