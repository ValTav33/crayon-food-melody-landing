import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0a0a0a', card: '#141414', raised: '#1b1b1b' },
        gold: { DEFAULT: '#f59e0b', soft: '#eab308', deep: '#b45309' },
        coral: '#f43f5e',
        chalk: '#f9fafb',
        muted: '#9ca3af',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(245,158,11,0.35), 0 18px 50px -12px rgba(245,158,11,0.45)',
        'glow-sm': '0 10px 30px -12px rgba(245,158,11,0.55)',
        card: '0 24px 60px -30px rgba(0,0,0,0.9)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(18px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        'pulse-glow': {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .5s ease both',
        'scale-in': 'scale-in .35s cubic-bezier(.16,1,.3,1) both',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-glow': 'pulse-glow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
