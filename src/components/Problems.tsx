import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountUp } from '../lib/hooks'

const stats = [
  {
    target: 30,
    suffix: '%',
    label: 'of project profit',
    sub: 'lost to untracked scope creep',
    accent: '#ff2047',
    glow: 'rgba(255,32,71,0.22)',
  },
  {
    target: 10,
    suffix: ' hrs',
    label: 'per client wasted',
    sub: 'on admin, revisions & chasing invoices',
    accent: '#ffc53d',
    glow: 'rgba(255,197,61,0.16)',
  },
  {
    target: 60,
    suffix: ' days',
    label: 'average payment delay',
    sub: 'without an upfront deposit clause',
    accent: '#3b9eff',
    glow: 'rgba(0,117,255,0.2)',
  },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, count } = useCountUp(stat.target, 1800)
  const cardRef = useRef(null)
  const inView = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card p-8 text-center group hover:scale-[1.02] transition-transform duration-300"
      style={{ boxShadow: `0 0 60px ${stat.glow}` }}
    >
      {/* Number: JetBrains Mono — the technical readout */}
      <div
        className="font-mono text-6xl lg:text-7xl font-medium mb-3 tabular-nums"
        style={{ color: stat.accent, letterSpacing: '-0.03em', lineHeight: 1 }}
      >
        <span ref={ref}>{count}</span>
        <span className="text-5xl">{stat.suffix}</span>
      </div>
      {/* Title: Playfair Display for gravitas */}
      <p
        className="font-display text-base font-medium text-[#fcfdff] mb-1.5 tracking-tight"
        style={{ lineHeight: 1.3 }}
      >
        {stat.label}
      </p>
      {/* Sub: Plus Jakarta Sans, marketing voice */}
      <p className="font-marketing text-sm text-[#888e90]">{stat.sub}</p>
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
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(255,32,71,0.14) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Eyebrow: Inter, caps, precise */}
          <p className="font-ui text-xs font-medium uppercase tracking-widest text-[#ff2047] mb-4">The problem</p>
          {/* Section title: Playfair Display */}
          <h2
            className="font-display text-4xl lg:text-5xl text-[#fcfdff] mb-5"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}
          >
            The numbers are embarrassing.
          </h2>
          {/* Body: Plus Jakarta Sans */}
          <p className="font-marketing text-lg max-w-lg mx-auto" style={{ color: 'rgba(252,253,255,0.65)' }}>
            Freelancers lose thousands every year — not from bad clients, but from missing the right tools.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
