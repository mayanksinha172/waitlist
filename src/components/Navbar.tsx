import { type RefObject } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import MagneticButton from './MagneticButton'

interface NavbarProps {
  formRef: RefObject<HTMLDivElement | null>
}

export default function Navbar({ formRef }: NavbarProps) {
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-[1px] z-50 flex items-center justify-between px-6 lg:px-12 h-16"
    >
      {/* Glass panel */}
      <div
        className="absolute inset-0 border-b"
        style={{
          background: 'rgba(3,6,16,0.8)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderColor: 'rgba(237,240,255,0.06)',
        }}
      />

      {/* Subtle scan line on navbar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(17,255,153,0.5), transparent)' }}
        initial={{ width: '0%', x: '0%' }}
        animate={{ width: ['0%', '60%', '0%'], x: ['0%', '100%', '200%'] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
      />

      {/* Brand — glitch effect */}
      <div className="relative flex items-center gap-2.5">
        <motion.div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(17,255,153,0.08)', border: '1px solid rgba(17,255,153,0.22)' }}
          animate={{ boxShadow: ['0 0 0px rgba(17,255,153,0)', '0 0 12px rgba(17,255,153,0.3)', '0 0 0px rgba(17,255,153,0)'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Shield className="w-3.5 h-3.5" style={{ color: '#11ff99' }} />
        </motion.div>

        <div className="relative">
          {/* Main text */}
          <span
            className="font-display text-sm animate-glitch"
            style={{ color: '#EDF0FF', letterSpacing: '-0.01em' }}
          >
            Lance<span style={{ color: '#11ff99' }}>Guard</span>
            <span style={{ color: 'rgba(237,240,255,0.35)' }}>AI</span>
          </span>

          {/* Glitch layer 1 */}
          <span
            className="absolute inset-0 font-display text-sm pointer-events-none"
            style={{
              color: '#4080FF',
              letterSpacing: '-0.01em',
              animation: 'glitch-2 7s steps(1) infinite 0.3s',
              mixBlendMode: 'screen',
              opacity: 0.6,
            }}
            aria-hidden
          >
            Lance<span style={{ color: '#4080FF' }}>Guard</span>
            <span style={{ color: 'rgba(64,128,255,0.35)' }}>AI</span>
          </span>
        </div>

        <span
          className="font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-full"
          style={{
            color: 'rgba(17,255,153,0.7)',
            background: 'rgba(17,255,153,0.07)',
            border: '1px solid rgba(17,255,153,0.14)',
          }}
        >
          BETA
        </span>
      </div>

      {/* Magnetic CTA */}
      <MagneticButton onClick={scrollToForm} className="relative btn-primary">
        Join Waitlist
      </MagneticButton>
    </motion.nav>
  )
}
