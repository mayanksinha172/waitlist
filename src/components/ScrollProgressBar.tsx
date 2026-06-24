import { motion } from 'framer-motion'
import { useScrollProgress } from '../lib/hooks'

export default function ScrollProgressBar() {
  const width = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-[1px] z-[100] bg-[#fcfdff]"
      style={{ width }}
    />
  )
}
