import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/* Seeded particles — golden ratio spread so they look intentional */
const PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const floatClass = ['animate-float-a','animate-float-b','animate-float-c','animate-float-d','animate-float-e','animate-float-f'][i % 6]
  const size = [1.5, 2, 2.5, 3, 1, 2][i % 6]
  const color = ['#11ff99','#4080FF','#FFD60A','#EDF0FF','#FF6B35','#11ff99'][i % 6]
  return {
    id: i,
    x: ((i * 137.508) % 94) + 3,
    y: ((i * 97.641) % 90) + 5,
    size,
    color,
    floatClass,
    delay: (i * 0.38) % 4,
    opacity: 0.15 + (i % 5) * 0.07,
  }
})

/* Pulsing grid lines — data "signals" traveling across */
const GRID_PULSES = [
  { top: '22%', delay: 0, dur: 4 },
  { top: '48%', delay: 1.6, dur: 5.5 },
  { top: '72%', delay: 3.2, dur: 3.8 },
]

export default function HeroBackground() {
  const radarRef = useRef<HTMLDivElement>(null)

  /* Stagger radar rings on mount */
  useEffect(() => {
    const el = radarRef.current
    if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach((child, i) => {
      child.style.animationDelay = `${i * 1.1}s`
    })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>

      {/* ── Large aurora orbs ── */}
      {/* Orb 1 — dominant blue */}
      <div
        className="absolute animate-orb-1"
        style={{
          top: '-5%', left: '20%',
          width: 750, height: 650,
          background: 'radial-gradient(ellipse at center, rgba(64,128,255,0.32) 0%, rgba(64,128,255,0.12) 40%, transparent 72%)',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      {/* Orb 2 — electric green */}
      <div
        className="absolute animate-orb-2"
        style={{
          top: '10%', right: '5%',
          width: 600, height: 550,
          background: 'radial-gradient(ellipse at center, rgba(17,255,153,0.22) 0%, rgba(17,255,153,0.07) 45%, transparent 72%)',
          filter: 'blur(70px)',
          willChange: 'transform',
        }}
      />

      {/* Orb 3 — amber accent */}
      <div
        className="absolute animate-orb-3"
        style={{
          bottom: '15%', left: '10%',
          width: 500, height: 450,
          background: 'radial-gradient(ellipse at center, rgba(255,107,53,0.18) 0%, rgba(255,214,10,0.06) 45%, transparent 72%)',
          filter: 'blur(80px)',
          willChange: 'transform',
        }}
      />

      {/* Orb 4 — deep violet undertone */}
      <div
        className="absolute animate-orb-4"
        style={{
          top: '40%', left: '40%',
          width: 400, height: 380,
          background: 'radial-gradient(ellipse at center, rgba(130,80,255,0.15) 0%, transparent 65%)',
          filter: 'blur(90px)',
          willChange: 'transform',
        }}
      />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(17,255,153,0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          opacity: 0.8,
        }}
      />

      {/* ── Animated grid signal lines ── */}
      {GRID_PULSES.map((p, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 h-px overflow-hidden"
          style={{ top: p.top }}
        >
          <motion.div
            className="absolute top-0 h-full"
            style={{
              width: '40%',
              background: 'linear-gradient(90deg, transparent, rgba(17,255,153,0.45), rgba(64,128,255,0.3), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '350%' }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              repeatDelay: 3 + i * 1.5,
              ease: 'linear',
            }}
          />
        </div>
      ))}

      {/* ── Radar pulse rings from center ── */}
      <div
        ref={radarRef}
        className="absolute"
        style={{ top: '42%', left: '50%' }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="absolute rounded-full border animate-radar"
            style={{
              width: 120, height: 120,
              left: 0, top: 0,
              borderColor: i === 0 ? 'rgba(17,255,153,0.35)' : i === 1 ? 'rgba(64,128,255,0.2)' : 'rgba(17,255,153,0.12)',
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── Floating micro-particles ── */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full ${p.floatClass}`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}80`,
          }}
        />
      ))}

      {/* ── Corner brackets — larger and more dramatic ── */}
      {[
        { top: 24, left: 24, deg: 0 },
        { top: 24, right: 24, deg: 90 },
        { bottom: 100, right: 24, deg: 180 },
        { bottom: 100, left: 24, deg: 270 },
      ].map(({ deg, ...pos }, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            ...pos,
            width: 28,
            height: 28,
            borderTop: '2px solid rgba(17,255,153,0.3)',
            borderLeft: '2px solid rgba(17,255,153,0.3)',
            transform: `rotate(${deg}deg)`,
          }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Vertical floating lines ── */}
      {[
        { left: '8%', top: '10%', h: 80, delay: 0 },
        { right: '10%', top: '25%', h: 60, delay: 1.5 },
        { left: '88%', top: '55%', h: 100, delay: 0.8 },
        { left: '15%', bottom: '20%', h: 70, delay: 2.2 },
      ].map((p, i) => {
        const { delay, h, ...pos } = p
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: 1,
              height: h,
              background: i % 2 === 0
                ? 'linear-gradient(180deg, transparent, rgba(17,255,153,0.5), transparent)'
                : 'linear-gradient(180deg, transparent, rgba(64,128,255,0.4), transparent)',
            }}
            animate={{ opacity: [0, 0.8, 0], scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 4 + i, delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}

      {/* ── Bottom fade — matches bg ── */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '35%',
          background: 'linear-gradient(to top, #030610 0%, #03061060 60%, transparent 100%)',
        }}
      />
    </div>
  )
}
