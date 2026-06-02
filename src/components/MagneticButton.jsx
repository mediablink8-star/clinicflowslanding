import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, className = '', as: Tag = 'a', href, ...props }) {
  const ref = useRef(null)

  const onMouse = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
  }, [])

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0px, 0px)'
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouse}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {Tag === 'a' ? (
        <a href={href} {...props}>{children}</a>
      ) : (
        <button {...props}>{children}</button>
      )}
    </motion.div>
  )
}