import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'

const CONFETTI_COLORS = ['#fcfdff', '#3b9eff', '#11ff99', '#ffc53d', '#ff801f', '#a1a4a5']

interface FinalCTAProps {
  waitlistCount: number
  onSignup: (email: string) => void
}

export default function FinalCTA({ waitlistCount, onSignup }: FinalCTAProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    onSignup(email)
    setSubmitted(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 1200)
  }

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,117,255,0.22) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow: Inter badge */}
          <span className="badge-pill mb-8 inline-flex font-ui">
            <span className="w-1.5 h-1.5 bg-[#3b9eff] rounded-full" />
            {waitlistCount}+ freelancers already signed up
          </span>

          {/* Headline: Playfair Display, tight editorial */}
          <h2
            className="font-display text-5xl lg:text-6xl text-[#fcfdff] mb-6"
            style={{ lineHeight: 1.0, letterSpacing: '-0.025em', fontWeight: 400 }}
          >
            Ready to stop leaving money on the table?
          </h2>

          {/* Sub: Plus Jakarta Sans */}
          <p className="font-marketing text-lg mb-10" style={{ color: 'rgba(252,253,255,0.65)' }}>
            Join the waitlist. Be first when we launch.{' '}
            Early members get <span className="text-[#11ff99]">3 months free</span>.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto mb-6">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 text-[#fcfdff] placeholder-[#464a4d] text-sm font-ui focus:outline-none transition-all duration-200 rounded-lg"
                style={{ background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.14)', height: '40px' }}
                onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.55)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }}
              />
              <div className="relative flex-shrink-0">
                {confetti && (
                  <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden>
                    {Array.from({ length: 18 }).map((_, i) => {
                      const angle = (360 / 18) * i
                      const dist = 55 + Math.random() * 50
                      const tx = Math.cos((angle * Math.PI) / 180) * dist
                      const ty = Math.sin((angle * Math.PI) / 180) * dist - 50
                      return (
                        <div key={i} className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-sm animate-confetti"
                          style={{ background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))` }} />
                      )
                    })}
                  </div>
                )}
                <button type="submit" className="btn-primary h-[40px] font-ui">
                  Get Early Access
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="surface-card px-8 py-6 max-w-sm mx-auto mb-6"
              style={{ borderColor: 'rgba(17,255,153,0.3)' }}
            >
              <CheckCircle className="w-8 h-8 text-[#11ff99] mx-auto mb-3" />
              <p className="font-marketing font-medium text-[#fcfdff] mb-1">You're in.</p>
              <p className="font-ui text-sm text-[#888e90]">We'll reach out when your spot opens.</p>
            </motion.div>
          )}

          <p className="font-ui text-xs text-[#464a4d]">No credit card · No spam · Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}
