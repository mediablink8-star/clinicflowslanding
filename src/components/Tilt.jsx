import { useTilt } from './useTilt'

/**
 * Wraps children in a CSS 3D tilt that follows the pointer.
 *
 * Renders flat (no transform, no glare) whenever tilt is unavailable —
 * coarse pointers, reduced-motion visitors, or any environment without
 * matchMedia. There is no code path where this can throw.
 */
export default function Tilt({
  children,
  max = 7,
  scale = 1.012,
  glare = true,
  className = '',
  lift = true,
  ...rest
}) {
  const { ref, enabled, active } = useTilt({ max, scale })

  return (
    <div className={`stage ${className}`} {...rest}>
      <div
        ref={ref}
        className={`relative h-full ${enabled ? 'tiltable' : ''} ${
          enabled && active ? 'is-engaged' : ''
        } ${lift ? 'edge-light' : ''}`}
        style={{ borderRadius: 'inherit' }}
      >
        {children}
        {enabled && glare && <span className="glare" aria-hidden="true" />}
      </div>
    </div>
  )
}
