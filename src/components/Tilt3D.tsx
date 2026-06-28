import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  intensity?: number
}

export default function Tilt3D({ children, className = '', style, intensity = 8 }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const springRotX = useSpring(rotX, { stiffness: 220, damping: 28 })
  const springRotY = useSpring(rotY, { stiffness: 220, damping: 28 })

  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotX.set(-dy * intensity)
    rotY.set(dx * intensity)
    glowX.set(((e.clientX - rect.left) / rect.width) * 100)
    glowY.set(((e.clientY - rect.top) / rect.height) * 100)
    setGlowPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  const onLeave = () => {
    rotX.set(0)
    rotY.set(0)
    setActive(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        ...style,
        rotateX: springRotX,
        rotateY: springRotY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onLeave}
    >
      {children}

      {/* Inner cursor spotlight */}
      <div
        className="absolute inset-0 rounded-[14px] pointer-events-none transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.055) 0%, transparent 60%)`,
          zIndex: 2,
        }}
      />
    </motion.div>
  )
}
