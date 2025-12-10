import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#0a0d12',
        accent: '#7dd3fc',
        neon: '#a855f7',
        lime: '#bef264'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glass: '0 10px 60px rgba(0,0,0,0.35)'
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
        aurora: 'linear-gradient(135deg, rgba(125,211,252,0.25), rgba(168,85,247,0.25))'
      }
    }
  },
  plugins: []
};

export default config;
