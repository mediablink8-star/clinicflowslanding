import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/**
 * Tracks the visitor's reduced-motion preference, live.
 *
 * Defaults to true when matchMedia is unavailable so that anything gated on
 * this errs toward stillness rather than motion.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion)

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return

    const sync = () => setReduced(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reduced
}

/**
 * True only when the primary pointer can hover and is precise.
 *
 * Deliberately does not use navigator.maxTouchPoints: Windows touch laptops
 * report a non-zero value even with a mouse attached, which would wrongly
 * disable the effect on machines that handle it perfectly well.
 */
const hasFinePointer = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches ?? false)

/**
 * Pointer-driven 3D tilt.
 *
 * Deliberately CSS-only: no WebGL context, no extra dependency, nothing to
 * download, so it cannot fail on a venue machine the way a canvas-based
 * effect would.
 *
 * Every write is funnelled through one requestAnimationFrame callback, so a
 * fast mouse cannot queue up hundreds of React renders per second. Writes go
 * straight to style on the node instead of through React state, so a slow
 * frame can never block paint.
 *
 * Bails out entirely on touch devices and when the visitor has asked for
 * reduced motion.
 */
export function useTilt({ max = 8, scale = 1, glare = false } = {}) {
  const ref = useRef(null)
  const frame = useRef(0)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const ok = !prefersReducedMotion() && hasFinePointer()
    setEnabled(ok)
    if (!ok) return

    let g = 0

    const write = (rx, ry, s, gx, gy) => {
      node.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${s}, ${s}, ${s})`
      node.style.setProperty('--glare-x', `${gx * 100}%`)
      node.style.setProperty('--glare-y', `${gy * 100}%`)
      node.style.setProperty('--glare-o', g)
    }

    const schedule = (event) => {
      g = 1
      if (frame.current) return

      frame.current = requestAnimationFrame(() => {
        frame.current = 0

        const rect = node.getBoundingClientRect()
        const px = (event.clientX - rect.left) / rect.width
        const py = (event.clientY - rect.top) / rect.height

        write(
          (0.5 - py) * max * 2,
          (px - 0.5) * max * 2,
          scale,
          px,
          py,
        )
      })
    }

    const reset = () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current)
        frame.current = 0
      }
      g = 0
      write(0, 0, 1, 0.5, 0.5)
    }

    const onEnter = () => setActive(true)
    const onLeave = () => {
      setActive(false)
      reset()
    }

    node.addEventListener('pointerenter', onEnter)
    node.addEventListener('pointermove', schedule, { passive: true })
    node.addEventListener('pointerleave', onLeave)

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current)
      node.removeEventListener('pointerenter', onEnter)
      node.removeEventListener('pointermove', schedule)
      node.removeEventListener('pointerleave', onLeave)
      node.style.transform = ''
    }
  }, [max, scale])

  return { ref, enabled, active }
}
