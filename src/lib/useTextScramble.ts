import { useState, useEffect, useRef } from 'react'

const CHARS = '!@#$%^&*_+-=[]{}|;:<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export function useTextScramble(text: string, trigger: boolean, duration = 750) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!trigger) return

    let start: number | null = null

    const animate = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const progress = Math.min(elapsed / duration, 1)
      const resolved = Math.floor(progress * text.length)

      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < resolved) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay(text)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [trigger, text, duration])

  return display
}
