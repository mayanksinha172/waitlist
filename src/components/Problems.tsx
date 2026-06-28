import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../lib/hooks'
import { useTextScramble } from '../lib/useTextScramble'

const stats = [
  {
    target: 30,
    suffix: '%',
    label: 'of project profit',
    sub: 'lost to untracked scope creep',
    accent: '#FF2D55',
    glow: 'rgba(255,45,85,0.2)',
    border: 'rgba(255,45,85,0.15)',
  },
  {
    target: 10,
    suffix: ' hrs',
    label: 'per client wasted',
    sub: 'on admin, revisions & chasing invoices',
    accent: '#FFD60A',
    glow: 'rgba(255,214,10,0.15)',
    border: 'rgba(255,214,10,0.12)',
  },
  {
    target: 60,
    suffix: ' days',
    label: 'average payment delay',
    sub: 'without an upfront deposit clause',
    accent: '#4080FF',
    glow: 'rgba(64,128,255,0.2)',
    border: 'rgba(64,128,255,0.15)',
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, count } = useCountUp(stat.target, 1800)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })
  const scrambled = useTextScramble(stat.label, inView, 700)

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card p-8 text-center group relative overflow-hidden holo-card"
      style={{
        boxShadow: `0 0 60px ${stat.glow}`,
        borderColor: stat.border,
      }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)`,
          boxShadow: `0 0 16px ${stat.accent}`,
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.14 }}
      />

      {/* Ambient corner glow */}
      <div
        className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full pointer-events-none"
        style={{ background: stat.accent, opacity: 0.06, filter: 'blur(20px)' }}
      />

      {/* Number */}
      <motion.div
        className="font-display tabular-nums mb-3"
        style={{
          fontSize: 'clamp(3.5rem, 6vw, 5rem)',
          color: stat.accent,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          textShadow: `0 0 50px ${stat.accent}70`,
        }}
        animate={inView ? { textShadow: [`0 0 20px ${stat.accent}30`, `0 0 60px ${stat.accent}80`, `0 0 30px ${stat.accent}50`] } : {}}
        transition={{ duration: 2, delay: 0.5 + index * 0.14, repeat: Infinity, repeatType: 'reverse' }}
      >
        <span ref={ref}>{count}</span>
        <span style={{ fontSize: '65%' }}>{stat.suffix}</span>
      </motion.div>

      <p
        className="font-display text-base mb-1.5"
        style={{ color: '#EDF0FF', lineHeight: 1.3, fontWeight: 600 }}
      >
        {scrambled}
      </p>
      <p className="font-marketing text-sm" style={{ color: 'rgba(237,240,255,0.38)' }}>
        {stat.sub}
      </p>
    </motion.div>
  )
}

export default function Problems() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,45,85,0.09) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.3em] mb-5" style={{ color: '#FF2D55' }}>
            The problem
          </p>
          <h2
            className="font-display mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#EDF0FF' }}
          >
            The numbers are embarrassing.
          </h2>
          <p className="font-marketing text-lg max-w-lg mx-auto" style={{ color: 'rgba(237,240,255,0.5)', fontWeight: 300 }}>
            Freelancers lose thousands every year — not from bad clients, but from missing the right tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
    </section>
  )
}
