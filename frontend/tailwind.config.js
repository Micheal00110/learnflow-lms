/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc',
          400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca',
          800: '#3730a3', 900: '#312e81',
        },
        clay: {
          bg: '#f0ebe3', surface: '#ffffff',
          dark: 'rgba(174, 168, 158, 0.45)', light: 'rgba(255, 255, 255, 0.85)',
        },
      },
      borderRadius: { clay: '20px', 'clay-sm': '14px', 'clay-xs': '10px' },
      boxShadow: {
        clay: '6px 6px 14px rgba(174, 168, 158, 0.45), -6px -6px 14px rgba(255, 255, 255, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'clay-sm': '3px 3px 8px rgba(174, 168, 158, 0.45), -3px -3px 8px rgba(255, 255, 255, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        'clay-inset': 'inset 2px 2px 5px rgba(174, 168, 158, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.6)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleIn: 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-10px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(0.95)' }, to: { opacity: 1, transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
