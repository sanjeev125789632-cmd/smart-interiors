/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1325', // Deep Midnight Navy Canvas
          900: '#0F1A30', // Deep Canvas Alt
          850: '#121E36', // Dark Slate Blue Card Surface
          800: '#162544', // Hover Card Surface
          700: '#1E3156', // Muted Navy Border
          600: '#2A4374', // Accent Navy
        },
        gold: {
          300: '#E6C687',
          400: '#D4AF37',
          500: '#C89D5C', // Warm Architectural Metallic Gold
          600: '#A97C3A',
          700: '#7E5B23',
        },
        cyan: {
          300: '#5EEAD4',
          400: '#00D2EE', // Glowing Electric Cyan
          500: '#06B6D4',
        },
        silver: {
          300: '#CBD5E1',
          400: '#94A3B8', // Cool Silver Body
          500: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px -3px rgba(200, 157, 92, 0.35)',
        'cyan-glow': '0 0 20px -3px rgba(0, 210, 238, 0.4)',
        'cyan-sm': '0 0 10px rgba(0, 210, 238, 0.5)',
        'card-elevated': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(30, 49, 86, 0.8)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
