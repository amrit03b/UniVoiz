/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
      },
      animation: {
        'gradient-slow': 'gradient 8s linear infinite',
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-3d': 'float3d 8s ease-in-out infinite',
        'rotate-3d': 'rotate3d 12s linear infinite',
        'cube-float': 'cubeFloat 10s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        float3d: {
          '0%, 100%': {
            transform: 'translateY(0) rotateX(0) rotateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px) rotateX(10deg) rotateY(10deg)',
          },
        },
        rotate3d: {
          '0%': {
            transform: 'rotateX(0) rotateY(0) rotateZ(0)',
          },
          '100%': {
            transform: 'rotateX(360deg) rotateY(360deg) rotateZ(360deg)',
          },
        },
        cubeFloat: {
          '0%, 100%': {
            transform: 'translateY(0) rotateX(0) rotateY(0) translateZ(0)',
          },
          '25%': {
            transform: 'translateY(-20px) rotateX(90deg) rotateY(0) translateZ(50px)',
          },
          '50%': {
            transform: 'translateY(0) rotateX(180deg) rotateY(90deg) translateZ(0)',
          },
          '75%': {
            transform: 'translateY(20px) rotateX(270deg) rotateY(180deg) translateZ(-50px)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 15px rgba(56, 189, 248, 0.5)',
        'glow-lg': '0 0 30px rgba(56, 189, 248, 0.5)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        '3d': '0 10px 30px -5px rgba(56, 189, 248, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
} 