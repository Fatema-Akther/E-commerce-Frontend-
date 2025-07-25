/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/**/*.{js,ts,jsx,tsx}", // make sure it covers your form files
  ],
  theme: {
    extend: {
      keyframes: {
        flipX: {
          '0%, 100%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(180deg)' },
        },
      },
      animation: {
        flipX: 'flipX 5s linear infinite',
      },
    },
  },
  plugins: [],
};
