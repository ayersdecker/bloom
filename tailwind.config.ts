import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#EDE3C8',
        paper: '#F4EDD8',
        ink: '#241C15',
        brass: '#A67C3D',
        wax: '#7A2422',
        verdigris: '#4C6B5A'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['EB Garamond', 'serif']
      },
      boxShadow: {
        wax: '0 12px 30px rgba(122, 36, 34, 0.18)',
        card: '0 14px 40px rgba(36, 28, 21, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
