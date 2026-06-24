import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Link2, ShieldCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Create your proposal',
    description:
      'Enter project details — Claude AI writes a professional, value-based proposal in under 60 seconds with scope protection built in.',
    accent: '#ff801f',
  },
  {
    number: '02',
    icon: Link2,
    title: 'Send one link',
    description:
      'Share a single branded link. Your client views the proposal, signs, and pays the 50% deposit — all on one page. No back-and-forth.',
    accent: '#3b9eff',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'AI defends your scope',
    description:
      'Every client message is scanned. Extras get flagged, priced, and sent as a change order automatically. You get paid for every hour.',
    accent: '#11ff99',
  },
]

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center text-center gap-5"
    >
      <div className="relative">
        {/* Step number: JetBrains Mono — watermark */}
        <span
          className="absolute -top-5 -left-6 font-mono font-medium select-none"
          style={{
            fontSize: '72px',
            lineHeight: 1,
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-0.04em',
          }}
          aria-hidden
        >
          {step.number}
        </span>
        <div className="relative w-12 h-12 rounded-xl border border-white/[0.14] bg-[#0a0a0c] flex items-center justify-center">
          <step.icon className="w-5 h-5" style={{ color: step.accent }} />
        </div>
      </div>

      <div>
        {/* Step title: Playfair Display */}
        <h3
          className="font-display text-xl text-[#fcfdff] mb-3"
          style={{ lineHeight: 1.2, fontWeight: 400, letterSpacing: '-0.01em' }}
        >
          {step.title}
        </h3>
        {/* Description: Plus Jakarta Sans */}
        <p className="font-marketing text-sm leading-relaxed text-[#a1a4a5] max-w-xs mx-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,128,31,0.14) 0%, transparent 65%)' }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="font-ui text-xs font-medium uppercase tracking-widest text-[#ff801f] mb-4">How it works</p>
          <h2
            className="font-display text-4xl lg:text-5xl text-[#fcfdff] mb-5"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 400 }}
          >
            From proposal to protected income.
          </h2>
          <p className="font-marketing text-lg max-w-xl mx-auto" style={{ color: 'rgba(252,253,255,0.65)' }}>
            What used to take 3 days of back-and-forth now takes 15 minutes.
          </p>
        </motion.div>

        <div className="relative grid lg:grid-cols-3 gap-14 lg:gap-8">
          <div
            className="hidden lg:block absolute top-6 left-[21%] right-[21%] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }}
          />
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
