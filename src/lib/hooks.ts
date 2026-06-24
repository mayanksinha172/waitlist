import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useInView, type MotionValue } from 'framer-motion'

export function useScrollProgress(): MotionValue<string> {
  const { scrollYProgress } = useScroll()
  return useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
}

export function useCountUp(target: number, duration = 2000) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start: number | null = null
    let raf: number

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(easeOut(progress) * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return { ref, count }
}

export function useParallaxY(outputRange: [number, number]): MotionValue<number> {
  const { scrollY } = useScroll()
  return useTransform(scrollY, [0, 2000], outputRange)
}
