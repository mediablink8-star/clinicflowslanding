import { useState, useEffect, useCallback } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const handleMouse = useCallback((e) => {
    setPos({ x: e.clientX, y: e.clientY })
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])
  return pos
}

export function useTilt(ref, intensity = 10) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setTilt({
        rotateY: (x - 0.5) * intensity,
        rotateX: (0.5 - y) * intensity,
      })
    }

    const handleLeave = () => setTilt({ rotateX: 0, rotateY: 0 })

    el.addEventListener('mousemove', handleMouse, { passive: true })
    el.addEventListener('mouseleave', handleLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', handleMouse)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, intensity])

  return tilt
}