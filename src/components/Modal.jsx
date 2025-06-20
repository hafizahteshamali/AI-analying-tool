import { useEffect, useState } from "react"

const Modal = ({ children, isOpen = true }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Small delay to trigger animation after render
      const timer = setTimeout(() => setAnimate(true), 10)
      return () => clearTimeout(timer)
    } else {
      setAnimate(false)
      // Remove from DOM after animation completes
      const timer = setTimeout(() => setShouldRender(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!shouldRender) return null

  return (
    <>
      {/* Animated Backdrop */}
      <div
        className={`fixed inset-0 bg-[#d9d9d994] bg-opacity-50 z-40 transition-opacity duration-300 ease-out ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Animated Modal Box */}
      <div
        className={`fixed top-1/2 left-1/2 z-50 w-[95%] md:w-[70%] lg:w-[80%] h-[95vh] lg:max-h-[none] overflow-y-auto lg:overflow-visible bg-white rounded-lg shadow-lg transition-all duration-300 ease-out transform ${
          animate
            ? "opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100"
            : "opacity-0 -translate-x-1/2 -translate-y-1/2 scale-95"
        }`}
      >
        {children}
      </div>
    </>
  )
}

export default Modal
