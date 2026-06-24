import { useState, useEffect, type RefObject } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useParallaxY } from '../lib/hooks'

const cycleWords = ['money', 'time', 'clients', 'margins']

const CONFETTI_COLORS = [
  '#fcfdff', '#a1a4a5', '#3b9eff', '#11ff99',
  '#ff801f', '#ffc53d', '#ff2047', '#888e90',
]

interface HeroProps {
  formRef: RefObject<HTMLDivElement | null>
  waitlistCount: number
  onSignup: (email: string) => void
}

export default function Hero({ formRef, waitlistCount, onSignup }: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const blobY = useParallaxY([0, -80])

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % cycleWords.length), 2400)
    return () => clearInterval(id)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    onSignup(email)
    setSubmitted(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1200)
  }

  const headWords = 'Stop losing'.split(' ')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-8 pb-32 overflow-hidden">
      {/* Atmospheric blue glow */}
      <motion.div
        style={{ y: blobY }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        aria-hidden
      >
        <div
          className="w-full h-full"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 20%, rgba(0,117,255,0.28) 0%, transparent 70%)' }}
        />
      </motion.div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow: Inter UI font, uppercase */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 badge-pill mb-10 font-ui"
        >
          <span className="w-1.5 h-1.5 bg-[#11ff99] rounded-full animate-glow-pulse" />
          <span>
            <span className="text-[#11ff99]">{waitlistCount}+</span> freelancers on the waitlist
          </span>
        </motion.div>

        {/* Headline: Playfair Display serif, 88px, tight */}
        <div className="mb-6">
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-[88px]"
            style={{ lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            {headWords.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block mr-[0.2em] text-[#fcfdff]"
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.65, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}

            {' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={cycleWords[wordIndex]}
                className="inline-block italic text-[#3b9eff]"
                style={{ fontStyle: 'italic' }}
                initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {cycleWords[wordIndex]}
              </motion.span>
            </AnimatePresence>

            <motion.span
              className="block mt-3 text-[#fcfdff]"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              to scope creep.
            </motion.span>
          </h1>
        </div>

        {/* Subtitle: Plus Jakarta Sans, the marketing voice */}
        <motion.p
          className="font-marketing text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: 'rgba(252,253,255,0.65)', fontWeight: 400 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          FreelanceGuard AI writes proposals, detects scope creep in real time, and auto-generates
          priced change orders — so every hour of work gets paid.
        </motion.p>

        {/* Email form */}
        <motion.div
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto mb-10"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-2"
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                {/* Input: Inter for UI precision */}
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
                  style={{
                    background: '#0a0a0c',
                    border: '1px solid rgba(255,255,255,0.14)',
                    height: '40px',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
                />
                <div className="relative flex-shrink-0">
                  {confetti && (
                    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
                      {Array.from({ length: 18 }).map((_, i) => {
                        const angle = (360 / 18) * i
                        const dist = 50 + Math.random() * 50
                        const tx = Math.cos((angle * Math.PI) / 180) * dist
                        const ty = Math.sin((angle * Math.PI) / 180) * dist - 40
                        return (
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-sm animate-confetti"
                            style={{
                              background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                              transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`,
                            }}
                          />
                        )
                      })}
                    </div>
                  )}
                  <button type="submit" className="btn-primary h-[40px] font-ui">
                    Join Waitlist
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="surface-card px-6 py-5 text-center"
                style={{ borderColor: 'rgba(17,255,153,0.3)' }}
              >
                <CheckCircle className="w-7 h-7 text-[#11ff99] mx-auto mb-2" />
                {/* Success state: Inter for precision */}
                <p className="font-ui font-medium text-[#fcfdff] mb-1">You're on the list.</p>
                <p className="font-marketing text-sm text-[#a1a4a5]">We'll reach out when your spot opens.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs text-[#464a4d] mt-3 text-center font-ui">
            No credit card · No spam · Unsubscribe anytime
          </p>
        </motion.div>

        {/* Stats row: JetBrains Mono for numbers, Inter for labels */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {[
            { value: `${waitlistCount}+`, label: 'on waitlist' },
            { value: '$1,200', label: 'avg saved per project' },
            { value: '< 60s', label: 'to generate a proposal' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2 text-sm">
              <span className="font-mono font-medium text-[#fcfdff]">{value}</span>
              <span className="font-ui text-[#888e90]">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}
