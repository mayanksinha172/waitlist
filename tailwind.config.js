/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#000000',
        ink:     '#fcfdff',
        surface: {
          card:     '#0a0a0c',
          elevated: '#101012',
          deep:     '#06060a',
        },
        accent: {
          orange: '#ff801f',
          blue:   '#3b9eff',
          green:  '#11ff99',
          red:    '#ff2047',
          yellow: '#ffc53d',
        },
        mute:  '#a1a4a5',
        ash:   '#888e90',
        stone: '#464a4d',
      },
      fontFamily: {
        display:   ['"Playfair Display"', 'Georgia', 'serif'],
        marketing: ['"Plus Jakarta Sans"', 'sans-serif'],
        ui:        ['"Inter"', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%':       { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%':       { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':       { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        confettiBurst: {
          '0%':   { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) rotate(720deg)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'blob-slow': 'blob 14s ease-in-out infinite',
        'blob-mid':  'blob 10s ease-in-out infinite 2s',
        'blob-fast': 'blob 8s ease-in-out infinite 1s',
        'glow-pulse':'glowPulse 2.5s ease-in-out infinite',
        'marquee':   'marquee 28s linear infinite',
        'confetti':  'confettiBurst 0.8s ease-out forwards',
        'float':     'float 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
