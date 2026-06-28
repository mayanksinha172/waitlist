import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const TRAIL_LENGTH = 14

export default function CustomCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  const ringX = useSpring(mouseX, { stiffness: 140, damping: 16, mass: 0.08 })
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 16, mass: 0.08 })

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  /* Trail — direct DOM manipulation, no React state */
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const posBuffer = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
  )
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined' || 'ontouchstart' in window) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)

      posBuffer.current.unshift({ x: e.clientX, y: e.clientY })
      posBuffer.current.length = TRAIL_LENGTH
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onDocMouseMove = (e: MouseEvent) => {
      const isInteractive = (e.target as HTMLElement).closest('a, button, input, textarea, select, label, [role="button"]')
      setHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousemove', onDocMouseMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    /* RAF trail update */
    const updateTrail = () => {
      posBuffer.current.forEach((pos, i) => {
        const el = trailRefs.current[i]
        if (!el) return
        const progress = (TRAIL_LENGTH - i) / TRAIL_LENGTH
        const size = Math.max(progress * 7, 1)
        el.style.left = `${pos.x}px`
        el.style.top = `${pos.y}px`
        el.style.width = `${size}px`
        el.style.height = `${size}px`
        el.style.opacity = visible ? `${progress * 0.45}` : '0'
        el.style.transform = `translate(-50%, -50%)`
      })
      rafRef.current = requestAnimationFrame(updateTrail)
    }
    rafRef.current = requestAnimationFrame(updateTrail)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', onDocMouseMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  /* Click burst particles */
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null)
  useEffect(() => {
    const onClickBurst = (e: MouseEvent) => {
      setBurst({ x: e.clientX, y: e.clientY, id: Date.now() })
      setTimeout(() => setBurst(null), 700)
    }
    window.addEventListener('click', onClickBurst)
    return () => window.removeEventListener('click', onClickBurst)
  }, [])

  const dotSize = clicked ? 4 : 7
  const ringSize = hovered ? 44 : clicked ? 18 : 32

  return (
    <>
      {/* Comet trail dots */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el }}
          className="fixed rounded-full pointer-events-none"
          style={{
            zIndex: 9996,
            background: i % 3 === 0 ? '#11ff99' : i % 3 === 1 ? '#4080FF' : '#11ff99',
            transition: 'opacity 0.1s',
          }}
        />
      ))}

      {/* Precise dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: mouseX,
          top: mouseY,
          x: -dotSize / 2,
          y: -dotSize / 2,
          width: dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: hovered ? '#EDF0FF' : '#11ff99',
          boxShadow: hovered
            ? '0 0 12px rgba(237,240,255,0.8)'
            : '0 0 12px rgba(17,255,153,0.9), 0 0 24px rgba(17,255,153,0.4)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.12s, height 0.12s, background 0.15s, box-shadow 0.15s, opacity 0.2s',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
        animate={{
          x: -ringSize / 2,
          y: -ringSize / 2,
          width: ringSize,
          height: ringSize,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: hovered
              ? '1.5px solid rgba(237,240,255,0.7)'
              : '1.5px solid rgba(17,255,153,0.55)',
            background: hovered ? 'rgba(237,240,255,0.05)' : 'transparent',
            transition: 'border 0.2s, background 0.2s',
          }}
        />
      </motion.div>

      {/* Click burst */}
      {burst && (
        <div
          key={burst.id}
          className="fixed pointer-events-none"
          style={{ left: burst.x, top: burst.y, zIndex: 9997 }}
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  background: i % 2 === 0 ? '#11ff99' : '#4080FF',
                  top: -2,
                  left: -2,
                  boxShadow: `0 0 6px ${i % 2 === 0 ? '#11ff99' : '#4080FF'}`,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 30,
                  y: Math.sin((angle * Math.PI) / 180) * 30,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
              />
            )
          })}
        </div>
      )}
    </>
  )
}
