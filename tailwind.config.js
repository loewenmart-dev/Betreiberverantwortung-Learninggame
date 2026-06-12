/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A5F',
        accent: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        surface: '#F8FAFC',
        grass: '#4ADE80',
        'grass-dark': '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px 2px rgba(245, 158, 11, 0.5)' },
          '50%': { boxShadow: '0 0 18px 6px rgba(245, 158, 11, 0.9)' },
        },
        'blink-gold': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.5) drop-shadow(0 0 8px #F59E0B)' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'blink-gold': 'blink-gold 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
