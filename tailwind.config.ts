import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RapidAssur brand palette
        'ra-navy':   '#003366',
        'ra-blue':   '#2563EB',
        'ra-red':    '#DC2626',
        'ra-orange': '#E9711C',
        brand: {
          navy:   '#003366',
          blue:   '#2563EB',
          red:    '#DC2626',
          orange: '#E9711C',
        },
      },
      fontFamily: {
        sans:      ['Poppins', 'sans-serif'],
        signature: ['Arizonia', 'cursive'],
        poppins:   ['Poppins', 'sans-serif'],
        arizonia:  ['Arizonia', 'cursive'],
      },
      backgroundImage: {
        'gradient-radial':    'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':     'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
