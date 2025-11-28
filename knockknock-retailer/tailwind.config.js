/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#8b5cf6', // Violet 500
          blue: '#3b82f6',   // Blue 500
          dark: '#1e1b4b',   // Indigo 950
        }
      },
      animation: {
        'slide-in': 'slideIn 0.4s ease-out forwards',
        'bounce-slight': 'bounce-slight 2s infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-slight': {
            '0%, 100%': { transform: 'translateY(-5%)' },
            '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}