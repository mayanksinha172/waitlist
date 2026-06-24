import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, FileText, CreditCard, RefreshCw, Brain, Globe } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'AI Scope Defender',
    description:
      'Every client message is scanned against your original contract. Scope creep gets flagged in real time — before you accidentally say yes.',
    accent: '#3b9eff',
    span: 'col-span-6 lg:col-span-4',
    big: true,
  },
  {
    icon: FileText,
    title: 'Instant Proposals',
    description: 'Professional, value-based proposals generated in under 60 seconds.',
    accent: '#fcfdff',
    span: 'col-span-6 sm:col-span-3 lg:col-span-2',
  },
  {
    icon: CreditCard,
    title: 'Deposit Protection',
    description: 'Automatic 50% upfront deposit built into every proposal.',
    accent: '#11ff99',
    span: 'col-span-6 sm:col-span-3 lg:col-span-2',
  },
  {
    icon: RefreshCw,
    title: 'Change Orders',
    description: 'One-click priced change orders sent directly to the client for approval.',
    accent: '#ffc53d',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Brain,
    title: 'Value Pricing AI',
    description: 'AI recommends pricing based on client industry and project complexity.',
    accent: '#ff801f',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
  {
    icon: Globe,
    title: 'Client Portal',
    description: 'One link: proposal, e-sign, payment, and project updates.',
    accent: '#3b9eff',
    span: 'col-span-6 sm:col-span-2 lg:col-span-2',
  },
]

function FeatureCell({ f, index }: { f: typeof features[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`${f.span} surface-card p-8 flex flex-col gap-5 hover:scale-[1.01] transition-transform duration-300`}
    >
      <div className="w-10 h-10 rounded-lg border border-white/[0.14] bg-[#06060a] flex items-center justify-center flex-shrink-0">
        <f.icon className="w-5 h-5" style={{ color: f.accent }} />
      </div>

      <div>
        {/* Card title: Playfair Display for typographic character */}
        <h3
          className={`font-display text-[#fcfdff] mb-2.5 tracking-tight ${f.big ? 'text-2xl' : 'text-xl'}`}
          style={{ lineHeight: 1.15, fontWeight: 400 }}
        >
          {f.title}
        </h3>
        {/* Body: Plus Jakarta Sans — marketing voice, readable */}
        <p
          className={`font-marketing leading-relaxed text-[#a1a4a5] ${f.big ? 'text-base' : 'text-sm'}`}
        >
          {f.description}
        </p>
      </div>

      {f.big && (
        <div className="mt-auto pt-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#11ff99] animate-glow-pulse" />
            {/* Status: Inter for UI precision */}
            <span className="font-ui text-xs text-[#888e90]">Runs automatically on every client message</span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function BentoFeatures() {
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,117,255,0.14) 0%, transparent 65%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="font-ui text-xs font-medium uppercase tracking-widest text-[#3b9eff] mb-4">Features</p>
          <h2
            className="font-display text-4xl lg:text-5xl text-[#fcfdff] mb-5"
            style={{ lineHeight: 1.08, letterSpacing: '-0.02em', fontWeight: 400 }}
          >
            Everything you need to protect your income.
          </h2>
        </motion.div>

        <div className="grid grid-cols-6 gap-3">
          {features.map((f, i) => (
            <FeatureCell key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
