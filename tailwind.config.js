/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#054232',
          secondary: '#E2E8F0',
          heading: '#faf7ff',
          accent: '#1A5C4A',
          neutral: '#3D4451',
          'base-100': '#F1F5F9',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#f4d48a',
          error: '#F87272',
          button: '#495579',
          background: '#1E1E1E',
          container: '#ffffff',
          'base-200': '#ffffff'
        },
      },
    ],
  },
  // eslint-disable-next-line global-require
  plugins: [require('daisyui'), require('tailwind-scrollbar-hide')],
};
