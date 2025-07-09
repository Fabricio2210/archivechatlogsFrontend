import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bangers': ['Bangers', 'cursive'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      colors: {
        border: '#d1d5db',
        input: '#d1d5db',
        ring: '#6441a4',
        background: '#f4f9fe',
        foreground: '#000000',
        primary: {
          DEFAULT: '#6441a4',
          foreground: '#ffffff',
          hover: '#503483',
        },
        secondary: {
          DEFAULT: '#6ba65e',
          foreground: '#ffffff',
          hover: '#88b77e',
        },
        muted: {
          DEFAULT: '#e5e7eb',
          foreground: '#6b7280',
        },
        accent: {
          DEFAULT: '#f3f4f6',
          foreground: '#1f2937',
        },
        card: {
          DEFAULT: '#efeff1',
          foreground: '#000000',
        },
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config