import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    // Square design language: every radius utility resolves to 0 except `full`,
    // which stays for the few things that are genuinely round (avatars, glows).
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
      '2xl': '0',
      '3xl': '0',
      full: '9999px',
    },
    extend: {
      screens: {
        // Desktop "one section per screen" mode. Short windows fall back to normal
        // scrolling so a section can never be cut off.
        snap: { raw: '(min-width: 1024px) and (min-height: 640px)' },
        // short desktop windows (≤800px tall): hide secondary copy so sections still fit
        short: { raw: '(min-width: 1024px) and (max-height: 800px)' },
      },
      colors: {
        ink: { DEFAULT: '#0a0a0a', card: '#131313', raised: '#1b1b1b' },
        // Brand crimson, sampled from the logo lips and the "&" of "food & melody".
        // `soft` is the tint used for text on black (passes AA contrast).
        accent: { DEFAULT: '#c41c47', soft: '#ec4a73', deep: '#8f1233' },
        chalk: '#f9fafb',
        muted: '#9ca3af',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(196,28,71,0.4), 0 18px 50px -12px rgba(196,28,71,0.45)',
        'glow-sm': '0 10px 30px -12px rgba(196,28,71,0.6)',
        card: '0 24px 60px -30px rgba(0,0,0,0.9)',
      },
      keyframes: {
        // `translate` (not `transform`) so a finished reveal never blocks hover transforms
        'fade-up': { '0%': { opacity: '0', translate: '0 18px' }, '100%': { opacity: '1', translate: '0 0' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'scale-in': { '0%': { opacity: '0', scale: '.96' }, '100%': { opacity: '1', scale: '1' } },
        'pulse-glow': {
          '0%,100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .5s ease both',
        'scale-in': 'scale-in .35s cubic-bezier(.16,1,.3,1) both',
        'pulse-glow': 'pulse-glow 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
