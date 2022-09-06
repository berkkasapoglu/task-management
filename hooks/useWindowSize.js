import { useState } from "react"
import { useEffect } from "react"

function useWindowSize() {
  const [screen, setScreen] = useState({})

  useEffect(() => {
    const handleWindowResize = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  })
  return screen
}

export default useWindowSize
