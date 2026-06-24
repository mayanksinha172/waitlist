const painPoints = [
  '"Can you just add one more thing?"',
  'Unpaid revision #7',
  '"I thought that was included"',
  '3AM emergency, no extra pay',
  'Scope changed. Again.',
  'Proposal accepted. Profit: gone.',
  'Client ghosted after revisions',
  '6 deliverables became 18',
  'Invoice disputed. No contract.',
  '"I just need a small tweak"',
]

export default function Marquee() {
  const items = [...painPoints, ...painPoints]

  return (
    <div className="relative py-8 overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap gap-4">
        {items.map((text, i) => (
          <span
            key={i}
            /* Plus Jakarta Sans — conversational, human feel */
            className="font-marketing inline-flex items-center px-4 py-2 text-sm text-[#888e90] border border-white/[0.06] rounded-full flex-shrink-0 hover:text-[rgba(252,253,255,0.65)] hover:border-white/[0.12] transition-colors bg-[#0a0a0c]"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
