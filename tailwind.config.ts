import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-merriweather)', 'serif'],
        cinzel: ['var(--font-cinzel)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;
