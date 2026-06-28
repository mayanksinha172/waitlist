import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 22 })
  const sy = useSpring(y, { stiffness: 280, damping: 22 })

  useEffect(() => {
    const RADIUS = 90
    const STRENGTH = 0.4

    const onMove = (e: MouseEvent) => {
      if (!ref.current || disabled) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < RADIUS) {
        const pull = (1 - dist / RADIUS) * STRENGTH
        x.set(dx * pull)
        y.set(dy * pull)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [disabled])

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
    >
      {children}
    </motion.button>
  )
}
